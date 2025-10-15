'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardProps, DashboardCardProps } from '@/lib/types'

function DashboardCard({ icon, title, actionType, actionText, onAction }: DashboardCardProps) {
  return (
    <Card className="border-2 hover:border-accent transition-colors duration-200">
      <CardContent className="p-6 text-center space-y-4">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-libre font-normal text-foreground">
          {title}
        </h3>
        {actionType === 'button' ? (
          <Button 
            className="w-full h-11 font-medium" 
            onClick={onAction}
          >
            {actionText}
          </Button>
        ) : (
          <button 
            className="text-foreground underline font-medium hover:text-muted-foreground transition-colors duration-200 py-2"
            onClick={onAction}
          >
            {actionText}
          </button>
        )}
      </CardContent>
    </Card>
  )
}

export default function Dashboard({ weekPostpartum, onStartCheckin }: DashboardProps) {
  const weekText = weekPostpartum === 1 ? 'Week 1' : `Week ${weekPostpartum}`

  const dashboardCards: DashboardCardProps[] = [
    {
      icon: '💝',
      title: 'How are you feeling today?',
      actionType: 'button',
      actionText: 'Start Check-in',
      onAction: onStartCheckin
    },
    {
      icon: '🌸',
      title: 'Understanding the "Baby Blues"',
      actionType: 'link',
      actionText: 'Read More',
      onAction: () => alert('Educational content coming soon!')
    },
    {
      icon: '🌿',
      title: 'Tips for C-Section & Perineal Wound Healing',
      actionType: 'link',
      actionText: 'Learn More',
      onAction: () => alert('Recovery tips coming soon!')
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4 py-8 space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-libre font-normal text-foreground">
            Today's Focus: {weekText} Postpartum
          </h1>
        </header>

        <main className="space-y-6">
          {dashboardCards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </main>
      </div>
    </div>
  )
}