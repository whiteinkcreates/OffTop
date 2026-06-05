export const wordBanks = {
  easy: [
    'money',
    'dreams',
    'light',
    'crown',
    'fire',
    'night',
    'flight',
    'might',
    'sight',
    'bright',
    'thunder',
    'wonder',
    'sound',
    'ground',
    'bound',
  ],
  weird: [
    'velvet',
    'satellite',
    'oracle',
    'glitch',
    'neon',
    'shoelace',
    'jukebox',
    'static',
    'shadowbox',
    'loophole',
    'voicemail',
    'gasoline',
    'concrete',
    'counterfeit',
    'alias',
  ],
  visual: [
    'avalanche',
    'rooftop',
    'basement',
    'elevator',
    'knuckles',
    'wristwatch',
    'receipt',
    'pressure',
    'midnight',
    'thunderstorm',
    'ransom',
    'daydream',
    'eviction',
    'neon',
    'snapshot',
  ],
  abstract: [
    'paradox',
    'perspective',
    'momentum',
    'frequency',
    'resonance',
    'equilibrium',
    'nexus',
    'catalyst',
    'vector',
    'synergy',
    'zeitgeist',
    'entropy',
    'anomaly',
    'essence',
    'vortex',
  ],
  battle: [
    'shatter',
    'scatter',
    'weapon',
    'vanquish',
    'siege',
    'thunder',
    'lightning',
    'collision',
    'explosion',
    'dominance',
    'conquest',
    'crushed',
    'savage',
    'beast',
    'lethal',
  ],
  funny: [
    'pickle',
    'wobble',
    'noodle',
    'sneeze',
    'hiccup',
    'wiggle',
    'squirm',
    'fumble',
    'stumble',
    'bumble',
    'giggle',
    'chuckle',
    'sneaker',
    'zipper',
    'fidget',
  ],
  multiSyllable: [
    'encyclopedia',
    'photography',
    'technology',
    'magnificent',
    'catastrophe',
    'mathematics',
    'intellectual',
    'revolutionary',
    'extraordinary',
    'communication',
    'architecture',
    'biological',
    'geographical',
    'mechanical',
    'philosophical',
  ],
}

export type WordCategory = keyof typeof wordBanks

export function getRandomWords(count: number, category?: WordCategory): string[] {
  const categories: WordCategory[] = category ? [category] : Object.keys(wordBanks) as WordCategory[]
  const selectedBank = [...wordBanks[categories[Math.floor(Math.random() * categories.length)]]]
  const result: string[] = []

  for (let i = 0; i < Math.min(count, selectedBank.length); i++) {
    const randomIdx = Math.floor(Math.random() * selectedBank.length)
    result.push(selectedBank[randomIdx])
    selectedBank.splice(randomIdx, 1)
  }

  return result
}

export function getMixedWords(count: number): string[] {
  const result: string[] = []
  const categories: WordCategory[] = Object.keys(wordBanks) as WordCategory[]
  const bankCopies: Record<WordCategory, string[]> = {} as any
  
  Object.keys(wordBanks).forEach((cat) => {
    bankCopies[cat as WordCategory] = [...wordBanks[cat as WordCategory]]
  })

  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length]
    const bank = bankCopies[category]
    const randomIdx = Math.floor(Math.random() * bank.length)
    result.push(bank[randomIdx])
    bank.splice(randomIdx, 1)
  }

  return result
}
