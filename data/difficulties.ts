import type { DifficultyConfig, Difficulty, ConstraintOptions } from '@/types'

const defaultConstraints: ConstraintOptions = {
  mustUseAllWords: false,
  useWordsInOrder: false,
  includePunchline: false,
  includeMetaphor: false,
  tellStory: false,
  noProfanity: false,
  switchFlowHalfway: false,
}

export const difficulties: Record<Difficulty, DifficultyConfig> = {
  'Rookie': {
    name: 'Rookie',
    wordCount: 3,
    barCount: 8,
    timeLimit: 60,
    description: 'Easy warmup. 3 words. 8 bars. 60 seconds.',
    bpmMin: 80,
    bpmMax: 90,
    constraints: defaultConstraints,
  },
  'Open Mic': {
    name: 'Open Mic',
    wordCount: 4,
    barCount: 16,
    timeLimit: 90,
    description: 'Standard challenge. 4 words. 16 bars. 90 seconds.',
    bpmMin: 85,
    bpmMax: 95,
    constraints: defaultConstraints,
  },
  'Cipher': {
    name: 'Cipher',
    wordCount: 5,
    barCount: 16,
    timeLimit: 90,
    description: 'Must use all 5 words. 16 bars. 90 seconds.',
    bpmMin: 90,
    bpmMax: 100,
    constraints: {
      ...defaultConstraints,
      mustUseAllWords: true,
    },
  },
  'ColdBars': {
    name: 'ColdBars',
    wordCount: 5,
    barCount: 16,
    timeLimit: 90,
    description: 'Weird words. No warmup. Good luck, poet.',
    bpmMin: 95,
    bpmMax: 110,
    constraints: {
      ...defaultConstraints,
      mustUseAllWords: true,
      includePunchline: true,
    },
    isHard: true,
  },
  'Final Boss': {
    name: 'Final Boss',
    wordCount: 5,
    barCount: 32,
    timeLimit: 180,
    description: 'Ridiculous mode. Random theme & persona. 32 bars. 3 minutes.',
    bpmMin: 100,
    bpmMax: 120,
    constraints: {
      ...defaultConstraints,
      mustUseAllWords: true,
      useWordsInOrder: true,
      includeMetaphor: true,
      switchFlowHalfway: true,
    },
    isExtreme: true,
  },
}

export function getSuggestedBPM(difficulty: Difficulty): number {
  const config = difficulties[difficulty]
  const min = config.bpmMin
  const max = config.bpmMax
  return Math.floor((min + max) / 2)
}
