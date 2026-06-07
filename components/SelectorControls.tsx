'use client'

import { Difficulty } from '@/types'

interface SelectorControlsProps {
  difficulty: Difficulty
  onDifficultyChange: (value: Difficulty) => void
  barCount: number
  onBarCountChange: (value: number) => void
  wordCount: number
  onWordCountChange: (value: number) => void
}

const DIFFICULTY_OPTIONS: Difficulty[] = ['Rookie', 'Open Mic', 'Cipher', 'ColdBars', 'Final Boss']
const BAR_OPTIONS = [4, 8, 16, 32]
const WORD_COUNT_OPTIONS = [3, 4, 5]

export function SelectorControls({
  difficulty,
  onDifficultyChange,
  barCount,
  onBarCountChange,
  wordCount,
  onWordCountChange,
}: SelectorControlsProps) {
  return (
    <div className="space-y-4">
      {/* Difficulty Selector */}
      <div>
        <label className="block text-xs font-bold text-offtop-accent-dim uppercase mb-2">
          Difficulty
        </label>
        <div className="grid grid-cols-5 gap-2">
          {DIFFICULTY_OPTIONS.map((diff) => (
            <button
              key={diff}
              onClick={() => onDifficultyChange(diff)}
              className={`px-3 py-2 rounded-lg font-bold transition-colors text-xs ${
                difficulty === diff
                  ? 'bg-offtop-accent text-offtop-dark'
                  : 'border-2 border-offtop-accent text-offtop-accent hover:bg-offtop-accent hover:text-offtop-dark'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Bars Selector */}
      <div>
        <label className="block text-xs font-bold text-offtop-accent-dim uppercase mb-2">
          Bars
        </label>
        <div className="grid grid-cols-4 gap-2">
          {BAR_OPTIONS.map((bars) => (
            <button
              key={bars}
              onClick={() => onBarCountChange(bars)}
              className={`px-3 py-2 rounded-lg font-bold transition-colors text-sm ${
                barCount === bars
                  ? 'bg-offtop-accent text-offtop-dark'
                  : 'border-2 border-offtop-accent text-offtop-accent hover:bg-offtop-accent hover:text-offtop-dark'
              }`}
            >
              {bars}
            </button>
          ))}
        </div>
      </div>

      {/* Word Count Selector */}
      <div>
        <label className="block text-xs font-bold text-offtop-accent-dim uppercase mb-2">
          Word Count
        </label>
        <div className="grid grid-cols-3 gap-2">
          {WORD_COUNT_OPTIONS.map((count) => (
            <button
              key={count}
              onClick={() => onWordCountChange(count)}
              className={`px-3 py-2 rounded-lg font-bold transition-colors text-sm ${
                wordCount === count
                  ? 'bg-offtop-accent text-offtop-dark'
                  : 'border-2 border-offtop-accent text-offtop-accent hover:bg-offtop-accent hover:text-offtop-dark'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
