'use client'

import { Drill } from '@/types'
import { PillWordList } from './PillWordList'
import { useState } from 'react'

interface CipherDeckCardProps {
  drill: Drill
  onClose?: () => void
}

export function CipherDeckCard({ drill, onClose }: CipherDeckCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const drillText = `
DIFFICULTY: ${drill.difficulty}
THEME: ${drill.theme}
WORDS: ${drill.words.join(', ')}
BARS: ${drill.barCount}
TIME: ${Math.floor(drill.timeSeconds / 60)}:${(drill.timeSeconds % 60).toString().padStart(2, '0')}
BPM: ${drill.bpm}
${drill.persona ? `PERSONA: ${drill.persona.name}` : ''}

CONSTRAINTS:
${Object.entries(drill.constraints)
  .filter(([_, value]) => value === true)
  .map(([key]) => `  • ${key.replace(/([A-Z])/g, ' $1').trim()}`)
  .join('\n')}

PROMPT: ${drill.prompt}
    `.trim()

    navigator.clipboard.writeText(drillText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const activeConstraints = Object.entries(drill.constraints)
    .filter(([_, value]) => value === true)
    .map(([key]) => key)

  return (
    <div className="bg-gray-900 border-3 border-offtop-accent rounded-lg p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-center text-offtop-accent text-xs font-bold uppercase tracking-widest">
          Cipher Deck Loaded
        </div>
        <h2 className="text-center text-3xl font-black text-white">{drill.theme}</h2>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-offtop-accent-dim text-xs font-bold uppercase">Difficulty</div>
          <div className="text-xl font-black text-offtop-accent">{drill.difficulty}</div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-offtop-accent-dim text-xs font-bold uppercase">BPM</div>
          <div className="text-xl font-black text-offtop-accent">{drill.bpm}</div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-offtop-accent-dim text-xs font-bold uppercase">Bars</div>
          <div className="text-xl font-black text-offtop-accent">{drill.barCount}</div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-offtop-accent-dim text-xs font-bold uppercase">Time</div>
          <div className="text-xl font-black text-offtop-accent">
            {Math.floor(drill.timeSeconds / 60)}:{(drill.timeSeconds % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Words */}
      <div>
        <div className="text-offtop-accent-dim text-xs font-bold uppercase mb-2">Words</div>
        <PillWordList words={drill.words} />
      </div>

      {/* Persona if present */}
      {drill.persona && (
        <div className="bg-gray-800 p-3 rounded-lg border-l-4 border-offtop-accent">
          <div className="text-offtop-accent-dim text-xs font-bold uppercase">Persona</div>
          <div className="font-bold text-white">{drill.persona.name}</div>
        </div>
      )}

      {/* Constraints */}
      {activeConstraints.length > 0 && (
        <div>
          <div className="text-offtop-accent-dim text-xs font-bold uppercase mb-2">Active Constraints</div>
          <div className="flex flex-wrap gap-2">
            {activeConstraints.map((constraint) => (
              <div
                key={constraint}
                className="px-2 py-1 bg-offtop-danger text-white text-xs font-bold rounded-md"
              >
                {constraint
                  .replace(/([A-Z])/g, ' $1')
                  .toLowerCase()
                  .trim()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prompt */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="text-offtop-accent text-sm font-bold mb-2 uppercase">Your Prompt</div>
        <p className="text-white text-base leading-relaxed font-medium">{drill.prompt}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-3 bg-offtop-accent text-offtop-dark font-bold rounded-lg hover:bg-offtop-accent-light transition-colors active:scale-95"
        >
          {copied ? '✓ Copied' : 'Copy Drill'}
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-offtop-accent text-offtop-accent font-bold rounded-lg hover:bg-offtop-accent hover:text-offtop-dark transition-colors active:scale-95"
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}
