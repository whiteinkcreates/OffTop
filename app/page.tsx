'use client'

import { Logo } from '@/components/Logo'
import { SpitKitGenerator } from '@/components/SpitKitGenerator'

export default function Home() {
  return (
    <main className="min-h-screen bg-offtop-dark text-white pb-8">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-offtop-dark/95 backdrop-blur border-b border-gray-800 px-4 py-4">
        <Logo />
      </div>

      {/* Container */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-offtop-accent mb-2">SpitKit</h1>
          <p className="text-gray-400 text-sm">Freestyle challenge generator</p>
        </div>

        <SpitKitGenerator />
      </div>
    </main>
  )
}
