export const personas = [
  'Cocky underdog',
  'Washed-up superhero',
  'Motivational gym coach',
  'Smooth villain',
  'Alien trying rap for the first time',
  'Heartbroken robot',
  'Broke philosopher',
  'Karaoke champion',
  'Overconfident substitute teacher',
  'Conspiracy uncle',
  'Local legend at an open mic',
  'Rapper who just quit their job',
  'Villain giving a TED Talk',
  'Barista with a god complex',
  'Substitute teacher in battle mode',
  'Guy who thinks the aux cord changed his life',
]

export function getRandomPersona(): string {
  return personas[Math.floor(Math.random() * personas.length)]
}
