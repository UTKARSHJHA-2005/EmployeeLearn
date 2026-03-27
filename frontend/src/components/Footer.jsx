import { motion } from "framer-motion";
import { ArrowRight, Compass, Globe, Briefcase, Code } from "lucide-react";

export default function Footer({ onCtaClick }) {
  return (
    <>
      <section className="py-12 sm:py-20 md:py-36 px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] bg-slate-950 p-6 sm:p-12 md:p-32 text-center relative overflow-hidden shadow-2xl shadow-indigo-200"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[160px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 sm:mb-10 tracking-tight leading-none italic-none">Ready for your <br className="hidden md:block" /> next elite role?</h2>
            <p className="text-indigo-200/70 font-bold text-lg leading-relaxed max-w-xl mb-12 italic-none uppercase tracking-widest text-[10px]">
              Join the network of future-ready professionals.
            </p>
            <button
              onClick={onCtaClick}
              className="group px-8 sm:px-12 py-4 sm:py-5 bg-white text-slate-900 font-extrabold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:shadow-2xl hover:shadow-white/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 sm:gap-4"
            >
              Initialize Setup <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      <footer className="py-20 px-6 md:px-8 border-t border-slate-100 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 items-start">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col gap-6 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
                  <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">PathFinder</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 leading-none mt-1">Skill Navigator</span>
                </div>
              </div>
              <p className="text-slate-400 font-medium text-sm leading-relaxed">
                AI-powered career engineering through advanced skill gap analysis and personalized learning path generation.
              </p>
              <div className="flex gap-2.5">
                {[Globe, Briefcase, Code].map((Icon, idx) => (
                  <a key={idx} href="#" className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-100"><Icon className="w-4 h-4" /></a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Product</h4>
              <ul className="flex flex-col gap-4 text-[12px] font-medium text-slate-400">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Skill Mapping</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Graph Visualizer</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Course Aggregator</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">AI Analysis</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Company</h4>
              <ul className="flex flex-col gap-4 text-[12px] font-medium text-slate-400">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Stay Updated</h4>
              <p className="text-[12px] text-slate-400 font-medium leading-relaxed">Get notified about new features and career insights.</p>
              <div className="group relative">
                <input type="email" placeholder="Your email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-indigo-400 focus:bg-white transition-all" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-950 text-white rounded-lg hover:bg-indigo-600 transition-all active:scale-95 shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium">
              © {new Date().getFullYear()} PathFinder. All rights reserved.
            </span>
            <div className="flex items-center gap-6 text-[11px] font-medium text-slate-400">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
