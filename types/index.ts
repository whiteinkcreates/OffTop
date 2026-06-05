export type Difficulty = 'Rookie' | 'Open Mic' | 'Cipher' | 'ColdBars' | 'Final Boss'

export interface ConstraintOptions {
  mustUseAllWords: boolean
  useWordsInOrder: boolean
  includePunchline: boolean
  includeMetaphor: boolean
  tellStory: boolean
  noProfanity: boolean
  switchFlowHalfway: boolean
}

export interface Drill {
  id: string
  difficulty: Difficulty
  theme: string
  barCount: number
  timeLimit: number // seconds
  words: string[]
  persona?: string
  constraints: ConstraintOptions
  suggestedBPM: number
  createdAt: Date
}

export interface DifficultyConfig {
  name: Difficulty
  wordCount: number
  barCount: number
  timeLimit: number
  description: string
  bpmMin: number
  bpmMax: number
  constraints: ConstraintOptions
  isHard?: boolean
  isExtreme?: boolean
}
