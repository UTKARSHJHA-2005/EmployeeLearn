import { motion } from "framer-motion";

export default function FeaturesSection({ features }) {
  return (
    <section className="py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-12 sm:mb-20 md:mb-32 gap-6 sm:gap-10 text-center lg:text-left">
          <div className="space-y-5">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500 block">Strategic Edge</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none italic-none">Powered by <br /> intelligence.</h2>
          </div>
          <p className="max-w-xl text-base sm:text-lg text-slate-500 font-medium leading-relaxed italic-none">
            Traditional career platforms list jobs. We engineer outcomes. PathFinder uses multi-layer context processing to define your exact learning requirements.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50/50 p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/40 group overflow-hidden relative"
            >
              {/* Background glow hover effect */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>

              <div className={`w-14 md:w-16 h-14 md:h-16 rounded-[1.25rem] md:rounded-2xl flex items-center justify-center mb-8 shadow-sm ${f.color} group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-4 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">{f.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed opacity-80">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
