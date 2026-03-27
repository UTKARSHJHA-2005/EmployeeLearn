import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileUp,
  Target,
  Briefcase,
  ChevronRight,
  Check,
  Sparkles,
  Cpu,
  ZapIcon,
  Globe,
  BarChart,
} from "lucide-react";

import Navbar from "../components/Navbar";
import StepsSection from "../components/StepsSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import Grainient from "../components/Grainient";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    current_profile: "",
    desired_profile: "",
    hours_per_week: 10,
  });
  const [resumeFile, setResumeFile] = useState(null);

  // Parallax Setup
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const onFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type === "text/plain")
    ) {
      setResumeFile(file);
      setError("");
    } else {
      setError("Please upload a valid PDF or TXT file.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!resumeFile) {
      setError("Resume upload is required for skill analysis.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("resume", resumeFile);
      data.append("current_profile", form.current_profile);
      data.append("desired_profile", form.desired_profile);
      data.append("hours_per_week", form.hours_per_week);

      const res = await axios.post("http://localhost:8000/api/analyze", data);
      navigate("/results", { state: { result: res.data } });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Connection failed. Please verify the backend service is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] selection:bg-indigo-100 overflow-x-hidden relative">
      {/* Professional Grainient Background */}
      <div className="absolute top-0 left-0 w-full h-[1200px] overflow-hidden -z-10 bg-white">
        <Grainient
          color1="#fb9265"
          color2="#f8fdba"
          color3="#fb8383"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[10px]"></div>
      </div>

      {/* Dynamic Background SVG Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Parallax circles */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-[10%] -left-[5%] w-[45%] h-[45%] bg-indigo-50/50 rounded-full blur-[140px]"
        ></motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-violet-50/50 rounded-full blur-[120px]"
        ></motion.div>

        {/* Static geometric elements */}
        <svg
          className="absolute top-[10%] left-[5%] opacity-[0.05]"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            className="text-indigo-600"
          />
          <path
            d="M10 50L50 90L90 50L50 10L10 50Z"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-400"
          />
        </svg>
        <svg
          className="absolute bottom-[20%] right-[10%] opacity-[0.05]"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            rx="12"
            stroke="currentColor"
            strokeWidth="6"
            className="text-violet-600"
            rotate="15"
          />
          <circle
            cx="40"
            cy="40"
            r="20"
            fill="currentColor"
            className="text-slate-200"
          />
        </svg>
      </div>

      {/* Hero Section - Fully Responsive */}
      <section className="relative pt-8 sm:pt-12 md:pt-28 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-20 items-center">
          {/* Hero Content Column (Desktop: 7 col, Mobile: 12 col) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm w-fit mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic-none leading-none">
                AI Driven Career Mapping
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter italic-none">
              Accelerate your <br className="hidden md:block" />
              <span className="text-indigo-600">career shift.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Stop guessing your next step. PathFinder maps your career
              trajectory with data-driven skill gap visualization and expert
              curation.
            </p>

            <div className="grid grid-cols-2 sm:flex items-center gap-3 sm:gap-6 md:gap-10 mt-4 mx-auto lg:mx-0 justify-center lg:justify-start">
              {[
                {
                  label: "Parsing",
                  icon: <Check className="w-4 h-4 text-emerald-500" />,
                },
                {
                  label: "Mapping",
                  icon: <Check className="w-4 h-4 text-emerald-500" />,
                },
                {
                  label: "Curation",
                  icon: <Check className="w-4 h-4 text-emerald-500" />,
                },
                {
                  label: "Insights",
                  icon: <Check className="w-4 h-4 text-emerald-500" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest whitespace-nowrap"
                >
                  {item.icon} {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card Column (Desktop: 5 col, Mobile: 12 col) */}
          <motion.div
            id="start-journey"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-white rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] p-5 sm:p-6 md:p-12 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.12)] border border-slate-100 relative group"
          >
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                  Resume Upload
                </label>
                <div
                  className={`relative flex flex-col items-center justify-center p-8 md:p-10 border-2 border-dashed rounded-[2rem] transition-all duration-500 ${resumeFile ? "bg-indigo-50/30 border-indigo-400 shadow-inner" : "border-slate-100 hover:border-indigo-400 bg-slate-50/40 hover:bg-white"}`}
                >
                  <input
                    type="file"
                    onChange={onFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`w-14 md:w-16 h-14 md:h-16 rounded-[1.25rem] md:rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${resumeFile ? "bg-indigo-600 text-white shadow-xl scale-110" : "bg-white text-slate-300 shadow-sm group-hover:bg-slate-50 group-hover:text-indigo-400"}`}
                  >
                    <FileUp className="w-7 h-7" />
                  </div>
                  <span
                    className={`text-sm font-bold text-center px-4 ${resumeFile ? "text-indigo-700" : "text-slate-900 opacity-60"}`}
                  >
                    {resumeFile
                      ? resumeFile.name
                      : "Drop PDF or Click to browse"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:gap-6">
                <div className="relative group/input">
                  <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within/input:text-indigo-500" />
                  <select
                    value={form.current_profile}
                    onChange={(e) =>
                      setForm({ ...form, current_profile: e.target.value })
                    }
                    required
                    className="w-full pl-14 pr-6 py-4 md:py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Current Profile
                    </option>
                    <option value="software engineer">Software Engineer</option>
                    <option value="frontend developer">
                      Frontend Developer
                    </option>
                    <option value="backend developer">Backend Developer</option>
                    <option value="full stack engineer">
                      Full Stack Engineer
                    </option>
                    <option value="data scientist">Data Scientist</option>
                    <option value="ml engineer">ML Engineer</option>
                    <option value="devops engineer">DevOps Engineer</option>
                  </select>
                </div>
                <div className="relative group/input">
                  <Target className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within/input:text-indigo-500" />
                  <select
                    value={form.desired_profile}
                    onChange={(e) =>
                      setForm({ ...form, desired_profile: e.target.value })
                    }
                    required
                    className="w-full pl-14 pr-6 py-4 md:py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Target Role
                    </option>
                    <option value="software engineer">Software Engineer</option>
                    <option value="frontend developer">
                      Frontend Developer
                    </option>
                    <option value="backend developer">Backend Developer</option>
                    <option value="full stack engineer">
                      Full Stack Engineer
                    </option>
                    <option value="data scientist">Data Scientist</option>
                    <option value="ml engineer">ML Engineer</option>
                    <option value="devops engineer">DevOps Engineer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Learning Load
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                    <span className="text-indigo-600 text-lg font-black">
                      {form.hours_per_week}
                    </span>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-tight">
                      hr / week
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={form.hours_per_week}
                  onChange={(e) =>
                    setForm({ ...form, hours_per_week: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full h-16 md:h-20 rounded-2xl md:rounded-[1.75rem] bg-slate-950 text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs flex items-center justify-center gap-4 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition-all duration-300 disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>{" "}
                    Orchestrating Analysis...
                  </div>
                ) : (
                  <>
                    Get Learning Path{" "}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>

              {error && (
                <div className="flex items-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest justify-center animate-bounce">
                  {" "}
                  {error}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
