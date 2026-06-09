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
