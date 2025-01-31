"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth, updateProfile } from "@/app/firebase/config"
import { useRouter } from "next/navigation"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

interface FormData {
  name: string
  email: string
  password: string
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  })

  const [localError, setLocalError] = useState<string>("")
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { name, email, password } = formData

    // Basic form validation
    if (!name || !email || !password) {
      setLocalError("All fields are required")
      return
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long")
      return
    }

    setLocalError("") // Clear local errors

    try {
      const result = await createUserWithEmailAndPassword(email, password)

      if (result && result.user) {
        console.log("User created successfully!", result.user)

        // Update user profile with name
        await updateProfile(result.user, { displayName: name })

        // Set user session after successful sign-up
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            uid: result.user.uid,
            email: result.user.email,
            displayName: name,
          }),
        )

        // Redirect to the dashboard or homepage after sign-up
        router.push("/dashboard")
      } else {
        // Handle the case where user creation fails without an explicit error code
        setLocalError("Failed to create user. Please try again.")
      }
    } catch (firebaseError) {
      console.error("Firebase error:", firebaseError)

      // Handle specific Firebase error codes to give more detailed feedback
      if ((firebaseError as { code: string }).code === "auth/email-already-in-use") {
        setLocalError("This email is already in use. Please use a different email.")
      } else if ((firebaseError as { code: string }).code === "auth/weak-password") {
        setLocalError("Password should be at least 6 characters long.")
      } else if ((firebaseError as { code: string }).code === "auth/invalid-email") {
        setLocalError("The email address is not valid.")
      } else {
        setLocalError("An error occurred during sign-up. Please try again.")
      }
    }
  }

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      if (result && result.user) {
        console.log("Google Sign-In successful:", result.user)
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
          }),
        )
        router.push("/dashboard")
      } else {
        setLocalError("Failed to sign in with Google. Please try again.")
      }
    } catch (error) {
      console.error("Google Sign-In error:", error)
      setLocalError("An error occurred during Google sign-in. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-none border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#4ade80]">
        <h1 className="text-3xl font-black mb-1 text-center dark:text-black">Sign up</h1>
        <p className="text-sm text-center text-gray-600">Create a new account</p>
        {/* Error Messages */}
        {(localError || error) && (
          <div className="p-2 mb-4 text-sm text-red-800 bg-red-200 border-2 border-red-800 rounded-none">
            {localError || error?.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-black">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-2 text-sm border-2 border-black dark:text-black rounded-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset-1"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-black">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full p-2 text-sm border-2 border-black dark:text-black rounded-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset-1"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-black">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 text-sm border-2 border-black rounded-none dark:text-black focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 border-2 text-white py-2 px-3 text-sm font-bold border-3 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogle}
            type="button"
            className="w-full border-2 bg-green-500 text-black py-2 px-3 text-sm font-bold border-3 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Continue with Google
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-6 text-sm text-center dark:text-black">
          Already registered?{" "}
          <a href="/login" className="font-bold underline dark:text-gray-400 hover:text-purple-600 dark:hover:text-green-400">
            Sign in to your account
          </a>
        </p>
      </div>
    </div>
  )
}