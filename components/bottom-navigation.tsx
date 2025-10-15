'use client'

import { NavigationProps } from '@/lib/types'
import { Home, BookOpen, MessageCircle, User } from 'lucide-react'

export default function BottomNavigation({ 
  activeTab, 
  onTabChange 
}: NavigationProps) {
  const tabs = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Home
    },
    {
      id: 'learn' as const,
      label: 'Learn',
      icon: BookOpen
    },
    {
      id: 'support' as const,
      label: 'Support',
      icon: MessageCircle
    },
    {
      id: 'me' as const,
      label: 'Me',
      icon: User
    }
  ]

  return (
    <nav className="bg-background border-t border-border px-2 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'text-primary bg-accent/20' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-xs font-medium ${
                isActive ? 'text-primary' : ''
              }`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}