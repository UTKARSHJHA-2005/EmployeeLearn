import { Compass, Menu, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] border-b border-slate-200 px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between bg-white/70 backdrop-blur-xl">
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => (window.location.href = "/")}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
          <Compass className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-none">
            PathFinder
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-600 ml-0.5 mt-1 leading-none italic-none">
            Skill Navigator
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 font-bold text-slate-500 text-xs uppercase tracking-widest">
        <a href="#" className="hover:text-indigo-600 transition-colors italic-none">Career Pathways</a>
        <a href="#" className="hover:text-indigo-600 transition-colors italic-none">Learning Tracks</a>
        <a href="#" className="hover:text-indigo-600 transition-colors italic-none">Resources</a>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden lg:flex items-center bg-slate-100/80 rounded-2xl px-4 py-2 border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search paths..." className="bg-transparent border-none outline-none px-3 py-1 text-xs font-bold text-slate-900 placeholder:text-slate-400 w-40 flex-1 ml-1" />
        </div>
        <button className="lg:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-indigo-600 transition-all shadow-sm">
          <Search className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-100 transition-all italic-none">
          <User className="w-4 h-4" />
          <span className="hidden xs:inline">Sign In</span>
        </button>
      </div>
    </nav>
  );
}
