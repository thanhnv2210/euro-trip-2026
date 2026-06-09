import { useRef, useState } from 'react'
import { useTrip } from '../context/TripContext'
import { exportJSON, importJSON } from '../services/storageService'

export default function BackupSheet({ onClose }) {
  const { state, dispatch } = useTrip()
  const fileRef = useRef(null)
  const [status, setStatus] = useState(null) // 'ok' | 'error'
  const [msg, setMsg] = useState('')

  function handleExport() {
    exportJSON(state)
    setStatus('ok')
    setMsg('Backup downloaded')
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const restored = importJSON(ev.target.result)
        dispatch({ type: 'SET_STATE', payload: restored })
        setStatus('ok')
        setMsg('Data restored successfully')
      } catch {
        setStatus('error')
        setMsg('Invalid backup file')
      }
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px] bg-slate-900 rounded-t-2xl border-t border-slate-700 px-5 pt-4 pb-10">
        {/* Handle */}
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-5" />

        <h2 className="text-base font-semibold text-slate-100 mb-1">Backup & Restore</h2>
        <p className="text-xs text-slate-500 mb-6">Export your trip data as JSON or restore from a previous backup.</p>

        <div className="space-y-3">
          {/* Export */}
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 transition-colors rounded-xl px-4 py-3.5"
          >
            <span className="text-xl">📤</span>
            <div className="text-left">
              <div className="text-sm font-medium text-slate-100">Export JSON</div>
              <div className="text-xs text-slate-500">Download a backup of all trip data</div>
            </div>
          </button>

          {/* Import */}
          <button
            onClick={() => fileRef.current.click()}
            className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 transition-colors rounded-xl px-4 py-3.5"
          >
            <span className="text-xl">📥</span>
            <div className="text-left">
              <div className="text-sm font-medium text-slate-100">Import JSON</div>
              <div className="text-xs text-slate-500">Restore from a backup file — overwrites current data</div>
            </div>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Status feedback */}
        {status && (
          <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm
            ${status === 'ok' ? 'bg-emerald-900/40 border border-emerald-700/40 text-emerald-400' : 'bg-red-900/40 border border-red-700/40 text-red-400'}`}>
            <span>{status === 'ok' ? '✓' : '✕'}</span>
            {msg}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          Close
        </button>
      </div>
    </>
  )
}
