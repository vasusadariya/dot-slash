import Link from 'next/link'
import { TypeIcon as type, LucideIcon } from 'lucide-react'

interface ProductCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

export function ProductCard({ title, description, icon: Icon, href }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#4ade80] 
      hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#4ade80] transition-shadow duration-200"
    >
      <div className="flex gap-4 items-start">
        <div className="p-2 border-2 border-black dark:border-gray-600">
          <Icon className="w-6 h-6 dark:text-gray-300 text-black" />
        </div>
        <div>
          <h3 className="font-bold text-lg dark:text-white text-black">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  )
}