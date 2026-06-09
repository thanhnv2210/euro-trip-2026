const KEY = 'euro-trip-2026'

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // localStorage full — fail silently
  }
}

export function clearState() {
  localStorage.removeItem(KEY)
}

export function exportJSON(state) {
  const json = JSON.stringify(state, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `euro-trip-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importJSON(jsonString) {
  const state = JSON.parse(jsonString)
  if (!Array.isArray(state.itinerary) || !Array.isArray(state.events)) {
    throw new Error('Invalid backup file')
  }
  return state
}
