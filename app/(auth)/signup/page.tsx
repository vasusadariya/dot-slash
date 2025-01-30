"use client"
typeof window !== 'undefined'
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase/config"
import { useRouter } from "next/navigation"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

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
  
        // Set user session after successful sign-up
        sessionStorage.setItem("user", "true")
  
        // Optionally, you could set more user data in the session or localStorage here if needed.
        // For example: sessionStorage.setItem('userName', result.user.displayName)
  
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
        sessionStorage.setItem("user", JSON.stringify(result.user))
        router.push("/dashboard") // Redirect to the homepage or dashboard only on success
      } else {
        setLocalError("Failed to sign in with Google. Please try again.")
      }
    } catch (error) {
      console.error("Google Sign-In error:", error)
      setLocalError("An error occurred during Google sign-in. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <p className="text-sm text-center text-gray-600">Create your account</p>

        {/* Error Messages */}
        {(localError || error) && (
          <div className="p-3 my-4 text-sm text-red-800 bg-red-200 rounded-md">{localError || error?.message}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 mt-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full px-4 py-2 mt-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogle}
            className="w-full px-4 py-2 text-white bg-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600"
          >
            Continue with Google
          </button>
        </div>

        {/* Already have an account */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}