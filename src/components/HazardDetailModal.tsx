import React from 'react';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  HardHat,
  Bot,
  Zap,
  Volume2,
  ThermometerSun,
  FlaskConical,
  Cog,
  UserX,
  Biohazard,
  Headphones,
  Shield,
  Hand,
  Glasses,
  Footprints,
  UserCheck,
  Activity,
  Shirt,
  ShieldAlert
} from 'lucide-react';
import { HazardCard } from '../types/ohs';

interface HazardDetailModalProps {
  hazard: HazardCard | null;
  onClose: () => void;
  onConsultAI: (hazardName: string) => void;
}

export const HazardDetailModal: React.FC<HazardDetailModalProps> = ({
  hazard,
  onClose,
  onConsultAI,
}) => {
  if (!hazard) return null;

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

  const getPPEIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones': return Headphones;
      case 'Shield': return Shield;
      case 'Hand': return Hand;
      case 'Glasses': return Glasses;
      case 'Footprints': return Footprints;
      case 'UserCheck': return UserCheck;
      case 'Activity': return Activity;
      case 'Shirt': return Shirt;
      case 'ShieldAlert': return ShieldAlert;
      default: return HardHat;
    }
  };

  const CategoryIcon = getCategoryIcon(hazard.iconName);

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-700 border border-red-200 font-bold text-xs flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> خطر حرج مهدد للحياة</span>;
      case 'high':
        return <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200 font-bold text-xs flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> عالي الخطر</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-800 border border-blue-200 font-bold text-xs flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> متوسط الخطر</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-8 text-right">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-emerald-400">
                <CategoryIcon className="w-7 h-7" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {hazard.categoryNameAr}
                </span>
                {getSeverityBadge(hazard.severity)}
              </div>
              <h2 className="text-2xl font-black text-white font-['Cairo']">{hazard.nameAr}</h2>
              <p className="text-xs text-slate-400 font-sans dir-ltr">{hazard.nameEn}</p>
            </div>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2 border-r-4 border-blue-600 pr-3">
              شرح وتوصيف الخطر المهني
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {hazard.fullDescription}
            </p>
          </div>

          {/* Potential Impacts */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-r-4 border-red-600 pr-3">
              الأضرار والآثار الصحية المحتملة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {hazard.potentialImpact.map((impact, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-red-50/60 p-3 rounded-xl border border-red-100 text-xs text-red-900">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* OSH Engineer Guidelines */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-r-4 border-emerald-600 pr-3">
              إرشادات مهندس الصحة والسلامة لتقليل الخطر
            </h3>
            <div className="space-y-2.5">
              {hazard.oshEngineerGuidelines.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 text-xs text-slate-800">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hierarchy of Controls Section */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              الهرم الترتيبي المعتمد للتحكم بالمخاطر (Hierarchy of Controls)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
              
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                <span className="font-extrabold text-blue-900 block mb-1">1. الإزالة (Elimination)</span>
                <p className="text-slate-700 text-[11px] leading-snug">{hazard.hierarchyOfControls.elimination}</p>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <span className="font-extrabold text-emerald-900 block mb-1">2. الاستبدال (Substitution)</span>
                <p className="text-slate-700 text-[11px] leading-snug">{hazard.hierarchyOfControls.substitution}</p>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <span className="font-extrabold text-amber-900 block mb-1">3. الضوابط الهندسية</span>
                <p className="text-slate-700 text-[11px] leading-snug">{hazard.hierarchyOfControls.engineering}</p>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                <span className="font-extrabold text-purple-900 block mb-1">4. الضوابط الإدارية</span>
                <p className="text-slate-700 text-[11px] leading-snug">{hazard.hierarchyOfControls.administrative}</p>
              </div>

              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
                <span className="font-extrabold text-rose-900 block mb-1">5. معدات الوقاية (PPE)</span>
                <p className="text-slate-700 text-[11px] leading-snug">{hazard.hierarchyOfControls.ppe}</p>
              </div>

            </div>
          </div>

          {/* Required PPE Items */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-r-4 border-slate-700 pr-3">
              معدات الوقاية الشخصية الإلزامية بالموقع (PPE)
            </h3>
            <div className="flex flex-wrap gap-3">
              {hazard.requiredPPE.map((ppe, idx) => {
                const IconComp = getPPEIcon(ppe.icon);
                return (
                  <div key={idx} className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800">
                    <IconComp className="w-4 h-4 text-blue-600" />
                    <span>{ppe.name}</span>
                    {ppe.mandatory && <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">إجباري</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regulatory Reference Footer */}
          <div className="bg-slate-900 text-slate-300 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs border border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>المرجع التشريعي: <strong className="text-white">{hazard.regulatoryReference}</strong></span>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{hazard.riskReductionStat}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onConsultAI(hazard.nameAr);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-cyan-200" />
            <span>استشارة المساعد الذكي حول هذا الخطر</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
