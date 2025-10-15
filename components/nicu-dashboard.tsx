'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardProps } from '@/lib/types'
import WellbeingChart from './wellbeing-chart'
import { Heart, Users, Building2, BookOpen } from 'lucide-react'

interface NICUDashboardProps extends DashboardProps {
  gestationWeeks: number
}

export default function NICUDashboard({ 
  onStartCheckin, 
  checkinHistory,
  gestationWeeks
}: NICUDashboardProps) {

  // Define our soft yellow accent color
  const accentColor = '#F8F4F0' // oklch(0.9817 0.0872 107.21)
  
  const nicuArticles = [
    {
      icon: <Heart className="w-6 h-6" style={{ color: accentColor }} />,
      title: 'Understanding Kangaroo Care',
      subtitle: 'Learn about the benefits of skin-to-skin contact',
      description: 'Discover how this simple practice supports your baby\'s development',
      onAction: () => alert('Kangaroo care guide coming soon!')
    },
    {
      icon: <Users className="w-6 h-6" style={{ color: accentColor }} />,
      title: 'You\'re Not Alone',
      subtitle: 'Connecting with Other NICU Parents',
      description: 'Find resources and communities for support during this journey',
      onAction: () => alert('Support communities coming soon!')
    },
    {
      icon: <Building2 className="w-6 h-6" style={{ color: accentColor }} />,
      title: 'Navigating Your Hospital Stay',
      subtitle: 'Tips for managing your time and wellbeing',
      description: 'Practical advice for your NICU experience',
      onAction: () => alert('Hospital guide coming soon!')
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

        {/* Empathetic Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-libre font-normal text-foreground">
            Premature Baby Support Hub
          </h1>
          <p className="text-sm text-muted-foreground px-4">
            You're navigating something incredibly challenging. We're here to support you every step of the way.
          </p>
        </div>

        {/* Main Check-in Card - NICU focused */}
        <Card className="card-enhanced bg-white shadow-md border-0">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-4xl mb-2">🤱</div>
            <h2 className="text-xl font-libre font-normal text-foreground">
              How are you coping today?
            </h2>
            <p className="text-sm text-muted-foreground mb-4 px-2">
              Your wellbeing matters. Let's check in on how you're feeling in this hospital environment.
            </p>
            <Button 
              className="w-full h-12 text-base font-medium text-gray-800 hover:opacity-90" 
              style={{ backgroundColor: accentColor }}
              onClick={onStartCheckin}
            >
              Start NICU Check-in
            </Button>
          </CardContent>
        </Card>

        {/* NICU Support Resources */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-libre font-medium text-foreground">
              Support & Resources
            </h3>
            <span 
              className="text-xs text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: accentColor }}
            >
              NICU Specialized
            </span>
          </div>
          
          <div className="space-y-4">
            {nicuArticles.map((article, index) => (
              <Card 
                key={index}
                className="card-enhanced bg-white cursor-pointer hover:shadow-md transition-all duration-300"
                style={{ border: `1px solid ${accentColor}` }}
                onClick={article.onAction}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 mt-1">
                      {article.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-libre font-medium text-base text-foreground">
                        {article.title}
                      </h4>
                      <p className="text-sm font-medium text-gray-700">
                        {article.subtitle}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                    <BookOpen className="w-4 h-4 text-gray-400 mt-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gentle Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="card-enhanced border-0"
            style={{ backgroundColor: accentColor }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-xl font-libre font-medium text-gray-800">
                {gestationWeeks} weeks
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Born at gestation
              </p>
            </CardContent>
          </Card>
          <Card 
            className="card-enhanced border-0"
            style={{ backgroundColor: accentColor }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-xl font-libre font-medium text-gray-800">
                {checkinHistory.length}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Check-ins completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Encouragement Message */}
        <Card className="card-enhanced bg-white shadow-sm border-0">
          <CardContent className="p-5 text-center">
            <div className="text-2xl mb-3">
              <Heart 
                className="w-8 h-8 mx-auto" 
                style={{ color: accentColor }} 
                fill="currentColor"
              />
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Remember:</strong> Every day is a step forward. Your love and presence are making a profound difference in your baby's development.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}