"use client"

import Link from "next/link"
import { Binary, Menu, X } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"; // Adjust the import path based on your config file
import { signOut } from "firebase/auth";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image"


const navigation = [
  { name: "Platform Solutions", href: "/platform" },
  { name: "Clients", href: "/clients" },
  { name: "Insights", href: "/insights" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, loading, error] = useAuthState(auth); // Using useAuthState hook to track user
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/"); // Redirect to login page after sign-out
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 border-b transition-shadow ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold z-50">
            <Binary className="h-6 w-6 dark:text-green-400 text-purple-500" />
            <span className="dark:text-white">HackOps</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-sm font-medium text-foreground hover:text-purple-500 dark:text-white hover:dark:text-green-400"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons and Theme Toggle */}
          {/* <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#4ade80] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#4ade80] transition-shadow duration-200">
              <Link href="/login">Login</Link>
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#4ade80] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#4ade80] transition-shadow duration-200">
              <Link href="/signup">Sign up</Link>
            </button>
            <ThemeToggle />
          </div>  */}
          {/* Right Section - User Info or Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Dashboard Button */}
                <Link href="/dashboard">
                  <button

                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#000000] bg-[#ae7aff]
                    text-sm font-semibold text-black shadow-[3px_3px_0px_0px_#000000] hover:shadow-[1px_1px_0px_0px_#000000] 
                    hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <LayoutDashboard size={18} />
                    <span className="hidden md:inline">Dashboard</span>
                  </button>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 border-2 border-[#000000] 
                  shadow-[3px_3px_0px_0px_#000000] hover:shadow-[1px_1px_0px_0px_#000000] 
                  hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm font-semibold"
                >
                  Logout
                </button>


                {/* User Avatar */}
                <div className="relative group">
                  <Image
                    src={user?.photoURL || "/default-avatar.png"} // Fallback to default avatar
                    alt={user?.displayName || "User Avatar"}
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    aria-label="User Avatar"
                  />
                  {/* Optional Dropdown */}
                  <div className="absolute right-0 hidden w-48 p-2 mt-2 bg-white border rounded-lg shadow-lg group-hover:block">
                    <p className="text-sm text-gray-700">{user.displayName || "User"}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <hr className="my-2" />
                    {/* <button
                      className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button> */}

                  </div>

                </div>
                <ThemeToggle />

              </>
            ) : (
              <>
                {/* Login and Sign-Up Buttons */}
                <Link href="/login">
                  <button
                    className="px-4 py-2 rounded-lg border-2 border-[#000000] bg-[#ae7aff]
                    text-sm font-semibold text-black shadow-[3px_3px_0px_0px_#000000] hover:shadow-[1px_1px_0px_0px_#000000] 
                    dark:shadow-[3px_3px_0px_0px_#4ade80] dark:hover:shadow-[1px_1px_0px_0px_#4ade80]
                    hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button
                    className="px-4 py-2 rounded-lg border-2 border-[#000000] bg-[#ae7aff]
                    text-sm font-semibold text-black shadow-[3px_3px_0px_0px_#000000] hover:shadow-[1px_1px_0px_0px_#000000] 
                    dark:shadow-[3px_3px_0px_0px_#4ade80] dark:hover:shadow-[1px_1px_0px_0px_#4ade80]
                    hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Sign Up
                  </button>
                </Link>
                <ThemeToggle />


              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 dark:text-white" />
          </button>

          {/* Mobile Menu */}
          <div className={`
            fixed inset-0 bg-white dark:bg-gray-900 z-40 
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            md:hidden
          `}>
            {/* Close button positioned at top-right */}
            <button
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 dark:text-white" />
            </button>

            <div className="flex flex-col h-full pt-20 px-4">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg justify-center mx-auto items-center font-medium text-foreground hover:text-purple-500 dark:text-white hover:dark:text-green-400"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                <button className="w-auto px-2 py-2 bg-purple-500 text-white rounded-lg border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#4ade80] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#4ade80] transition-shadow duration-200">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </button>
                <button className="w-auto px-2 py-2 bg-purple-500 text-white rounded-lg border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#4ade80] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#4ade80] transition-shadow duration-200">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>Sign up</Link>
                </button>
                <div className="mt-4">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}