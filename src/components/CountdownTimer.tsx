import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const weddingDate = new Date('2026-08-01T00:00:00')
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +weddingDate - +new Date()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {timeUnits.map((unit, index) => (
        <div 
          key={unit.label}
          className="flex flex-col items-center"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="hover-lift relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-white to-cream-100 backdrop-blur-sm rounded-2xl shadow-lg ring-1 ring-sage-200/60 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-sage-800">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="mt-3 text-xs sm:text-sm font-medium text-sage-600 uppercase tracking-[0.2em]">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
