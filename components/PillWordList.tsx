'use client'

interface PillWordListProps {
  words: string[]
  interactive?: boolean
}

export function PillWordList({ words, interactive = false }: PillWordListProps) {
  return (
    <div className="flex flex-wrap gap-3 w-full">
      {words.map((word, idx) => (
        <div
          key={idx}
          className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap ${
            interactive
              ? 'bg-offtop-accent text-offtop-dark cursor-pointer hover:bg-offtop-accent-light transition'
              : 'bg-offtop-cold text-offtop-dark'
          }`}
        >
          {word}
        </div>
      ))}
    </div>
  )
}
