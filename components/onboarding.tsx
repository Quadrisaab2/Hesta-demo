'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { OnboardingProps } from '@/lib/types'

export default function Onboarding({ onSubmit }: OnboardingProps) {
  const [birthDate, setBirthDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!birthDate) {
      alert('Please select your baby\'s date of birth.')
      return
    }

    // Validate date is not in the future
    const selectedDate = new Date(birthDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate > today) {
      alert('Please select a valid date that is not in the future.')
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Smooth transition
    onSubmit(birthDate)
    setIsLoading(false)
  }

  // Set default date (14 days ago for demo)
  const getDefaultDate = () => {
    const demoDate = new Date()
    demoDate.setDate(demoDate.getDate() - 14)
    return demoDate.toISOString().split('T')[0]
  }

  // Set max date to today
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 pb-0">
        <div className="app-content w-full">
          <Card className="card-enhanced border-2">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-libre font-normal text-foreground">
                  Welcome to Hesta.
                </h1>
                <p className="text-base font-host text-foreground leading-relaxed">
                  Let's get started by personalizing your postnatal care journey.
                </p>
              </div>

              <div className="text-left space-y-2">
                <label htmlFor="birth-date" className="text-sm font-medium text-foreground">
                  What was your baby's date of birth?
                </label>
                <Input
                  id="birth-date"
                  type="date"
                  value={birthDate || getDefaultDate()}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={getTodayDate()}
                  className="h-12 text-base"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky-footer">
        <div className="app-content">
          <Button 
            onClick={handleSubmit} 
            className="w-full h-12 text-base font-medium"
            disabled={isLoading || !birthDate}
          >
            {isLoading ? 'Creating Your Plan...' : 'Create My Care Plan'}
          </Button>
        </div>
      </div>
    </div>
  )
}