'use client'

import { Drill } from '@/types'
import { useState } from 'react'
import { CipherDeckCard } from './CipherDeckCard'

interface HistoryListProps {
  drills: Drill[]
  onClearHistory: () => void
}

export function HistoryList({ drills, onClearHistory }: HistoryListProps) {
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null)

  if (drills.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p className="text-sm">No history yet. Generate your first drill!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-offtop-accent-dim uppercase tracking-wider">
          Recent Drills ({drills.length})
        </h3>
        <button
          onClick={onClearHistory}
          className="text-xs font-bold text-offtop-accent-dim hover:text-offtop-danger transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {drills.map((drill) => (
          <button
            key={drill.id}
            onClick={() => setSelectedDrill(drill)}
            className="w-full text-left p-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-offtop-accent hover:bg-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-sm font-bold text-offtop-accent group-hover:text-offtop-accent-light">
                {drill.theme}
              </span>
              <span className="text-xs text-offtop-accent-dim">{drill.difficulty}</span>
            </div>
            <div className="text-xs text-gray-400 group-hover:text-gray-300">
              {drill.words.join(', ')}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(drill.createdAt).toLocaleTimeString()}
            </div>
          </button>
        ))}
      </div>

      {selectedDrill && (
        <div className="mt-4">
          <CipherDeckCard drill={selectedDrill} onClose={() => setSelectedDrill(null)} />
        </div>
      )}
    </div>
  )
}
