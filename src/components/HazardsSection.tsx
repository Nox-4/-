import React, { useState } from 'react';
import {
  AlertTriangle,
  Volume2,
  ThermometerSun,
  FlaskConical,
  Zap,
  Cog,
  UserX,
  Biohazard,
  ShieldCheck,
  ChevronLeft,
  Search,
  Filter
} from 'lucide-react';
import { HazardCard, HazardCategory } from '../types/ohs';
import { HAZARDS_DATA } from '../data/hazardsData';
import { HazardDetailModal } from './HazardDetailModal';

interface HazardsSectionProps {
  onConsultAI: (hazardName: string) => void;
}

export const HazardsSection: React.FC<HazardsSectionProps> = ({ onConsultAI }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalHazard, setActiveModalHazard] = useState<HazardCard | null>(null);

  const categories = [
    { id: 'all', label: 'جميع المخاطر', icon: AlertTriangle },
    { id: 'physical', label: 'مخاطر فيزيائية', icon: Volume2 },
    { id: 'chemical', label: 'مخاطر كيميائية', icon: FlaskConical },
    { id: 'electrical', label: 'مخاطر كهربائية', icon: Zap },
    { id: 'mechanical', label: 'مخاطر ميكانيكية', icon: Cog },
    { id: 'ergonomic', label: 'مخاطر إرجونومية', icon: UserX },
    { id: 'biological', label: 'مخاطر بيولوجية', icon: Biohazard },
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Volume2': return Volume2;
      case 'ThermometerSun': return ThermometerSun;
      case 'FlaskConical': return FlaskConical;
      case 'Zap': return Zap;
      case 'Cog': return Cog;
      case 'UserX': return UserX;
      case 'Biohazard': return Biohazard;
      default: return AlertTriangle;
    }
  };

  const filteredHazards = HAZARDS_DATA.filter((hazard) => {
    const matchesCategory = selectedCategory === 'all' || hazard.category === selectedCategory;
    const matchesQuery =
      hazard.nameAr.includes(searchQuery) ||
      hazard.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hazard.shortDescription.includes(searchQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="hazards" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 inline-flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-blue-600" />
            <span>تصنيف مخاطر بيئة العمل الشائعة</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Cairo']">
            دليل التقييم والسيطرة على مخاطر بيئة العمل
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            استكشف التفاصيل الفنية والهندسية لكل خطر مهني، واطلع على إرشادات مهندس الصحة والسلامة المعتمدة للتقليل من آثاره وفق الهرم الترتيبي المعتمد.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="mb-10 space-y-4">
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خطر محدد (مثال: ضوضاء، كهرباء، أحماض، رافعات...)"
              className="w-full pr-11 pl-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/20'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-sm'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Hazard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHazards.map((hazard) => {
            const IconComp = getCategoryIcon(hazard.iconName);

            const severityClass =
              hazard.severity === 'critical'
                ? 'bg-red-100 text-red-800 border-red-200'
                : hazard.severity === 'high'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-blue-100 text-blue-800 border-blue-200';

            return (
              <div
                key={hazard.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                {/* Top Colored Header Stripe */}
                <div className={`h-2 ${hazard.severity === 'critical' ? 'bg-red-600' : hazard.severity === 'high' ? 'bg-amber-500' : 'bg-blue-600'}`}></div>

                <div className="p-6 space-y-4 flex-1">
                  
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      {hazard.categoryNameAr}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${severityClass}`}>
                      {hazard.severity === 'critical' ? 'خطر حرج' : hazard.severity === 'high' ? 'عالي الخطر' : 'متوسط الخطر'}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors font-['Cairo']">
                        {hazard.nameAr}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans dir-ltr">{hazard.nameEn}</p>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {hazard.shortDescription}
                  </p>

                  {/* Risk Reduction Metric Badge */}
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>تطبيق الإرشادات:</span>
                    </span>
                    <span className="text-emerald-700 font-extrabold">{hazard.riskReductionStat}</span>
                  </div>

                  {/* Required PPE badges */}
                  <div className="pt-1">
                    <span className="text-[11px] text-slate-400 font-semibold block mb-1.5">معدات الوقاية المطلوبة:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {hazard.requiredPPE.map((ppe, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          {ppe.name}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => setActiveModalHazard(hazard)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    <span>عرض إرشادات المهندس وتفاصيل السيطرة</span>
                    <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {filteredHazards.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">لم يتم العثور على مخاطر تطابق البحث</h3>
            <p className="text-xs text-slate-500 mt-1">جرب البحث بكلمات أخرى أو اختر تصنيفاً آخر من القائمة.</p>
          </div>
        )}

      </div>

      {/* Hazard Detailed Modal */}
      <HazardDetailModal
        hazard={activeModalHazard}
        onClose={() => setActiveModalHazard(null)}
        onConsultAI={onConsultAI}
      />
    </section>
  );
};
