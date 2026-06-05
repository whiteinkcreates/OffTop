'use client'

interface ToggleControlProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function ToggleControl({
  label,
  checked,
  onChange,
  disabled = false,
}: ToggleControlProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-6 h-6 cursor-pointer accent-offtop-accent"
      />
      <span className="text-sm font-medium text-gray-200">{label}</span>
    </label>
  )
}
