import { Star, Users, ExternalLink, Play, GraduationCap, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseCard({ course }) {
  // Pastel color mapping based on platform or id
  const getTheme = (platform, index) => {
    const themes = [
      { bg: "bg-[#fff1f2]", iconBg: "bg-rose-100 text-rose-600", border: "border-rose-200", badge: "text-rose-500", shadow: "shadow-rose-100" },
      { bg: "bg-[#f0f9ff]", iconBg: "bg-sky-100 text-sky-600", border: "border-sky-200", badge: "text-sky-500", shadow: "shadow-sky-100" },
      { bg: "bg-[#f5f3ff]", iconBg: "bg-indigo-100 text-indigo-600", border: "border-indigo-200", badge: "text-indigo-500", shadow: "shadow-indigo-100" },
      { bg: "bg-[#f0fdf4]", iconBg: "bg-emerald-100 text-emerald-600", border: "border-emerald-200", badge: "text-emerald-500", shadow: "shadow-emerald-100" },
      { bg: "bg-[#fffbeb]", iconBg: "bg-amber-100 text-amber-600", border: "border-amber-200", badge: "text-amber-500", shadow: "shadow-amber-100" }
    ];
    
    const p = platform?.toLowerCase() || "";
    if (p.includes("udemy")) return themes[2];
    if (p.includes("coursera")) return themes[1];
    if (p.includes("youtube")) return themes[0];
    if (p.includes("mit")) return themes[3];
    
    return themes[index % themes.length];
  };

  const theme = getTheme(course.platform, Math.floor(Math.random() * 5));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative ${theme.bg} border ${theme.border} rounded-[2rem] p-8 shadow-2xl ${theme.shadow} transition-all duration-500 hover:-translate-y-2 hover:shadow-4xl flex flex-col h-full group overflow-hidden`}
    >
      {/* Platform Category Icon and Rating */}
      <div className="flex justify-between items-start mb-6">
         <div className={`p-3 rounded-2xl ${theme.iconBg} shadow-sm group-hover:scale-110 transition-transform`}>
           <Play className="w-5 h-5 fill-current" />
         </div>
         <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-100 rounded-full shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-black text-slate-900 tracking-tighter">4.9</span>
         </div>
      </div>

      <div className="flex flex-col flex-grow">
         <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.badge} mb-2`}>
           {course.platform || "Educational Track"}
         </span>
         
         <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight leading-[1.15] group-hover:underline underline-offset-4 decoration-current transition-all">
           {course.title}
         </h3>

         <div className="flex items-center gap-4 mt-auto pt-6">
            <div className="flex items-center gap-2">
               <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-400 border-2 border-white"></div>
               </div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  {Math.floor(Math.random() * 5000) + 500} students
               </span>
            </div>
         </div>
      </div>

      <a 
        href={course.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-white border border-slate-100 rounded-2xl shadow-xl hover:bg-slate-900 hover:text-white"
      >
        <ExternalLink className="w-5 h-5" />
      </a>
    </motion.div>
  );
}
