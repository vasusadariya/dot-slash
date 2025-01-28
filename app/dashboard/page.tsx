'use client'

import { useEffect, useState } from 'react'
import { Wallet, ShoppingCart, Cloud, BarChart2, RefreshCcw, Download, CreditCard, Shield } from 'lucide-react'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ProductCard } from '@/components/product-card'
import { ArticleCard } from '@/components/article-card'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider, useTheme } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

const products = [
    {
      title: "Wallet",
      description: "The best self-hosted wallet",
      icon: Wallet,
      href: "/wallet",
    },
    {
      title: "Commerce",
      description: "Accept payments from anyone",
      icon: ShoppingCart,
      href: "/commerce",
    },
    {
      title: "Cloud",
      description: "Build the future of payments",
      icon: Cloud,
      href: "/cloud",
    },
    {
      title: "Online Trading",
      description: "Access our trading terminal",
      icon: BarChart2,
      href: "/trading",
    },
    {
      title: "Exchange",
      description: "Access to our exchange",
      icon: RefreshCcw,
      href: "/exchange",
    },
    {
      title: "Query & Transactions",
      description: "Secure payments",
      icon: Shield,
      href: "/transactions",
    },
    {
      title: "Card",
      description: "Spend funds, earn rewards",
      icon: CreditCard,
      href: "/card",
    },
    {
      title: "Apps downloads",
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

function DashboardContent() {
  const [userName, setUserName] = useState<string>('')
  const { theme } = useTheme()

//   useEffect(() => {
//     const auth = getAuth()
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserName(user.displayName || 'User')
//       }
//     })

//     return () => unsubscribe()
//   }, [])

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-200' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'}`}>
      <Sidebar />
      
      <div className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4"> 
            <ThemeToggle />
          </div>
        </header>

        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-8 dark:text-white text-black">Hello {userName}! 👋</h2>
          
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 dark:text-white text-black">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6 dark:text-white text-black">Popular help articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.title} {...article} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  )
}