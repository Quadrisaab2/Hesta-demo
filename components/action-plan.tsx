'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActionPlanProps } from '@/lib/types'
import { Heart, BookOpen, MessageCircle } from 'lucide-react'

export default function ActionPlan({ 
  weekPostpartum, 
  onStartChat 
}: ActionPlanProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="app-content py-8 space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-libre font-normal text-foreground">
            Your Personalized Plan for Today
          </h1>
        </header>

        <main className="space-y-6">
          {/* Reassurance Card */}
          <Card className="card-enhanced border-l-4 border-l-accent">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg font-libre">
                    A Note on Your Wellbeing
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pl-13">
              <p className="text-sm text-foreground leading-relaxed">
                It's completely normal to have ups and downs in the first few weeks. 
                Your check-in looks on track. Remember to rest when you can.
              </p>
            </CardContent>
          </Card>

          {/* Education Card */}
          <Card className="card-enhanced border-l-4 border-l-blue-200">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-libre">
                    Recommended for You: Week {weekPostpartum}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pl-13">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground">
                    Understanding Your Baby's Sleep Cues
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    5 min read
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specialist Access Card */}
          <Card className="card-enhanced border-l-4 border-l-green-200">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-libre">
                    Need to talk?
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our AI specialist is available 24/7 to answer your questions.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pl-13">
              <Button 
                onClick={onStartChat}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Start a Chat
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}