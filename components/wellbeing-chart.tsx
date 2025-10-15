'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WellbeingChartData } from '@/lib/types'

interface WellbeingChartProps {
  data: WellbeingChartData[]
}

export default function WellbeingChart({ data }: WellbeingChartProps) {
  // Generate sample data if none provided
  const chartData = data.length > 0 ? data : [
    { date: '10/09', rating: 2 },
    { date: '10/10', rating: 3 },
    { date: '10/11', rating: 2 },
    { date: '10/12', rating: 4 },
    { date: '10/13', rating: 3 },
    { date: '10/14', rating: 4 },
    { date: '10/15', rating: 4 }
  ]

  const maxRating = 5
  const chartHeight = 120
  const chartWidth = 280

  // Calculate chart points
  const points = chartData.map((item, index) => {
    const x = (index / (chartData.length - 1)) * chartWidth
    const y = chartHeight - ((item.rating / maxRating) * chartHeight)
    return { x, y, rating: item.rating, date: item.date }
  })

  // Create SVG path
  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  return (
    <Card className="card-enhanced bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-libre text-center">
          Your 7-Day Wellbeing Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            width={chartWidth}
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto"
          >
            {/* Grid lines */}
            {[1, 2, 3, 4, 5].map((rating) => {
              const y = chartHeight - ((rating / maxRating) * chartHeight)
              return (
                <line
                  key={rating}
                  x1="0"
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.1"
                />
              )
            })}

            {/* Chart line */}
            <path
              d={pathData}
              fill="none"
              stroke="hsl(var(--accent-foreground))"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="hsl(var(--accent))"
                stroke="hsl(var(--accent-foreground))"
                strokeWidth="2"
              />
            ))}
          </svg>

          {/* Date labels */}
          <div className="flex justify-between mt-2 px-1">
            {chartData.map((item, index) => (
              <span 
                key={index}
                className="text-xs text-muted-foreground font-medium"
              >
                {item.date}
              </span>
            ))}
          </div>

          {/* Rating labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col-reverse justify-between -ml-6 py-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span 
                key={rating}
                className="text-xs text-muted-foreground font-medium"
              >
                {rating}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Average this week: <span className="font-medium text-foreground">
              {(chartData.reduce((sum, item) => sum + item.rating, 0) / chartData.length).toFixed(1)}/5
            </span>
          </p>
          {chartData[chartData.length - 1]?.rating >= chartData[0]?.rating && (
            <p className="text-xs text-green-600 mt-1 font-medium">
              📈 Trending upward - great progress!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}