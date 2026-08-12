import React, { useState } from 'react';
import {
  FileCheck,
  Download,
  CheckSquare,
  ListOrdered,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  HardHat,
  ShieldAlert,
  Building2,
  Zap,
  HeartPulse,
  Printer,
  Sparkles,
  Loader2
} from 'lucide-react';
import { SAFETY_PDFS_DATA, INTERACTIVE_CHECKLISTS, PRACTICAL_STEP_GUIDES } from '../data/guidelinesData';
import { generateSafetyCodePDF, generateChecklistReportPDF } from '../utils/pdfGenerator';
import { ChecklistGroup, PracticalGuide } from '../types/ohs';

export const GuidelinesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pdfs' | 'checklists' | 'steps'>('pdfs');
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  
  // Interactive Checklist State
  const [selectedChecklist, setSelectedChecklist] = useState<ChecklistGroup>(INTERACTIVE_CHECKLISTS[0]);
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({});

  // Active Step Guide State
  const [activeGuide, setActiveGuide] = useState<PracticalGuide>(PRACTICAL_STEP_GUIDES[0]);

  const handleDownloadSafetyPdf = async (pdf: typeof SAFETY_PDFS_DATA[0]) => {
    setGeneratingId(pdf.id);
    try {
      await generateSafetyCodePDF(pdf.titleAr, pdf.category, pdf.keyTopics, pdf.codeRef);
    } finally {
      setGeneratingId(null);
    }
  };

  const handleDownloadChecklistPdf = async () => {
    setGeneratingId('checklist_report');
    try {
      const itemsReport = selectedChecklist.items.map((i) => ({
        questionAr: i.questionAr,
        isCompliant: checkedState[i.id] || false,
      }));
      await generateChecklistReportPDF(
        selectedChecklist.titleAr,
        scorePercentage,
        compliantCount,
        totalItems,
        itemsReport
      );
    } finally {
      setGeneratingId(null);
    }
  };

  const handleCheckboxToggle = (itemId: string) => {
    setCheckedState((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Calculate Checklist Progress
  const totalItems = selectedChecklist.items.length;
  const compliantCount = selectedChecklist.items.filter((item) => checkedState[item.id] === true).length;
  const scorePercentage = totalItems > 0 ? Math.round((compliantCount / totalItems) * 100) : 0;

  const getChecklistIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return Building2;
      case 'Zap': return Zap;
      case 'HeartPulse': return HeartPulse;
      default: return CheckSquare;
    }
  };

  return (
    <section id="guidelines" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 inline-flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>قسم إرشادات السلامة التفاعلي</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Cairo']">
            الأدلة الإرشادية وقوائم الفحص التفتيشية
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            حمّل أدلة السلامة الرسمية بفرز PDF جاهز للطباعة، استخدم قوائم الفحص التفتيشية التفاعلية مع تقرير تقييم مباشر، واطلع على خطوات الاستجابة للطوارئ والعمل الآمن.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 inline-flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('pdfs')}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'pdfs'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>ملفات PDF قابلة للتحميل ({SAFETY_PDFS_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('checklists')}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'checklists'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-blue-400" />
              <span>قوائم فحص تفاعلية</span>
            </button>

            <button
              onClick={() => setActiveTab('steps')}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'steps'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ListOrdered className="w-4 h-4 text-amber-400" />
              <span>توجيهات خطوة بخطوة</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Downloadable PDFs */}
        {activeTab === 'pdfs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {SAFETY_PDFS_DATA.map((pdf) => (
              <div
                key={pdf.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      {pdf.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {pdf.fileSize} • {pdf.pagesCount} صفحات
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 font-['Cairo']">
                    {pdf.titleAr}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pdf.description}
                  </p>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 block">أبرز محتويات هذا الدليل:</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {pdf.keyTopics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between gap-3 mt-6">
                  <span className="text-[11px] text-slate-500 font-mono">
                    المرجع: {pdf.codeRef}
                  </span>

                  <button
                    disabled={generatingId === pdf.id}
                    onClick={() => handleDownloadSafetyPdf(pdf)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold text-xs shadow-md shadow-emerald-900/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {generatingId === pdf.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>جاري تجهيز PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>تحميل النسخة PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Interactive Checklists */}
        {activeTab === 'checklists' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Checklist Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INTERACTIVE_CHECKLISTS.map((chk) => {
                const IconComp = getChecklistIcon(chk.iconName);
                const isSelected = selectedChecklist.id === chk.id;
                return (
                  <button
                    key={chk.id}
                    onClick={() => setSelectedChecklist(chk)}
                    className={`p-5 rounded-2xl text-right transition-all border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl ring-2 ring-blue-500/50'
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-base font-['Cairo']">{chk.titleAr}</h4>
                    </div>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {chk.descriptionAr}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Checklist Inspection Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
              
              {/* Header & Score Progress */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-['Cairo']">
                    {selectedChecklist.titleAr}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    حدد البنود المطبقة بالموقع لتقييم النسبة المئوية للجاهزية والسلامة.
                  </p>
                </div>

                {/* Live Score Circle & Progress Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 min-w-[260px]">
                  <div className="relative w-14 h-14 flex items-center justify-center font-black text-xl font-['Cairo']">
                    <span className={scorePercentage >= 80 ? 'text-emerald-600' : scorePercentage >= 50 ? 'text-amber-600' : 'text-red-600'}>
                      {scorePercentage}%
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>جاهزية الموقع</span>
                      <span>{compliantCount} من {totalItems} بنود</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          scorePercentage >= 80 ? 'bg-emerald-500' : scorePercentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${scorePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {selectedChecklist.items.map((item, index) => {
                  const isChecked = checkedState[item.id] || false;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCheckboxToggle(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isChecked
                          ? 'bg-emerald-50/80 border-emerald-200 text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="pt-0.5">
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-sm text-slate-900">
                            {index + 1}. {item.questionAr}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          توجيه الفحص: {item.hint}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Checklist Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  {scorePercentage >= 80 ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> الموقع مستوفٍ لشروط السلامة بامتياز.
                    </span>
                  ) : (
                    <span className="text-amber-700 font-bold flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> يتطلب الموقع إستكمال البنود غير المكتملة لتفادي المخالفات.
                    </span>
                  )}
                </div>

                <button
                  disabled={generatingId === 'checklist_report'}
                  onClick={handleDownloadChecklistPdf}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  {generatingId === 'checklist_report' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>جاري تصدير التقرير...</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-4 h-4" />
                      <span>تصدير وطباعة تقرير التفتيش (PDF)</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: Step-by-Step Practical Guides */}
        {activeTab === 'steps' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Guide Selection Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {PRACTICAL_STEP_GUIDES.map((guide) => {
                const isSelected = activeGuide.id === guide.id;
                return (
                  <button
                    key={guide.id}
                    onClick={() => setActiveGuide(guide)}
                    className={`px-5 py-3 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                    }`}
                  >
                    <span>{guide.titleAr}</span>
                  </button>
                );
              })}
            </div>

            {/* Step Stepper Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-8">
              
              <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 mb-2 inline-block">
                    {activeGuide.category}
                  </span>
                  <h3 className="text-2xl font-black font-['Cairo']">{activeGuide.titleAr}</h3>
                  <p className="text-xs text-slate-400 mt-1">{activeGuide.subtitleAr}</p>
                </div>

                <div className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                  الزمن التقديري للتنفيذ: <strong className="text-emerald-400">{activeGuide.estimatedTime}</strong>
                </div>
              </div>

              {/* Stepper Workflow Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeGuide.steps.map((st) => (
                  <div key={st.stepNumber} className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80 space-y-3 relative">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                        {st.stepNumber}
                      </div>
                      <h4 className="font-extrabold text-base text-white font-['Cairo']">{st.titleAr}</h4>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {st.descriptionAr}
                    </p>

                    {st.safetyNoteAr && (
                      <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg text-amber-300 text-[11px] flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{st.safetyNoteAr}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
