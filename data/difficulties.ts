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

export const difficultyConfigs: Record<Difficulty, DifficultyConfig> = {
  'Rookie': {
    name: 'Rookie',
    wordCount: 3,
    barCount: 8,
    defaultTime: 60,
    timeOptions: [30, 60, 90],
    description: 'Easy warmup. 3 words. 8 bars. 60 seconds.',
    bpmMin: 80,
    bpmMax: 90,
    constraints: defaultConstraints,
    wordBanks: ['basic'],
  },
  'Open Mic': {
    name: 'Open Mic',
    wordCount: 4,
    barCount: 16,
    defaultTime: 90,
    timeOptions: [60, 90, 120],
    description: 'Standard challenge. 4 words. 16 bars. 90 seconds.',
    bpmMin: 85,
    bpmMax: 95,
    constraints: defaultConstraints,
    wordBanks: ['intermediate'],
  },
  'Cipher': {
    name: 'Cipher',
    wordCount: 5,
    barCount: 16,
    defaultTime: 90,
    timeOptions: [60, 90, 120],
    description: 'Must use all 5 words. 16 bars. 90 seconds.',
    bpmMin: 90,
    bpmMax: 100,
    constraints: {
      ...defaultConstraints,
      mustUseAllWords: true,
    },
    wordBanks: ['intermediate', 'advanced'],
  },
  'ColdBars': {
    name: 'ColdBars',
    wordCount: 5,
    barCount: 16,
    defaultTime: 90,
    timeOptions: [60, 90, 120],
    description: 'Weird words. No warmup. Good luck, poet.',
    bpmMin: 95,
    bpmMax: 110,
    constraints: {
      ...defaultConstraints,
      mustUseAllWords: true,
      includePunchline: true,
    },
    wordBanks: ['advanced', 'obscure'],
    isHard: true,
  },
  'Final Boss': {
    name: 'Final Boss',
    wordCount: 5,
    barCount: 32,
    defaultTime: 180,
    timeOptions: [120, 180, 240],
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
    wordBanks: ['advanced', 'obscure', 'slang'],
    personaRequired: true,
    isExtreme: true,
  },
}

export function getRandomBPM(difficulty: Difficulty): number {
  const config = difficultyConfigs[difficulty]
  const min = config.bpmMin
  const max = config.bpmMax
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateDrillPrompt(
  difficulty: Difficulty,
  words: string[],
  constraints: ConstraintOptions,
  personaName?: string
): string {
  let prompt = `Create a rap verse for difficulty level: ${difficulty}\n`

  if (personaName) {
    prompt += `Persona: ${personaName}\n`
  }

  prompt += `Required words: ${words.join(', ')}\n`

  if (constraints.mustUseAllWords) {
    prompt += 'You must use all the required words.\n'
  }
  if (constraints.useWordsInOrder) {
    prompt += 'Use the words in the order given.\n'
  }
  if (constraints.includePunchline) {
    prompt += 'Include one clever punchline.\n'
  }
  if (constraints.includeMetaphor) {
    prompt += 'Include one metaphor.\n'
  }
  if (constraints.tellStory) {
    prompt += 'Tell a complete story.\n'
  }
  if (constraints.noProfanity) {
    prompt += 'No profanity allowed.\n'
  }
  if (constraints.switchFlowHalfway) {
    prompt += 'Switch your flow/style halfway through.\n'
  }

  return prompt
}
