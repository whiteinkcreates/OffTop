export const themes = [
  'Brag rap',
  'Battle rap',
  'Storytelling',
  'Motivational',
  'Funny freestyle',
  'Heartbreak',
  'Club track',
  'Villain mode',
  'Sci-fi',
  'Sports',
  'Hustle',
  'Childhood memory',
  'Wild conspiracy',
  'Food',
  'San Diego',
  'Karaoke night',
  'Broke genius',
  'Villain origin story',
  'Explain a normal thing like it is life or death',
  'Late night gas station prophecy',
  'Rap like you just won rent money',
  'Apologize without actually apologizing',
  'Turn a tiny inconvenience into a movie trailer',
]

export function getRandomTheme(): string {
  return themes[Math.floor(Math.random() * themes.length)]
}
