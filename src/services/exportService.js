// Milestone 2 — export to Markdown
export function exportToMarkdown(state) {
  const lines = ['# Euro Trip 2026\n']

  lines.push('## Itinerary\n')
  for (const day of state.itinerary) {
    lines.push(`### ${day.date} — ${day.city}`)
    if (day.notes) lines.push(day.notes)
    for (const act of day.activities) {
      lines.push(`- ${act.time ? act.time + ' ' : ''}${act.title}`)
    }
    lines.push('')
  }

  lines.push('## Bookings\n')
  for (const evt of state.events) {
    lines.push(`- **${evt.title}** (${evt.date}${evt.time ? ' ' + evt.time : ''}) [${evt.status}]`)
    if (evt.bookingRef) lines.push(`  Ref: ${evt.bookingRef}`)
    if (evt.location) lines.push(`  📍 ${evt.location}`)
  }

  return lines.join('\n')
}
