'use client'

import { Button } from '@/components/ui/button'
import { Settings, User, ArrowLeft } from 'lucide-react'

interface AppHeaderProps {
  showBackButton?: boolean
  onBack?: () => void
  title?: string
}

export default function AppHeader({ 
  showBackButton = false, 
  onBack, 
  title 
}: AppHeaderProps) {
  return (
    <header className="bg-background border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBackButton && onBack ? (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        ) : null}
        
        <div>
          {title ? (
            <h1 className="text-lg font-libre font-medium text-foreground">
              {title}
            </h1>
          ) : (
            <h1 className="text-xl font-libre font-medium text-foreground">
              <span className="text-accent-foreground">Hesta</span>
            </h1>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  )
}