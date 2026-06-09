import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TripProvider } from './context/TripContext'
import BottomNav from './components/BottomNav'
import ItineraryPage from './pages/ItineraryPage'
import EventsPage from './pages/EventsPage'
import JournalPage from './pages/JournalPage'

export default function App() {
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
        <BottomNav />
      </BrowserRouter>
    </TripProvider>
  )
}
