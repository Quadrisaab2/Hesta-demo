'use client'

import { useState } from 'react'
import Onboarding from '@/components/onboarding'
import Dashboard from '@/components/dashboard'
import CheckinModal from '@/components/checkin-modal'
import { AppState, CheckinData } from '@/lib/types'

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'onboarding',
    birthDate: null,
    selectedRating: null,
    selectedPainAnswer: null
  })

  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false)

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
    // In a real app, you would send this data to your backend
    setAppState(prev => ({
      ...prev,
      selectedRating: data.emotionalRating,
      selectedPainAnswer: data.physicalPain
    }))
  }

  const weekPostpartum = appState.birthDate 
    ? calculateWeekPostpartum(appState.birthDate) 
    : 2 // Default fallback

  return (
    <main className="relative">
      {appState.currentScreen === 'onboarding' && (
        <Onboarding onSubmit={handleOnboardingSubmit} />
      )}

      {appState.currentScreen === 'dashboard' && (
        <Dashboard 
          weekPostpartum={weekPostpartum}
          onStartCheckin={handleStartCheckin}
        />
      )}

      <CheckinModal 
        isOpen={isCheckinModalOpen}
        onClose={handleCloseCheckin}
        onSubmit={handleCheckinSubmit}
      />
    </main>
  )
}