import React, { useState } from 'react';
import {
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  HardHat,
  Headphones,
  Glasses,
  Zap,
  Flame,
  Ban,
  Lock,
  LogOut,
  Cross,
  PieChart as PieIcon,
  TrendingDown,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { SAFETY_SIGNS_DATA } from '../data/safetySignsData';
import { SignCategory } from '../types/ohs';

export const StatisticsAndSignsSection: React.FC = () => {
  const [selectedSignCategory, setSelectedSignCategory] = useState<string>('all');

  // Chart Data 1: Accident Reduction Rate vs Safety Compliance Score
  const accidentReductionData = [
    { compliance: '10% امتثال', accidents: 95, safetyLevel: 'خطر مرتفع جداً' },
    { compliance: '30% امتثال', accidents: 78, safetyLevel: 'خطر مرتفع' },
    { compliance: '50% امتثال', accidents: 52, safetyLevel: 'مقبول جزئياً' },
    { compliance: '75% امتثال', accidents: 24, safetyLevel: 'جيد وآمن' },
    { compliance: '95%+ امتثال', accidents: 4, safetyLevel: 'بيئة آمنة بامتياز' },
  ];

  // Chart Data 2: Hierarchy of Controls Effectiveness %
  const hierarchyData = [
    { method: '1. الإزالة (Elimination)', effectiveness: 100, fill: '#1e3a8a' },
    { method: '2. الاستبدال (Substitution)', effectiveness: 85, fill: '#0284c7' },
    { method: '3. ضوابط هندسية (Engineering)', effectiveness: 70, fill: '#059669' },
    { method: '4. ضوابط إدارية (Administrative)', effectiveness: 50, fill: '#d97706' },
    { method: '5. معدات الوقاية (PPE)', effectiveness: 30, fill: '#dc2626' },
  ];

  const getSignIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat': return HardHat;
      case 'Headphones': return Headphones;
      case 'Glasses': return Glasses;
      case 'Zap': return Zap;
      case 'Flame': return Flame;
      case 'AlertTriangle': return AlertTriangle;
      case 'Ban': return Ban;
      case 'Lock': return Lock;
      case 'LogOut': return LogOut;
      case 'Cross': return Cross;
      default: return ShieldCheck;
    }
  };

  const filteredSigns = SAFETY_SIGNS_DATA.filter((sign) => {
    if (selectedSignCategory === 'all') return true;
    return sign.category === selectedSignCategory;
  });

  return (
    <section id="statistics" className="py-16 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 inline-flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
            <span>المخططات الإحصائية وعلامات السلامة</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cairo']">
            إحصائيات تقليل المخاطر ودليل اللافتات التحذيرية
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            بيانات وتحليلات حية تُبرز الأثر المباشر لتطبيق معايير الصحة والسلامة على خفض الحوادث، إلى جانب المكتبة المعيارية للائحة العلامات واللافتات التحذيرية ISO/OSHA.
          </p>
        </div>

        {/* Part 1: Infographics & Recharts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Chart 1: Accident Reduction vs Compliance */}
          <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-white font-['Cairo']">
                  نسبة انخفاض الحوادث حسب مستوى تطبيق السلامة
                </h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                -95% انخفاض الحوادث
              </span>
            </div>

            <div className="h-64 w-full dir-ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accidentReductionData}>
                  <defs>
                    <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="compliance" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="accidents" name="معدل الحوادث" stroke="#10b981" fillOpacity={1} fill="url(#colorAccidents)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-700/50">
              * تُظهر البيانات انخفاضاً حاداً في إصابات العمل مع الارتفاع في نسبة الالتزام بالقواعد والتقيد بمعدات الوقاية الشخصية.
            </p>
          </div>

          {/* Chart 2: Hierarchy of Controls Effectiveness */}
          <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-cyan-400" />
                <h3 className="font-extrabold text-base text-white font-['Cairo']">
                  فاعلية وسائل التحكم وفق الهرم الترتيبي (Hierarchy)
                </h3>
              </div>
              <span className="text-[11px] text-cyan-300 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                100% الإزالة الأجدى
              </span>
            </div>

            <div className="h-64 w-full dir-ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hierarchyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                  <YAxis type="category" dataKey="method" stroke="#94a3b8" fontSize={10} width={130} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="effectiveness" name="نسبة الفاعلية %" fill="#0284c7" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-700/50">
              * تعد "الإزالة" و"الاستبدال" الحل الهندسي الحقيقي الأجدى للسيطرة التامة على مصادر الأخطار بالموقع قبل الاعتماد على PPE.
            </p>
          </div>

        </div>

        {/* Part 2: Standardized ISO/OSHA Safety Signs Catalog */}
        <div className="pt-8 border-t border-slate-800 space-y-8">
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-extrabold text-white font-['Cairo']">
              المكتبة المعيارية للافتات وعلامات تحذير السلامة (ISO 7010)
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              تصفح العلامات المعتمدة دولياً لوضعها في الأماكن البارزة بالمنشأة لحماية العمال وتنذيرهم.
            </p>
          </div>

          {/* Sign Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedSignCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedSignCategory === 'all'
                  ? 'bg-white text-slate-900 border-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
              }`}
            >
              جميع العلامات
            </button>

            <button
              onClick={() => setSelectedSignCategory('mandatory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedSignCategory === 'mandatory'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
              }`}
            >
              علامات الإلزام (Mandatory)
            </button>

            <button
              onClick={() => setSelectedSignCategory('warning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedSignCategory === 'warning'
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
              }`}
            >
              علامات التحذير (Warning)
            </button>

            <button
              onClick={() => setSelectedSignCategory('prohibition')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedSignCategory === 'prohibition'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
              }`}
            >
              علامات الحظر (Prohibition)
            </button>

            <button
              onClick={() => setSelectedSignCategory('emergency')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedSignCategory === 'emergency'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
              }`}
            >
              علامات الطوارئ (Emergency)
            </button>
          </div>

          {/* Signs Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSigns.map((sign) => {
              const IconComp = getSignIcon(sign.iconName);
              return (
                <div
                  key={sign.id}
                  className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between hover:border-slate-500 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Top ISO Code & Category Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                        {sign.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${sign.colorTheme.badge}`}>
                        {sign.categoryAr}
                      </span>
                    </div>

                    {/* Sign Graphic Visual */}
                    <div className={`w-20 h-20 mx-auto rounded-2xl ${sign.colorTheme.bg} ${sign.colorTheme.text} flex items-center justify-center shadow-lg border-2 ${sign.colorTheme.border} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp className="w-10 h-10" />
                    </div>

                    {/* Sign Title */}
                    <div className="text-center">
                      <h4 className="font-extrabold text-white text-base font-['Cairo']">{sign.titleAr}</h4>
                      <p className="text-[11px] text-slate-400 font-sans dir-ltr mt-0.5">{sign.titleEn}</p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 text-center leading-relaxed">
                      {sign.descriptionAr}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
