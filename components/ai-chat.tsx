'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChatMessage } from '@/lib/types'
import { ArrowLeft, Send } from 'lucide-react'
import { useState } from 'react'

interface AIChatProps {
  onBack: () => void
}

export default function AIChat({ onBack }: AIChatProps) {
  const [newMessage, setNewMessage] = useState('')

  const initialMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'ai',
      message: 'Hello! I\'m your Hesta AI companion. I see you\'ve completed your check-in. How can I help you today?',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'user',
      message: 'I\'m just a bit worried about feeding. Is it normal for my baby to be feeding so often?',
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      sender: 'ai',
      message: 'That\'s a very common question! It\'s called cluster feeding and is completely normal in the early weeks as your baby helps establish your milk supply. Here is a short article with more information if you\'d like to read it.',
      timestamp: '10:33 AM'
    }
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would handle sending the message here
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const ChatBubble = ({ message }: { message: ChatMessage }) => {
    const isAI = message.sender === 'ai'
    
    return (
      <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`max-w-[80%] ${isAI ? 'order-1' : 'order-2'}`}>
          {isAI && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-accent-foreground">H</span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                Hesta AI
              </span>
            </div>
          )}
          
          <Card className={`p-3 ${
            isAI 
              ? 'bg-secondary border-secondary' 
              : 'bg-primary text-primary-foreground border-primary'
          }`}>
            <p className="text-sm leading-relaxed">{message.message}</p>
          </Card>
          
          <div className={`text-xs text-muted-foreground mt-1 ${
            isAI ? 'text-left' : 'text-right'
          }`}>
            {message.timestamp}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-0">
        <div className="app-content space-y-4">
          {initialMessages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Message Input - Above Navigation */}
      <div className="border-t border-border bg-background p-4">
        <div className="app-content">
          <div className="flex gap-2 items-center">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            AI responses are for informational purposes only
          </p>
        </div>
      </div>
    </div>
  )
}