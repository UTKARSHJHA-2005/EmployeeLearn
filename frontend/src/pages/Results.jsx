import { useLocation, useNavigate } from 'react-router-dom'
import SkillDAG from '../components/SkillDAG'
import CourseCard from '../components/CourseCard'

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.result) {
    return (
      <div className="text-center mt-20 text-gray-400">
        No results found. <button onClick={() => navigate('/')} className="text-indigo-400 underline">Go back</button>
      </div>
    )
  }

  const { skill_gap, learning_path, courses, estimated_weeks } = state.result

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Learning Roadmap</h2>
          <p className="text-gray-400 text-sm mt-1">
            Estimated completion: <span className="text-indigo-400 font-semibold">{estimated_weeks} weeks</span>
          </p>
        </div>
        <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white underline">← Start over</button>
      </div>

      {/* Skill Gap Summary */}
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <h3 className="font-semibold text-lg mb-3">Skills to Acquire</h3>
        <div className="flex flex-wrap gap-2">
          {skill_gap.map((skill) => (
            <span key={skill} className="bg-indigo-900/50 border border-indigo-700 text-indigo-300 text-xs px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* DAG */}
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <h3 className="font-semibold text-lg mb-3">Learning Path (DAG)</h3>
        <SkillDAG nodes={learning_path.nodes} edges={learning_path.edges} />
      </div>

      {/* Courses */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Recommended Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}
