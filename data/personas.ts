import { Persona } from '@/types'

export const personas: Persona[] = [
  { id: 'cocky-underdog', name: 'Cocky underdog', description: 'Hungry, overlooked, and talking like the win is already loading.' },
  { id: 'washed-up-superhero', name: 'Washed-up superhero', description: 'Used to save the city, now saves receipts and bad decisions.' },
  { id: 'motivational-gym-coach', name: 'Motivational gym coach', description: 'Everything is discipline, sweat, and yelling through the final rep.' },
  { id: 'smooth-villain', name: 'Smooth villain', description: 'Calm, dangerous, expensive, and somehow still polite.' },
  { id: 'alien-first-rap', name: 'Alien trying rap for the first time', description: 'Confused by Earth, but weirdly nice with the bars.' },
  { id: 'heartbroken-robot', name: 'Heartbroken robot', description: 'Running on low battery, bad memories, and emotional firmware.' },
  { id: 'broke-philosopher', name: 'Broke philosopher', description: 'No money, too many thoughts, suspiciously deep observations.' },
  { id: 'karaoke-champion', name: 'Karaoke champion', description: 'Treats every room like a packed arena and every hook like destiny.' },
  { id: 'overconfident-substitute-teacher', name: 'Overconfident substitute teacher', description: 'No lesson plan, maximum authority, questionable crowd control.' },
  { id: 'conspiracy-uncle', name: 'Conspiracy uncle', description: 'Connects everything to satellites, snacks, and secret meetings.' },
  { id: 'local-legend-open-mic', name: 'Local legend at an open mic', description: 'Half the room knows the stories, the other half is about to.' },
  { id: 'rapper-quit-job', name: 'Rapper who just quit their job', description: 'Free, broke, emotional, and dangerously inspired.' },
  { id: 'villain-ted-talk', name: 'Villain giving a TED Talk', description: 'Evil plan, clean slides, confident pacing.' },
  { id: 'barista-god-complex', name: 'Barista with a god complex', description: 'Pulls espresso shots and judges everyone’s entire life.' },
  { id: 'substitute-teacher-battle-mode', name: 'Substitute teacher in battle mode', description: 'Attendance sheet in one hand, diss track in the other.' },
  { id: 'aux-cord-life-change', name: 'Guy who thinks the aux cord changed his life', description: 'Every song choice is personal branding and emotional warfare.' },
]

export function getRandomPersona(): Persona {
  return personas[Math.floor(Math.random() * personas.length)]
}
