'use client'

import { Drill } from '@/types'
import { PillWordList } from './PillWordList'

interface CipherDeckCardProps {
  drill: Drill
  onCopy?: () => void
  copied?: boolean
}

export function CipherDeckCard({ drill, onCopy, copied }: CipherDeckCardProps) {
  const getConstraintLabels = (): string[] => {
    const labels: string[] = []
    if (drill.constraints.mustUseAllWords) labels.push('Use all words')
    if (drill.constraints.useWordsInOrder) labels.push('Use words in order')
    if (drill.constraints.includePunchline) labels.push('Include one punchline')
    if (drill.constraints.includeMetaphor) labels.push('Include one metaphor')
    if (drill.constraints.tellStory) labels.push('Tell a story')
    if (drill.constraints.noProfanity) labels.push('No profanity')
    if (drill.constraints.switchFlowHalfway) labels.push('Switch flow halfway')
    return labels
  }

  const constraints = getConstraintLabels()

  const getDrillPrompt = (): string => {
    const wordList = drill.words.join(', ')
    const withPersona = drill.persona ? ` Perform as a ${drill.persona}.` : ''
    return `Freestyle ${drill.barCount} bars about ${drill.theme}. Use the words: ${wordList}.${withPersona}`
  }

  const generateShareText = (): string => {
    const wordList = drill.words.join(', ')
    const constraintText = constraints.length > 0 ? `\n\nRules:\n${constraints.map((c) => `• ${c}`).join('\n')}` : ''
    const personaText = drill.persona ? `\nPersona: ${drill.persona}` : ''

    return `CIPHER DECK - OffTop

SpitKit loaded your drill.

Difficulty: ${drill.difficulty}
Theme: ${drill.theme}
Bars: ${drill.barCount}
Time: ${drill.timeLimit}s
Suggested BPM: ${drill.suggestedBPM}

Words:
${drill.words.map((w) => `• ${w}`).join('\n')}${personaText}${constraintText}

Prompt:
${getDrillPrompt()}

No pen. No prep. Just bars.`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText())
      onCopy?.()
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-900 border-2 border-offtop-accent rounded-lg p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-offtop-accent-dim uppercase tracking-wider">
            CIPHER DECK
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            SpitKit loaded your drill.
          </h2>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Difficulty</span>
            <div className="font-bold text-lg">
              {drill.difficulty === 'ColdBars' ? (
                <span className="text-offtop-cold">ColdBars</span>
              ) : drill.difficulty === 'Final Boss' ? (
                <span className="text-offtop-danger">Final Boss</span>
              ) : (
                drill.difficulty
              )}
            </div>
          </div>
          <div>
            <span className="text-gray-400">Theme</span>
            <div className="font-bold text-lg">{drill.theme}</div>
          </div>
          <div>
            <span className="text-gray-400">Bars</span>
            <div className="font-bold text-lg">{drill.barCount}</div>
          </div>
          <div>
            <span className="text-gray-400">Time</span>
            <div className="font-bold text-lg">{drill.timeLimit}s</div>
          </div>
          <div>
            <span className="text-gray-400">Suggested BPM</span>
            <div className="font-bold text-lg">{drill.suggestedBPM}</div>
          </div>
        </div>

        {/* Words */}
        <div>
          <div className="text-gray-400 text-sm mb-3 font-bold">WORDS</div>
          <PillWordList words={drill.words} />
        </div>

        {/* Persona */}
        {drill.persona && (
          <div>
            <div className="text-gray-400 text-sm mb-2 font-bold">PERSONA</div>
            <div className="font-semibold">{drill.persona}</div>
          </div>
        )}

        {/* Rules/Constraints */}
        {constraints.length > 0 && (
          <div>
            <div className="text-gray-400 text-sm mb-3 font-bold">RULES</div>
            <ul className="space-y-2">
              {constraints.map((constraint, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-offtop-accent mt-1">•</span>
                  <span className="text-sm">{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prompt */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-gray-400 text-xs font-bold mb-2">PROMPT</div>
          <p className="text-sm leading-relaxed">{getDrillPrompt()}</p>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`w-full py-3 font-bold rounded-lg transition ${
            copied
              ? 'bg-offtop-accent text-offtop-dark'
              : 'bg-offtop-accent-dim text-offtop-dark hover:bg-offtop-accent'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy Drill'}
        </button>
      </div>
    </div>
  )
}
