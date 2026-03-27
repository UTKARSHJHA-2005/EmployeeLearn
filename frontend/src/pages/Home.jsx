import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    current_profile: '',
    desired_profile: '',
    hours_per_week: 5,
  })
  const [resumeFile, setResumeFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!resumeFile) { setError('Please upload your resume.'); return }

    setLoading(true)
    try {
      const data = new FormData()
      data.append('resume', resumeFile)
      data.append('current_profile', form.current_profile)
      data.append('desired_profile', form.desired_profile)
      data.append('hours_per_week', form.hours_per_week)

      const res = await axios.post('/api/analyze', data)
      navigate('/results', { state: { result: res.data } })
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Find Your Skill Gap</h1>
      <p className="text-gray-400 mb-8">Upload your resume, tell us where you want to go, and we'll map the path.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Resume Upload */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Resume (PDF or TXT)</label>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
          />
        </div>

        {/* Current Profile */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Current Profile / Role</label>
          <input
            type="text"
            placeholder="e.g. Junior Frontend Developer"
            value={form.current_profile}
            onChange={(e) => setForm({ ...form, current_profile: e.target.value })}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Desired Profile */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Desired Profile / Role</label>
          <input
            type="text"
            placeholder="e.g. Full Stack Engineer"
            value={form.desired_profile}
            onChange={(e) => setForm({ ...form, desired_profile: e.target.value })}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Hours per week */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Hours per week you can invest: <span className="text-indigo-400 font-semibold">{form.hours_per_week}h</span>
          </label>
          <input
            type="range"
            min={1} max={40} step={1}
            value={form.hours_per_week}
            onChange={(e) => setForm({ ...form, hours_per_week: Number(e.target.value) })}
            className="w-full accent-indigo-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>1h</span><span>40h</span></div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-2.5 rounded-lg font-semibold transition"
        >
          {loading ? 'Analyzing...' : 'Analyze My Skills →'}
        </button>
      </form>
    </div>
  )
}
