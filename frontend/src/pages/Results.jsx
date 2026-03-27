import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, Clock, BookOpen, ChevronLeft, ChevronRight, Map, Layout, Zap, Info, 
  Share2, Printer, TrendingUp, GraduationCap, Globe, Briefcase, Code, 
  ArrowRight, Sparkles, Cpu, Bell, Settings, Home as HomeIcon, Calendar, 
  Search, Users, Star, Layers, Package, Sliders, Compass
} from "lucide-react";
import SkillDAG from "../components/SkillDAG";
import CourseCard from "../components/CourseCard";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3.5rem] shadow-4xl shadow-slate-200 border border-slate-100 flex flex-col items-center gap-8 max-w-lg text-center"
        >
          <div className="p-5 bg-rose-50 rounded-3xl text-rose-500 border border-rose-100 shadow-sm"><Info className="w-12 h-12" /></div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-none">Session Expired</h2>
          <p className="text-slate-500 font-bold leading-relaxed">Let's re-analyze your profile to generate your custom path.</p>
          <button 
            onClick={() => navigate("/")} 
            className="w-full bg-slate-950 text-white rounded-3xl py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-100 italic-none active:scale-95 flex items-center justify-center gap-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Restart Genesis
          </button>
        </motion.div>
      </div>
    );
  }

   const sidebarItems = [
     { icon: HomeIcon, label: "Dashboard", color: "bg-slate-900 text-white shadow-md" },
     { icon: Calendar, label: "Schedule", color: "bg-white text-slate-400 hover:text-slate-950 hover:bg-slate-50" },
     { icon: BookOpen, label: "Courses", color: "bg-white text-slate-400 hover:text-slate-950 hover:bg-slate-50" },
     { icon: GraduationCap, label: "Progress", color: "bg-white text-slate-400 hover:text-slate-950 hover:bg-slate-50" },
     { icon: Layers, label: "Resources", color: "bg-white text-slate-400 hover:text-slate-950 hover:bg-slate-50" }
   ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] selection:bg-indigo-100 overflow-hidden flex font-sans">
      
      {/* CONSOLIDATED LEFT SIDEBAR */}
      <aside className={`hidden lg:flex flex-col ${isSidebarCollapsed ? "w-[80px]" : "w-[280px]"} bg-white border-r border-slate-100/60 transition-all duration-300 ease-in-out sticky top-0 h-screen z-50`}>
         <div className="flex flex-col h-full overflow-y-auto scrollbar-hide p-5">
            
            {/* Top Section - Brand & User */}
            <div className="flex flex-col gap-8 mb-8">
               <div className="flex items-center gap-3 w-full cursor-pointer group" onClick={() => navigate("/")}>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 shrink-0">
                     <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  {!isSidebarCollapsed && (
                     <div className="flex flex-col">
                        <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">PathFinder</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 leading-none mt-1">Skill Navigator</span>
                     </div>
                  )}
               </div>

               {/* Profile Snippet */}
               {isSidebarCollapsed ? (
                  <div className="flex justify-center">
                     <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-100 to-violet-100 p-0.5 shadow-sm">
                        <div className="w-full h-full rounded-[9px] bg-white p-0.5">
                           <img src="https://ui-avatars.com/api/?name=AC&background=eef2ff&color=4f46e5&bold=true&size=64" alt="Profile" className="w-full h-full object-cover rounded-lg" />
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="flex items-center gap-3 bg-slate-50/80 px-4 py-3 rounded-2xl border border-slate-100/50">
                     <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-100 to-violet-100 p-0.5 shadow-sm shrink-0">
                        <div className="w-full h-full rounded-[9px] bg-white p-0.5">
                           <img src="https://ui-avatars.com/api/?name=Alex+Chen&background=fff&color=4f46e5&bold=true&size=64" alt="Profile" className="w-full h-full object-cover rounded-lg" />
                        </div>
                     </div>
                     <div className="flex flex-col min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 truncate leading-none">Alex Chen</h3>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mt-1">Advanced</span>
                     </div>
                  </div>
               )}
            </div>
            
            {/* Navigation Menu */}
            <div className="flex flex-col gap-1.5 mb-8 flex-1">
               <span className={`text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-3 ${isSidebarCollapsed ? "hidden" : "block"}`}>Menu</span>
               {sidebarItems.map((item, i) => (
                  <button key={i} className={`w-full h-11 rounded-xl flex items-center ${isSidebarCollapsed ? "justify-center" : "px-3 gap-3"} transition-all duration-200 ${item.color} group`}>
                     <item.icon className="w-[18px] h-[18px] shrink-0" />
                     {!isSidebarCollapsed && <span className="text-[11px] font-bold tracking-wide truncate">{item.label}</span>}
                  </button>
               ))}
            </div>

               {/* Dashboard Activity (Only if not collapsed) */}
               <AnimatePresence>
                  {!isSidebarCollapsed && (
                     <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-3 mb-6 pt-5 border-t border-slate-100/60 overflow-hidden"
                     >
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Activity</span>
                        <div className="bg-slate-50/60 border border-slate-100/40 p-4 rounded-2xl flex flex-col gap-3">
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-800">3.5h this week</span>
                              <div className="px-2 py-0.5 bg-amber-50 rounded-md text-[8px] font-bold text-amber-600 border border-amber-100">🔥 STREAK</div>
                           </div>
                           <div className="flex items-end gap-1 h-8 px-0.5">
                              {[35, 65, 45, 75, 55, 85, 30].map((h, i) => (
                                 <div key={i} className={`flex-1 rounded-sm transition-all ${i === 5 ? 'bg-indigo-500' : 'bg-indigo-100'}`} style={{ height: `${h}%` }}></div>
                              ))}
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>

               {/* Bottom Section - Collapse & Settings */}
               <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-slate-100/40">
                  <button className={`w-full h-10 bg-slate-50/80 border border-slate-100/50 rounded-xl flex items-center ${isSidebarCollapsed ? "justify-center" : "px-3 gap-3"} text-slate-400 hover:text-indigo-600 transition-all hover:bg-white`}>
                     <Settings className="w-4 h-4 shrink-0" />
                     {!isSidebarCollapsed && <span className="text-[11px] font-bold tracking-wide">Settings</span>}
                  </button>
                  <button 
                     onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                     className={`w-full h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${isSidebarCollapsed ? 'bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600' : 'bg-indigo-600 text-white shadow-md shadow-indigo-100 hover:bg-indigo-700'}`}
                  >
                     {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </button>
               </div>
            </div>
         </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto w-full">
         <div className="max-w-7xl mx-auto p-6 md:p-12 lg:p-16">
            
            {/* Header Section */}
            <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
               <div className="text-center md:text-left">
                  <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter italic-none mb-3">Invest in your <br /> education</h1>
                  <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-2 justify-center md:justify-start">
                    <Sparkles className="w-4 h-4 text-indigo-500" /> AI ROADMAP FOR {result.desired_profile || 'YOUR ROLE'}
                  </p>
               </div>
               
               {/* Skill Gap Filter Tabs */}
               <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                  <div className="flex p-1 bg-slate-100/50 rounded-xl border border-slate-100 shadow-inner">
                     {[
                        { key: 'all', label: 'All Skills' },
                        { key: 'core', label: 'Core' },
                        { key: 'advanced', label: 'Advanced' },
                     ].map(tab => (
                        <button 
                           key={tab.key}
                           onClick={() => setActiveTab(tab.key)}
                           className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                              activeTab === tab.key 
                                 ? 'bg-slate-950 text-white shadow-md' 
                                 : 'text-slate-400 hover:text-slate-700'
                           }`}
                        >
                           {tab.label}
                        </button>
                     ))}
                  </div>
                  <div className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold border border-indigo-100 whitespace-nowrap">
                     {result.skill_gap?.length || 0} gaps found
                  </div>
               </div>
            </header>

            {/* Visual Learning Graph (SkillDAG) */}
            <section className="mb-20 bg-white p-8 md:p-12 rounded-[4rem] border border-slate-50 shadow-4xl shadow-indigo-100/40 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
               <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-3">
                  {[Globe, Briefcase, Code].map((Icon, idx) => (
                    <a key={idx} href="#" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm shadow-slate-100"><Icon className="w-5 h-5" /></a>
                  ))}
               </div>
               <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-none italic-none">Gap Intelligence Graph</h2>
                  <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-slate-900 text-[9px] font-black rounded-2xl text-white uppercase tracking-widest shadow-2xl">
                    <Zap className="w-4 h-4 fill-indigo-400 text-indigo-400" /> Optimal Sequence Verified
                  </div>
               </div>
               <div className="h-[450px] md:h-[550px] w-full bg-slate-50/10 rounded-[3rem] border border-slate-50/60 shadow-inner">
                  <SkillDAG learningPath={result.learning_path} />
               </div>
            </section>

            {/* Recommendations Grid - Inspiration Format */}
            <section className="mb-20">
               <div className="flex items-end justify-between mb-10">
                  <h2 className="text-3xl font-black text-slate-950 tracking-tighter leading-none italic-none">Curated Tracks</h2>
                  <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline italic-none">See All Modules</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {result.courses?.map((course) => (
                    <CourseCard key={course.id || course.url} course={course} />
                  ))}
               </div>
            </section>
         </div>
      </main>
    </div>
  );
}
