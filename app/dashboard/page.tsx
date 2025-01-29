"use client"

import { useEffect, useState } from "react"
import { Wallet, ShoppingCart, Cloud, BarChart2, RefreshCcw, Download, CreditCard, Shield } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ArticleCard } from "@/components/article-card"
import { Sidebar } from "@/components/sidebar"
import useAuthGuard from "../hooks/useAuthGuard"

const products = [
    {
        title:"Wallet",
        description:"The best self-hosted wallet",
        icon: Wallet,
        href: "/wallet",
    },
    {
        title:"Commerce",
        description: "Accept payments from anyone",
        icon: ShoppingCart,
        href: "/commerce",
    },
    {
        title:"Cloud",
        description: "Build the future of payments",
        icon: Cloud,
        href: "/cloud",
    },
    {
        title:"Online Trading",
        description: "Access our trading terminal",
        icon: BarChart2,
        href: "/trading",
    },
    {
        title:"Exchange",
        description: "Access to our exchange",
        icon: RefreshCcw,
        href: "/exchange",
    },
    {
        title:"Query & Transactions",
        description: "Secure payments",
        icon: Shield,
        href: "/transactions",
    },
    {
        title:"Card",
        description: "Spend funds, earn rewards",
        icon: CreditCard,
        href: "/card",
    },
    {
        title:"Apps downloads",
        description: "Our apps for web and mobile",
        icon: Download,
        href: "/apps",
    },
]

const articles = [
    {
        tag: "Taxes and Fees",
        title: "Learn what activity is taxable, your gains or losses",
        description: "You can cancel a reservation any time",
        href: "/help/taxes",
    },
    {
        tag: "Updates",
        title: "How to verify your identity on our marketplace",
        description: "Is our site or your profile not loading",
        href: "/help/verify",
    },
    {
        tag: "Marketplace",
        title: "Keep your account safe by adding an extra layer",
        description: "See these steps to secure your account",
        href: "/help/security",
    },
]

export default function Dashboard() {

    useAuthGuard();

    const [isSidebarVisible, setIsSidebarVisible] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarVisible(window.innerWidth >= 768)
        }

        // Initial check
        handleResize()

        // Add event listener
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
            {/* Sidebar */}
            <div className={`${isSidebarVisible ? 'block' : 'hidden'} md:block fixed left-0 top-0 h-full`}>
                <div className="h-full w-64 mt-16"> {/* Added mt-16 to account for navbar height */}
                    <Sidebar />
                </div>
            </div>

            {/* Main content */}
            <div className={`transition-all duration-200 ease-in-out ${isSidebarVisible ? 'md:ml-64' : 'ml-0'} p-4 sm:p-6 md:p-8`}>
                <div className="mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-gray-100 pt-20 md:pt-16"> {/* Adjusted padding-top for navbar */}
                        Hello!👋
                    </h2>
                </div>

                <section className="mb-8 md:mb-12">
                    <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-gray-100">
                        Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.title} {...product} />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-gray-100">
                        Popular help articles
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {articles.map((article) => (
                            <ArticleCard key={article.title} {...article} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}