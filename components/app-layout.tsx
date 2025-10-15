'use client'

import { ReactNode } from 'react'
import AppHeader from './app-header'
import BottomNavigation from './bottom-navigation'

interface AppLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showNavigation?: boolean
  headerTitle?: string
  activeTab?: 'home' | 'learn' | 'support' | 'me'
  onTabChange?: (tab: 'home' | 'learn' | 'support' | 'me') => void
  onBack?: () => void
  showBackButton?: boolean
}

export default function AppLayout({
  children,
  showHeader = true,
  showNavigation = true,
  headerTitle,
  activeTab = 'home',
  onTabChange,
  onBack,
  showBackButton = false
}: AppLayoutProps) {
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header - Sticky */}
      {showHeader && (
        <div className="sticky top-0 z-50 bg-background">
          <AppHeader 
            title={headerTitle}
            showBackButton={showBackButton}
            onBack={onBack}
          />
        </div>
      )}

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation - Sticky */}
      {showNavigation && onTabChange && (
        <div className="sticky bottom-0 z-50 bg-background">
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={onTabChange} 
          />
        </div>
      )}
    </div>
  )
}