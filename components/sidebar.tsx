import Link from 'next/link'
import { CheckSquare, InboxIcon, House,LogOut} from 'lucide-react'

const navigation = [
  { name: 'Home', icon: House, href: '/' },
  { name: 'Tasks', icon: CheckSquare, href: '/tasks' },
  { name: 'Inbox', icon: InboxIcon, href: '/inbox' },
  { name: 'Logout', icon: LogOut, href: '/calendar' },
]

export function Sidebar() {
  return (
    <div className="mt-14 fixed inset-y-0 left-0 w-64 bg-black text-white dark:bg-gray-900 p-4">
      <div className="space-y-1">
        <p className="text-xs text-gray-400 uppercase mb-2 ">Navigation</p>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-white/10 hover:text-purple-500 dark:hover:text-green-400"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>    
          </Link>
        ))}
      </div>  
    </div>
  )
}