"use client";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
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
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
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
            className="w-full px-4 py-2 text-white bg-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600"
          >
            Continue with Google
          </button>
        </div>

        {/* Forgot Password */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Forgot your password?{" "}
          <a href="/forgot" className="text-blue-500 hover:underline">
            Reset it here
          </a>
        </p>

        {/* Signup Redirect */}
        <p className="mt-2 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
