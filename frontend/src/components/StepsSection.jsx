import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function StepsSection({ steps }) {
  return (
    <section className="py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28 space-y-4"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">The Implementation</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight italic-none">Three steps to mastery.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-20 relative">
          {/* Connection lines (desktop only) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200/50 -translate-y-1/2 hidden md:block"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500"
            >
              <div className="text-5xl md:text-7xl font-black text-indigo-100/80 absolute top-4 right-8 select-none tracking-tighter transition-colors group-hover:text-indigo-200/90">{step.number}</div>
              <div className="relative z-10 space-y-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">{step.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
