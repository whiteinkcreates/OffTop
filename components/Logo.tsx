export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-400/50 bg-black shadow-[0_0_24px_rgba(163,230,53,0.25)]">
        <div className="absolute top-2 h-4 w-7 rounded-t-full border-2 border-white border-b-0" />
        <div className="absolute top-1 flex items-end gap-1">
          <span className="h-3 w-1 rounded-full bg-lime-400" />
          <span className="h-5 w-1 rounded-full bg-lime-400" />
          <span className="h-4 w-1 rounded-full bg-lime-400" />
        </div>
        <span className="mt-4 text-sm font-black italic tracking-tight text-white">
          OT
        </span>
      </div>

      <div>
        <div className="text-3xl font-black italic tracking-tight text-white">
          Off<span className="text-lime-400">Top</span>
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
          No pen. No prep. <span className="text-lime-400">Just bars.</span>
        </div>
      </div>
    </div>
  )
}