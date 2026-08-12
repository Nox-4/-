import React from 'react';
import {
  ShieldCheck,
  HardHat,
  Glasses,
  Hand,
  Bot,
  ArrowLeft,
  FileCheck,
  CheckCircle2,
  TrendingDown,
  Award,
  Users
} from 'lucide-react';

interface HeroProps {
  onExploreHazards: () => void;
  onExploreGuidelines: () => void;
  onOpenAIModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreHazards,
  onExploreGuidelines,
  onOpenAIModal,
}) => {
  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Radial Blue/Green Lighting Accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left/Right Text Content (Arabic RTL) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* National Compliance Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-emerald-400 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>المرجع الوطني المعتمد لإرشادات الصحة والسلامة المهنية (OSH)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white leading-tight font-['Cairo']">
              بيئة عمل <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300">آمنة ومحمية</span> وفق أعلى المعايير العالمية
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              منصة متكاملة تُمكن المنشآت والمؤسسات والمهندسين من التقييم الشامل للمخاطر المهنية (الفيزيائية، الكيميائية، الكهربائية، الميكانيكية، الإرجونومية، والبيولوجية)، مع توفير إرشادات هندسية دقيقة، وقوائم فحص تفاعلية، واستشارات فورية.
            </p>

            {/* PPE Standard Requirement Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300">
              <span className="text-slate-400 font-semibold ml-1">المعدات الإلزامية بالموقع:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 flex items-center gap-1.5 text-blue-300">
                <HardHat className="w-3.5 h-3.5 text-amber-400" /> خوذة حماية
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 flex items-center gap-1.5 text-emerald-300">
                <Glasses className="w-3.5 h-3.5 text-cyan-400" /> نظارات أمان
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 flex items-center gap-1.5 text-indigo-300">
                <Hand className="w-3.5 h-3.5 text-indigo-400" /> قفازات مقاوِمة
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExploreHazards}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group"
              >
                <span>استكشف المخاطر المهنية</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreGuidelines}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>قوائم الفحص وPDF</span>
              </button>

              <button
                onClick={onOpenAIModal}
                className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-900/30 transition-all flex items-center gap-2 border border-emerald-400/30"
              >
                <Bot className="w-4 h-4 text-emerald-200" />
                <span>استشارة ذكية فورية</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>مطابق لكودات الدفاع المدني 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>دليل الفحص الطبي والمهني</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تخفيض الحوادث حتى 90%</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Visual Image Frame */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
                alt="عمال سلامة وصحة مهنية مع خوذات وقفازات حماية"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80';
                }}
                className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>

              {/* Top Warning Stripe */}
              <div className="absolute top-0 inset-x-0 h-1.5 safety-stripe"></div>

              {/* Overlay Badge 1: PPE Verification */}
              <div className="absolute top-4 right-4 glass-panel dark-glass rounded-xl p-3 shadow-lg max-w-[200px] border border-emerald-500/40">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>تجهيزات سلامة معتمدة</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-tight">
                  خوذات مقاومة للصدمات، قفازات حرارية، ونظارات حماية جانبية.
                </p>
              </div>

              {/* Overlay Badge 2: Live Statistics Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-slate-700/80 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <TrendingDown className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-2xl font-black text-white font-['Cairo']">78%-</span>
                      <p className="text-[11px] text-slate-300 font-medium">انخفاض معدل إصابات العمل</p>
                    </div>
                  </div>

                  <div className="text-left border-r border-slate-800 pr-4">
                    <span className="text-xl font-bold text-blue-400 font-['Cairo']">99.4%</span>
                    <p className="text-[10px] text-slate-400">نسبة الامتثال</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating PPE Icons */}
            <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl border-2 border-slate-900 z-20">
              <HardHat className="w-9 h-9" />
            </div>

          </div>

        </div>

        {/* Bottom Key Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800">
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-white font-['Cairo']">6 أصناف</span>
            <p className="text-xs text-slate-400 mt-0.5">للمخاطر الشائعة بالكامل</p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-white font-['Cairo']">100%</span>
            <p className="text-xs text-slate-400 mt-0.5">مطابقة للأنظمة الرسمية</p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-white font-['Cairo']">1,200+</span>
            <p className="text-xs text-slate-400 mt-0.5">منشأة وموقع بِنَاء</p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-white font-['Cairo']">24/7</span>
            <p className="text-xs text-slate-400 mt-0.5">مساعد هندسي ذكي</p>
          </div>
        </div>

      </div>
    </section>
  );
};
