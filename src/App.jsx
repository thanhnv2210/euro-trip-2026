import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TripProvider } from './context/TripContext'
import BottomNav from './components/BottomNav'
import BackupSheet from './components/BackupSheet'
import ItineraryPage from './pages/ItineraryPage'
import EventsPage from './pages/EventsPage'
import JournalPage from './pages/JournalPage'

export default function App() {
  const [showBackup, setShowBackup] = useState(false)

  return (
    <TripProvider>
      <BrowserRouter>
        <div className="flex flex-col flex-1 pb-16">
          <Routes>
            <Route path="/" element={<Navigate to="/itinerary" replace />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/journal" element={<JournalPage />} />
          </Routes>
        </div>
        <BottomNav onBackup={() => setShowBackup(true)} />
        {showBackup && <BackupSheet onClose={() => setShowBackup(false)} />}
      </BrowserRouter>
    </TripProvider>
  )
}
