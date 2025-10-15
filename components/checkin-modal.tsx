'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog'
import { CheckinData } from '@/lib/types'

interface CheckinModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CheckinData) => void
  isNICU?: boolean
}

export default function CheckinModal({ isOpen, onClose, onSubmit, isNICU = false }: CheckinModalProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedPainAnswer, setSelectedPainAnswer] = useState<'yes' | 'no' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedRating === null || selectedPainAnswer === null) {
      alert('Please answer both questions before submitting.')
      return
    }

    setIsSubmitting(true)
    
    const checkinData: CheckinData = {
      emotionalRating: selectedRating,
      physicalPain: selectedPainAnswer,
      date: new Date().toISOString()
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    setSelectedRating(null)
    setSelectedPainAnswer(null)
    setIsSubmitting(false)
    
    onSubmit(checkinData)
    onClose()
  }

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating)
  }

  const handlePainSelect = (answer: 'yes' | 'no') => {
    setSelectedPainAnswer(answer)
  }

  const isFormValid = selectedRating !== null && selectedPainAnswer !== null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-libre text-center">
            {isNICU ? 'Your Daily NICU Check-in' : 'Your Daily Check-in'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-4">
          {/* Emotional Rating Question */}
          <div className="space-y-4">
            <label className="block text-base font-medium text-center text-foreground">
              {isNICU 
                ? 'On a scale of 1 to 5, how are you coping emotionally in the hospital today?'
                : 'On a scale of 1 to 5, how are you feeling emotionally today?'
              }
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  type="button"
                  variant={selectedRating === rating ? "accent" : "outline"}
                  size="lg"
                  className="min-w-[48px] min-h-[48px] font-medium"
                  onClick={() => handleRatingSelect(rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
          </div>

          {/* Physical Pain Question */}
          <div className="space-y-4">
            <label className="block text-base font-medium text-center text-foreground">
              {isNICU
                ? 'Are you experiencing any physical discomfort or pain that\'s affecting your hospital stay?'
                : 'Are you experiencing any unexpected physical pain?'
              }
            </label>
            <div className="flex gap-4 justify-center">
              <Button
                type="button"
                variant={selectedPainAnswer === 'yes' ? "accent" : "outline"}
                size="lg"
                className="min-w-[80px] min-h-[48px] font-medium"
                onClick={() => handlePainSelect('yes')}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={selectedPainAnswer === 'no' ? "accent" : "outline"}
                size="lg"
                className="min-w-[80px] min-h-[48px] font-medium"
                onClick={() => handlePainSelect('no')}
              >
                No
              </Button>
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}