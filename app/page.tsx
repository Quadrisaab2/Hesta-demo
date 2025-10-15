'use client'

import { useState } from 'react'
import Onboarding from '@/components/onboarding'
import Dashboard from '@/components/dashboard'
import CheckinModal from '@/components/checkin-modal'
import CheckinConfirmation from '@/components/checkin-confirmation'
import ActionPlan from '@/components/action-plan'
import AIChat from '@/components/ai-chat'
import AppLayout from '@/components/app-layout'
import { AppState, CheckinData } from '@/lib/types'

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'onboarding',
    activeTab: 'home',
    birthDate: null,
    selectedRating: null,
    selectedPainAnswer: null,
    checkinHistory: []
  })

  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false)
  const [currentCheckinData, setCurrentCheckinData] = useState<CheckinData | null>(null)

  const calculateWeekPostpartum = (birthDate: string): number => {
    const now = new Date()
    const birth = new Date(birthDate)
    const diffTime = Math.abs(now.getTime() - birth.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const weeks = Math.ceil(diffDays / 7)
    return Math.max(weeks, 1) // Ensure minimum of week 1
  }

  const handleOnboardingSubmit = (birthDate: string) => {
    setAppState(prev => ({
      ...prev,
      currentScreen: 'dashboard',
      birthDate
    }))
  }

  const handleStartCheckin = () => {
    setIsCheckinModalOpen(true)
  }

  const handleCloseCheckin = () => {
    setIsCheckinModalOpen(false)
    // Reset form state
    setAppState(prev => ({
      ...prev,
      selectedRating: null,
      selectedPainAnswer: null
    }))
  }

  const handleCheckinSubmit = (data: CheckinData) => {
    console.log('Check-in data:', data)
    // Add to checkin history
    setAppState(prev => ({
      ...prev,
      selectedRating: data.emotionalRating,
      selectedPainAnswer: data.physicalPain,
      checkinHistory: [...prev.checkinHistory, data],
      currentScreen: 'checkin-confirmation'
    }))
    setCurrentCheckinData(data)
  }

  const handleSeeActionPlan = () => {
    setAppState(prev => ({
      ...prev,
      currentScreen: 'action-plan'
    }))
  }

  const handleStartChat = () => {
    setAppState(prev => ({
      ...prev,
      currentScreen: 'ai-chat'
    }))
  }

  const handleBackToDashboard = () => {
    setAppState(prev => ({
      ...prev,
      currentScreen: 'dashboard'
    }))
  }

  const handleTabChange = (tab: 'home' | 'learn' | 'support' | 'me') => {
    setAppState(prev => ({
      ...prev,
      activeTab: tab,
      currentScreen: tab === 'home' ? 'dashboard' : 'dashboard' // For now, all tabs go to dashboard
    }))
  }

  const weekPostpartum = appState.birthDate 
    ? calculateWeekPostpartum(appState.birthDate) 
    : 2 // Default fallback

  // Determine layout props based on current screen
  const getLayoutProps = () => {
    const isOnboarding = appState.currentScreen === 'onboarding'
    const isChat = appState.currentScreen === 'ai-chat'
    
    return {
      showHeader: !isOnboarding,
      showNavigation: !isOnboarding,
      activeTab: appState.activeTab,
      onTabChange: handleTabChange,
      headerTitle: isChat ? 'Hesta AI Specialist' : undefined,
      showBackButton: isChat,
      onBack: isChat ? handleBackToDashboard : undefined
    }
  }

  return (
    <AppLayout {...getLayoutProps()}>
      {appState.currentScreen === 'onboarding' && (
        <Onboarding onSubmit={handleOnboardingSubmit} />
      )}

      {appState.currentScreen === 'dashboard' && (
        <Dashboard 
          weekPostpartum={weekPostpartum}
          onStartCheckin={handleStartCheckin}
          checkinHistory={appState.checkinHistory}
          activeTab={appState.activeTab}
          onTabChange={handleTabChange}
        />
      )}

      {appState.currentScreen === 'checkin-confirmation' && currentCheckinData && (
        <CheckinConfirmation 
          checkinData={currentCheckinData}
          onSeeActionPlan={handleSeeActionPlan}
        />
      )}

      {appState.currentScreen === 'action-plan' && (
        <ActionPlan 
          weekPostpartum={weekPostpartum}
          onStartChat={handleStartChat}
        />
      )}

      {appState.currentScreen === 'ai-chat' && (
        <AIChat 
          onBack={handleBackToDashboard}
        />
      )}

      <CheckinModal 
        isOpen={isCheckinModalOpen}
        onClose={handleCloseCheckin}
        onSubmit={handleCheckinSubmit}
      />
    </AppLayout>
  )
}