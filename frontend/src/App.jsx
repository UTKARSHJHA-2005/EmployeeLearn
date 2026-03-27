import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}
