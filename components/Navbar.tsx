"use client"

import Link from "next/link"
import { Star } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"

const navigation = [
  { name: "Platform Solutions", href: "/platform" },
  { name: "Clients", href: "/clients" },
  { name: "Insights", href: "/insights" },
  { name: "Company", href: "/company" },
]

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Star className="h-6 w-6 dark:text-green-400" />
            <span className="dark:text-white">Chorke</span>
          </Link>

          {/* Navigation Links */}
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

          {/* Auth Buttons and Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#4ade80] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#4ade80] transition-shadow duration-200">
              <Link href="/login">Login</Link>
            </button>
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded-lg border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#4ade80] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#4ade80] transition-shadow duration-200"
            >
              <Link href="/signup">Sign up</Link>
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          {/* <MobileNav /> */}
        </div>
      </div>
    </nav>
  )
}
