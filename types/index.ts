export type Difficulty = 'Rookie' | 'Open Mic' | 'Cipher' | 'ColdBars' | 'Final Boss'

export interface Persona {
  id: string
  name: string
  description?: string
}

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
  timeSeconds: number
  bpm: number
  words: string[]
  persona?: Persona | null
  constraints: ConstraintOptions
  prompt: string
  createdAt: string
}

export interface DifficultyConfig {
  name: Difficulty
  wordCount: number
  barCount: number
  defaultTime: number
  timeOptions: number[]
  description: string
  bpmMin: number
  bpmMax: number
  constraints: ConstraintOptions
  wordBanks: string[]
  personaRequired?: boolean
  isHard?: boolean
  isExtreme?: boolean
}
