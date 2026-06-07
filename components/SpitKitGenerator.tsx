'use client'

import { useState, useCallback, useEffect } from 'react'
import { Drill, Difficulty, ConstraintOptions, Persona } from '@/types'
import { difficultyConfigs, getRandomBPM, generateDrillPrompt } from '@/data/difficulties'
import { getMixedWords } from '@/data/wordBanks'
import { getRandomTheme } from '@/data/themes'
import { getRandomPersona, personas } from '@/data/personas'
import { SelectorControls } from './SelectorControls'
import { ToggleControl } from './ToggleControl'
import { Timer } from './Timer'
import { CipherDeckCard } from './CipherDeckCard'
import { HistoryList } from './HistoryList'

interface SpitKitGeneratorProps {
  onDrillGenerated?: (drill: Drill) => void
}

export function SpitKitGenerator({ onDrillGenerated }: SpitKitGeneratorProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('Rookie')
  const [wordCount, setWordCount] = useState(3)
  const [barCount, setBarCount] = useState(8)
  const [theme, setTheme] = useState<string>('')
  const [words, setWords] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState(60)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [useRandomPersona, setUseRandomPersona] = useState(false)
  const [constraints, setConstraints] = useState<ConstraintOptions>({
    mustUseAllWords: false,
    useWordsInOrder: false,
    includePunchline: false,
    includeMetaphor: false,
    tellStory: false,
    noProfanity: false,
    switchFlowHalfway: false,
  })
  const [generatedDrill, setGeneratedDrill] = useState<Drill | null>(null)
  const [drillHistory, setDrillHistory] = useState<Drill[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('offtop-history')
      if (saved) {
        setDrillHistory(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load history:', error)
    }
  }, [])

  // Update difficulty config
  useEffect(() => {
    const config = difficultyConfigs[difficulty]
    setWordCount(config.wordCount)
    setBarCount(config.barCount)
    setSelectedTime(config.defaultTime)
    setConstraints(config.constraints)
    setUseRandomPersona(config.personaRequired ?? false)
  }, [difficulty])

  // Generate words when difficulty or word count changes
  useEffect(() => {
    const newWords = getMixedWords(wordCount)
    setWords(newWords)
  }, [difficulty, wordCount])

  // Generate theme on mount and when difficulty changes
  useEffect(() => {
    setTheme(getRandomTheme())
  }, [difficulty])

  const handleDifficultyChange = (value: Difficulty) => {
    setDifficulty(value)
    setGeneratedDrill(null)
  }

  const handleBarCountChange = (value: number) => {
    setBarCount(value)
  }

  const handleWordCountChange = (value: number) => {
    setWordCount(value)
  }

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time)
  }

  const handleConstraintToggle = (key: keyof ConstraintOptions) => {
    setConstraints((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const generateDrill = useCallback(() => {
        const personaToUse = useRandomPersona ? getRandomPersona() : selectedPersona

    const newDrill: Drill = {
      id: Date.now().toString(),
      difficulty,
      theme,
      barCount,
      timeSeconds: selectedTime,
      bpm: getRandomBPM(difficulty),
      words,
      persona: personaToUse,
      constraints,
      prompt: generateDrillPrompt(difficulty, words, constraints, personaToUse?.name),
      createdAt: new Date().toISOString(),
    }

    setGeneratedDrill(newDrill)

    // Save to history
    const updatedHistory = [newDrill, ...drillHistory].slice(0, 10)
    setDrillHistory(updatedHistory)
    try {
      localStorage.setItem('offtop-history', JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('Failed to save history:', error)
    }

    onDrillGenerated?.(newDrill)
  }, [difficulty, theme, barCount, selectedTime, words, constraints, selectedPersona, useRandomPersona, drillHistory, onDrillGenerated])

  const generateNewWords = useCallback(() => {
    const newWords = getMixedWords(wordCount)
    setWords(newWords)
    setGeneratedDrill(null)
  }, [wordCount])

  const generateNewTheme = useCallback(() => {
    setTheme(getRandomTheme())
    setGeneratedDrill(null)
  }, [])

  const randomizeEverything = useCallback(() => {
    const difficulties: Difficulty[] = ['Rookie', 'Open Mic', 'Cipher', 'ColdBars', 'Final Boss']
    const randomDiff = difficulties[Math.floor(Math.random() * difficulties.length)]
    setDifficulty(randomDiff)
    setTheme(getRandomTheme())
    setGeneratedDrill(null)
  }, [])

  const clearHistory = useCallback(() => {
    setDrillHistory([])
    try {
      localStorage.removeItem('offtop-history')
    } catch (error) {
      console.error('Failed to clear history:', error)
    }
  }, [])

  const config = difficultyConfigs[difficulty]
  const timeOptions = config.timeOptions

  return (
    <div className="w-full space-y-6">
      {/* Selectors */}
      <div className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4">
        <SelectorControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          barCount={barCount}
          onBarCountChange={handleBarCountChange}
          wordCount={wordCount}
          onWordCountChange={handleWordCountChange}
        />
      </div>

      {/* Theme */}
      <div className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-offtop-accent-dim uppercase mb-2">Theme</div>
            <div className="text-2xl font-black text-offtop-accent">{theme}</div>
          </div>
          <button
            onClick={generateNewTheme}
            className="px-4 py-2 border-2 border-offtop-accent text-offtop-accent font-bold rounded-lg hover:bg-offtop-accent hover:text-offtop-dark transition-colors active:scale-95"
          >
            New
          </button>
        </div>
      </div>

      {/* Words */}
      <div className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-offtop-accent-dim uppercase">Words</div>
          <button
            onClick={generateNewWords}
            className="text-xs font-bold text-offtop-accent hover:text-offtop-accent-light transition-colors"
          >
            New
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {words.map((word) => (
            <div key={word} className="px-3 py-1 bg-offtop-accent text-offtop-dark text-sm font-bold rounded-full">
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4">
        <div className="text-xs font-bold text-offtop-accent-dim uppercase mb-3">Time</div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`px-3 py-2 rounded-lg font-bold transition-colors text-sm ${
                selectedTime === time
                  ? 'bg-offtop-accent text-offtop-dark'
                  : 'border-2 border-offtop-accent text-offtop-accent hover:bg-offtop-accent hover:text-offtop-dark'
              }`}
            >
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {/* Timer */}
      <div className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4">
        <Timer initialSeconds={selectedTime} />
      </div>

      {/* Constraints */}
      {difficulty !== 'Rookie' && (
        <div className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4 space-y-3">
          <div className="text-xs font-bold text-offtop-accent-dim uppercase">Constraints</div>
          <ToggleControl
            label="Must use all words"
            checked={constraints.mustUseAllWords}
            onChange={() => handleConstraintToggle('mustUseAllWords')}
          />
          <ToggleControl
            label="Use words in order"
            checked={constraints.useWordsInOrder}
            onChange={() => handleConstraintToggle('useWordsInOrder')}
          />
          <ToggleControl
            label="Include one punchline"
            checked={constraints.includePunchline}
            onChange={() => handleConstraintToggle('includePunchline')}
          />
          <ToggleControl
            label="Include one metaphor"
            checked={constraints.includeMetaphor}
            onChange={() => handleConstraintToggle('includeMetaphor')}
          />
          <ToggleControl
            label="Tell a complete story"
            checked={constraints.tellStory}
            onChange={() => handleConstraintToggle('tellStory')}
          />
          <ToggleControl
            label="No profanity"
            checked={constraints.noProfanity}
            onChange={() => handleConstraintToggle('noProfanity')}
          />
          <ToggleControl
            label="Switch flow halfway"
            checked={constraints.switchFlowHalfway}
            onChange={() => handleConstraintToggle('switchFlowHalfway')}
          />
        </div>
      )}

      {/* Persona */}
      {(difficulty === 'Final Boss' || selectedPersona) && (
        <div className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-offtop-accent-dim uppercase">Persona</div>
            {!useRandomPersona && (
              <button
                onClick={() => setSelectedPersona(null)}
                className="text-xs text-offtop-accent hover:text-offtop-accent-light"
              >
                Clear
              </button>
            )}
          </div>
          <ToggleControl
            label="Random Persona"
            checked={useRandomPersona}
            onChange={setUseRandomPersona}
          />
          {!useRandomPersona && (
            <select
              value={selectedPersona?.id || ''}
              onChange={(e) => {
                const persona = personas.find((p) => p.id === e.target.value)
                setSelectedPersona(persona || null)
              }}
              className="w-full px-4 py-2 bg-gray-800 border-2 border-gray-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offtop-accent text-sm"
            >
              <option value="">Select a persona...</option>
              {personas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Deal a Drill Button */}
      <button
        onClick={generateDrill}
        className="w-full px-6 py-4 bg-offtop-accent text-offtop-dark font-black text-lg rounded-lg hover:bg-offtop-accent-light transition-colors active:scale-95 uppercase tracking-wider"
      >
        Deal a Drill
      </button>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={randomizeEverything}
          className="px-4 py-3 border-2 border-offtop-accent text-offtop-accent font-bold rounded-lg hover:bg-offtop-accent hover:text-offtop-dark transition-colors active:scale-95 text-sm"
        >
          Randomize All
        </button>
      </div>

      {/* Generated Drill */}
      {generatedDrill && <CipherDeckCard drill={generatedDrill} />}

      {/* History */}
      {drillHistory.length > 0 && (
        <div className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4">
          <HistoryList drills={drillHistory} onClearHistory={clearHistory} />
        </div>
      )}
    </div>
  )
}
