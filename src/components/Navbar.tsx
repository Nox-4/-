import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Bot,
  Menu,
  X,
  FileText,
  AlertTriangle,
  FileCheck,
  BarChart3,
  Newspaper,
  PhoneCall
} from 'lucide-react';

interface NavbarProps {
  onOpenAIModal: () => void;
  onOpenSearchModal: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAIModal,
  onOpenSearchModal,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'الرئيسية', icon: ShieldCheck },
    { id: 'hazards', label: 'المخاطر المهنية', icon: AlertTriangle },
    { id: 'guidelines', label: 'إرشادات السلامة', icon: FileCheck },
    { id: 'statistics', label: 'الإحصائيات والعلامات', icon: BarChart3 },
    { id: 'blog', label: 'الأخبار والحالات', icon: Newspaper },
    { id: 'consultation', label: 'طلب استشارة', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      {/* Top Emergency & Compliance Bar */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              منصة وقاية الوطنية للصحة والسلامة المهنية
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              متوافقة مع التشريعات ومعايير OSHA وكودة الحريق 2024
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:911" className="text-amber-400 font-bold hover:underline flex items-center gap-1">
              <span>خط طوارئ السلامة: 911</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenAIModal}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>اسأل المساعد الهندسي الذكي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 p-0.5 shadow-md shadow-blue-900/30">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-white font-['Cairo']">وقاية</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">OSH</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">منصة الصحة والسلامة المهنية</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearchModal}
              className="p-2.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
              title="البحث الشامل في المنصة"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAIModal}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-900/40 flex items-center gap-2 border border-cyan-400/30"
            >
              <Bot className="w-4 h-4 text-cyan-200 animate-pulse" />
              <span>المساعد الذكي</span>
            </button>

            {/* Request Consultation CTA */}
            <button
              onClick={() => handleNavClick('consultation')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/40 flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>طلب استشارة</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearchModal}
              className="p-2 rounded-lg bg-slate-800 text-slate-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-right px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                  isActive ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-emerald-400" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIModal();
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Bot className="w-4 h-4" />
              <span>المساعد الذكي</span>
            </button>

            <button
              onClick={() => handleNavClick('consultation')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>طلب استشارة</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
