import Link from 'next/link'
import { LayoutDashboard, FolderKanban, CheckSquare, InboxIcon, Calendar, FolderIcon, ChevronDown,House,LogOut, User2 } from 'lucide-react'

const navigation = [
//   { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', badge: '15' },
  { name: 'Home', icon: House, href: '/' },
  { name: 'Tasks', icon: CheckSquare, href: '/tasks' },
//   { name: 'Kanban Desk', icon: FolderKanban, href: '/kanban', badge: '26' },
//   { name: 'File Manager', icon: FolderIcon, href: '/files', badge: '14' },
  { name: 'Inbox', icon: InboxIcon, href: '/inbox' },
  { name: 'Logout', icon: LogOut, href: '/calendar' },
]

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-black text-white dark:bg-gray-900 p-4">


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