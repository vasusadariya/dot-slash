"use client";
typeof window !== 'undefined'
import { useState, ChangeEvent, FormEvent } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"; // Update with your Firebase config path
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState<string>("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic form validation
    if (!email || !password) {
      setLocalError("Both email and password are required.");
      return;
    }

    setLocalError(""); // Clear local errors

    try {
      await signInWithEmailAndPassword(email, password);
      console.log("User logged in successfully!", user);
      sessionStorage.setItem('user', 'true');
      router.push("/dashboard"); // Redirect to the dashboard after successful login
    } catch (firebaseError) {
      console.error("Firebase error:", firebaseError);
      // If there's an error, set it to local error without redirecting
      if ((firebaseError as Error)?.message) {
        setLocalError((firebaseError as Error).message); // Show the error message to the user
      }
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In successful:", result.user);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      router.push("/dashboard"); // Redirect to the homepage or dashboard after Google login
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setLocalError("Google login failed. Please try again."); // Display Google login error
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-none border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#4ade80]">
        <h2 className="text-3xl font-black mb-1 text-center dark:text-black">Login</h2>
        <p className="text-sm text-center text-gray-600">Sign in to your account</p>

        {/* Error Messages */}
        {(localError || error) && (
          <div className="p-3 my-4 text-sm text-red-800 bg-red-200 rounded-md">
            {localError || error?.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-1 dark:text-black">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full p-2 text-sm border-2 dark:text-black border-black rounded-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset-1"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block dark:text-black text-sm font-bold mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 text-sm border-2 border-black dark:text-black rounded-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-purple-500 border-2 text-white py-2 px-3 text-sm font-bold border-3 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${loading ? "opacity-50 cursor-not-allowed" : "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
              }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogle}
            className="w-full border-2 bg-green-500 text-black py-2 px-3 text-sm font-bold border-3 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Continue with Google
          </button>
        </div>

        {/* Forgot Password */}
        <p className="mt-4 text-sm text-center dark:text-black">
          Forgot your password?{" "}
          <a href="/forgot" className="text-blue-500 hover:underline">
            Reset it here
          </a>
        </p>

        {/* Signup Redirect */}
        <p className="mt-2 text-sm text-center dark:text-black">
          Don’t have an account?{" "}
          <a href="/signup" className="font-bold underline dark:text-gray-400 hover:text-purple-600 dark:hover:text-green-400">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
