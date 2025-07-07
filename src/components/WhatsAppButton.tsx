import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  children?: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export function WhatsAppButton({ 
  phoneNumber = '6588911844', 
  message = 'Hi BBQ Affair! I\'m interested in your catering services.',
  children,
  variant = 'default',
  size = 'default',
  className = ''
}: WhatsAppButtonProps) {
  const generateWhatsAppLink = () => {
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  }

  const handleClick = () => {
    window.open(generateWhatsAppLink(), '_blank')
  }

  return (
    <Button 
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      {children || 'Chat on WhatsApp'}
    </Button>
  )
}

// Predefined message templates
export const WhatsAppMessages = {
  general: "Hi BBQ Affair! I'm interested in your catering services.",
  booking: "Hi BBQ Affair! I'd like to book a BBQ event.",
  menu: "Hi BBQ Affair! I'd like to know more about your menu options.",
  pricing: "Hi BBQ Affair! Could you provide pricing information for my event?",
  quote: (guests: number, date?: string, eventType?: string) => {
    let message = `Hi BBQ Affair! I'd like to get a quote for ${guests} guests`
    if (eventType) message += ` for a ${eventType}`
    if (date) message += ` on ${date}`
    message += '. Could you help me with the details?'
    return message
  },
  customOrder: (orderDetails: string) => 
    `Hi BBQ Affair! I have a custom catering request: ${orderDetails}`,
  support: "Hi BBQ Affair! I need assistance with my order."
} 