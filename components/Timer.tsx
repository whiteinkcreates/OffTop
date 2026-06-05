'use client'

import { useState, useEffect } from 'react'

interface TimerProps {
  initialSeconds: number
  onTimeUp?: () => void
}

export function Timer({ initialSeconds, onTimeUp }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false)
      onTimeUp?.()
    }

    return () => clearInterval(interval)
  }, [isRunning, seconds, onTimeUp])

  const formatTime = (secs: number): string => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setSeconds(initialSeconds)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-6xl font-bold font-mono text-offtop-accent tracking-tight">
        {formatTime(seconds)}
      </div>

      {seconds === 0 && !isRunning && (
        <div className="text-3xl font-bold text-offtop-danger animate-pulse">
          TIME!
        </div>
      )}

      <div className="flex gap-3 w-full justify-center flex-wrap">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-6 py-3 bg-offtop-accent text-offtop-dark font-bold rounded-lg hover:bg-offtop-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Start the Cipher
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="px-6 py-3 bg-offtop-cold text-offtop-dark font-bold rounded-lg hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
