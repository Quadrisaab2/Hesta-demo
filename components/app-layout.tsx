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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {showHeader && (
        <AppHeader 
          title={headerTitle}
          showBackButton={showBackButton}
          onBack={onBack}
        />
      )}

      {/* Main Content Area - Flexible */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation - Fixed */}
      {showNavigation && onTabChange && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
        />
      )}
    </div>
  )
}