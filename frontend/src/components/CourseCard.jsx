export default function CourseCard({ course }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-2 hover:border-indigo-600 transition">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-sm leading-snug">{course.title}</h4>
        {course.level && (
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full shrink-0">{course.level}</span>
        )}
      </div>
      <p className="text-xs text-gray-400">{course.platform}</p>
      <div className="flex flex-wrap gap-1 mt-1">
        {course.skills?.map((s) => (
          <span key={s} className="text-xs bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded-full">{s}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs text-gray-500">{course.duration_hours}h</span>
        {course.url && (
          <a href={course.url} target="_blank" rel="noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 underline">
            View Course →
          </a>
        )}
      </div>
    </div>
  )
}
