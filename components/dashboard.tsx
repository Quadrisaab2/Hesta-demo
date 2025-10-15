'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardProps, DashboardCardProps } from '@/lib/types'
import WellbeingChart from './wellbeing-chart'

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

interface ExtendedDashboardProps extends DashboardProps {
  activeTab: 'home' | 'learn' | 'support' | 'me'
  onTabChange: (tab: 'home' | 'learn' | 'support' | 'me') => void
}

export default function Dashboard({ 
  weekPostpartum, 
  onStartCheckin, 
  checkinHistory,
  activeTab,
  onTabChange
}: ExtendedDashboardProps) {
  const weekText = weekPostpartum === 1 ? 'Week 1' : `Week ${weekPostpartum}`

  const learningArticles = [
    {
      icon: '🌸',
      title: 'Understanding the "Baby Blues"',
      subtitle: '4 min read',
      onAction: () => alert('Educational content coming soon!')
    },
    {
      icon: '🌿',
      title: 'C-Section Recovery Tips',
      subtitle: '6 min read',
      onAction: () => alert('Recovery tips coming soon!')
    },
    {
      icon: '🤱',
      title: 'Baby Sleep Cues',
      subtitle: '5 min read',
      onAction: () => alert('Sleep guide coming soon!')
    }
  ]

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="app-content py-6 space-y-6">
          {/* Wellbeing Chart */}
          <WellbeingChart data={checkinHistory.map(item => ({
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
            rating: item.emotionalRating
          }))} />

          {/* Main Check-in Card - Elevated */}
          <Card className="card-enhanced border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-4xl mb-2">💝</div>
              <h2 className="text-xl font-libre font-normal text-foreground">
                How are you feeling today?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Your daily check-in helps us understand your journey
              </p>
              <Button 
                className="w-full h-12 text-base font-medium" 
                onClick={onStartCheckin}
              >
                Start Check-in
              </Button>
            </CardContent>
          </Card>

          {/* Learning Carousel Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-libre font-medium text-foreground">
                Recommended for You
              </h3>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                See all
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {learningArticles.map((article, index) => (
                <Card 
                  key={index}
                  className="card-enhanced flex-shrink-0 w-48 cursor-pointer hover:border-accent transition-colors duration-200"
                  onClick={article.onAction}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="text-2xl">{article.icon}</div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {article.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="card-enhanced">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-libre font-medium text-foreground">
                  {weekText}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Postpartum
                </p>
              </CardContent>
            </Card>
            <Card className="card-enhanced">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-libre font-medium text-foreground">
                  {checkinHistory.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Check-ins completed
                </p>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  )
}