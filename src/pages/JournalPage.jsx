export default function JournalPage() {
  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 pt-10 pb-4 bg-slate-950 sticky top-0 z-10 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📓</span>
          <div>
            <h1 className="text-lg font-bold text-slate-100">Journal</h1>
            <p className="text-xs text-slate-400">Travel notes & memories</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center py-16 text-slate-600">
        <div className="text-5xl mb-4">📓</div>
        <p className="text-sm font-medium text-slate-400">Journal coming in Milestone 2</p>
        <p className="text-xs mt-2 leading-relaxed">
          Write posts during the trip, tagged by city and date.
        </p>
      </div>
    </div>
  )
}
