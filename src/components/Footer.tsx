import React from 'react';
import {
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  Bot,
  Heart,
  HardHat
} from 'lucide-react';

interface FooterProps {
  onOpenAIModal: () => void;
  setActiveSection: (sec: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAIModal, setActiveSection }) => {
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-right">
      
      {/* Top Emergency Action Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-950 px-4 py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg">
              <HardHat className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-white font-['Cairo']">
                هل تحتاج إلى معاينة ميدانية أو استجابة لتقييم خطورة طارئ؟
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                تواصل فوراً مع كادر المهندسين الاستشاريين للحصول على دعم هندسي مباشر بالموقع.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:911"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-2 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>طوارئ الدفاع المدني: 911</span>
            </a>

            <button
              onClick={onOpenAIModal}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>المساعد الذكي AI</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white font-['Cairo']">وقاية</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              المنصة الوطنية للسلامة والصحة المهنية (Wiqaya OSH Platform). تهدف لرفع مستوى التوعية وحماية العاملين بالمنشآت الصناعية والإدارية والإنشائية، وتوفير الأدوات والتقارير الفنية المعتمدة.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> المرجع الوطني للصحة والسلامة المهنية
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> info@wiqaya-osh.org
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm font-['Cairo'] border-b border-slate-800 pb-2">
              أقسام المنصة الرئيسية
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('hazards')} className="hover:text-emerald-400 transition-colors">
                  • تصنيف المخاطر المهنية (الـ 6 أصناف)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('guidelines')} className="hover:text-emerald-400 transition-colors">
                  • أدلة السلامة وقوائم الفحص التفاعلية (PDF)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('statistics')} className="hover:text-emerald-400 transition-colors">
                  • إحصائيات تقليل المخاطر ولافتات ISO
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('blog')} className="hover:text-emerald-400 transition-colors">
                  • التحديثات التشريعية والحالات الدراسية
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('consultation')} className="hover:text-emerald-400 transition-colors">
                  • نموذج طلب الاستشارة والمعاينة الميدانية
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory Standards */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm font-['Cairo'] border-b border-slate-800 pb-2">
              الكودات واللوائح المعتمدة
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• قانون العمل والأنظمة الصادرة بموجبه (المادة 78 و85)</li>
              <li>• كودة الوقاية من الحريق وتجهيزات الإطفاء 2024</li>
              <li>• قرار وسائل وأجهزة الإسعاف الطبي للعمال 2024</li>
              <li>• تعليمات الفحص الطبي الأولي والدوري للعمال 2025</li>
              <li>• معايير الإشراف وإدارة اللجان رقم 33 لسنة 2023</li>
            </ul>
          </div>

          {/* Badge / Quality Seal */}
          <div className="lg:col-span-2 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-bold text-white text-xs block font-['Cairo']">شعار جودة الامتثال</span>
              <p className="text-[10px] text-slate-400 leading-tight">
                اعتماد وتحديث مستمر لكل معايير السلامة المهنية.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} منصة وقاية للصحة والسلامة المهنية | جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-slate-300">الشروط والأحكام</a>
            <span>•</span>
            <a href="#hero" className="hover:text-slate-300">سياسة الخصوصية</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
