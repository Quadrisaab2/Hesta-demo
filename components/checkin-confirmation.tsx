'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckinConfirmationProps } from '@/lib/types'
import { Check } from 'lucide-react'

export default function CheckinConfirmation({ 
  checkinData, 
  onSeeActionPlan 
}: CheckinConfirmationProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ))
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="app-content py-8 space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-2xl font-libre font-normal text-foreground">
              Thanks for checking in.
            </h1>
            <p className="text-muted-foreground">
              Here's a summary of your responses
            </p>
          </header>

          <main className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Emotional Wellbeing Card */}
              <Card className="card-enhanced">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-libre text-center">
                    Emotional Wellbeing
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center space-y-3">
                  <div className="flex justify-center gap-1">
                    {renderStars(checkinData.emotionalRating)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {checkinData.emotionalRating} out of 5
                  </p>
                </CardContent>
              </Card>

              {/* Physical Recovery Card */}
              <Card className="card-enhanced">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-libre text-center">
                    Physical Recovery
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-foreground">
                    {checkinData.physicalPain === 'no' 
                      ? 'No unexpected pain reported'
                      : 'Some physical concerns noted'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky-footer">
        <div className="app-content">
          <Button 
            onClick={onSeeActionPlan}
            className="w-full h-12 text-base font-medium"
          >
            See Your Action Plan
          </Button>
        </div>
      </div>
    </div>
  )
}