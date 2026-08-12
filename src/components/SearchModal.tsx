import React, { useState } from 'react';
import {
  Search,
  X,
  AlertTriangle,
  FileCheck,
  Newspaper,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { HAZARDS_DATA } from '../data/hazardsData';
import { SAFETY_PDFS_DATA, INTERACTIVE_CHECKLISTS } from '../data/guidelinesData';
import { BLOG_ARTICLES } from '../data/blogData';
import { SAFETY_SIGNS_DATA } from '../data/safetySignsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHazard?: (hazardId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedHazards = HAZARDS_DATA.filter(
    (h) =>
      h.nameAr.includes(query) ||
      h.nameEn.toLowerCase().includes(query.toLowerCase()) ||
      h.shortDescription.includes(query)
  );

  const matchedPdfs = SAFETY_PDFS_DATA.filter(
    (p) => p.titleAr.includes(query) || p.description.includes(query)
  );

  const matchedArticles = BLOG_ARTICLES.filter(
    (a) => a.titleAr.includes(query) || a.excerptAr.includes(query)
  );

  const matchedSigns = SAFETY_SIGNS_DATA.filter(
    (s) => s.titleAr.includes(query) || s.titleEn.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults =
    query.trim() !== '' &&
    (matchedHazards.length > 0 ||
      matchedPdfs.length > 0 ||
      matchedArticles.length > 0 ||
      matchedSigns.length > 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-20 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 text-right">
        
        {/* Input Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center gap-3 relative">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن مخاطر، أدلة سلامة، علامات تحذير، أو مقالات..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <Search className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs">اكتب كلمة البحث للبدء الاستكشاف الشامل لمحتويات منصة وقاية</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-slate-500 space-y-2">
              <AlertTriangle className="w-10 h-10 mx-auto text-amber-500" />
              <p className="text-xs font-bold">لم يتم العثور على نتائج تطابق "{query}"</p>
              <p className="text-[11px] text-slate-400">جرب البحث بكلمات كـ: ضوضاء، كهرباء، حريق، إسعاف، خوذة، LOTO...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Hazards Results */}
              {matchedHazards.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded block">
                    المخاطر المهنية ({matchedHazards.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedHazards.map((h) => (
                      <a
                        key={h.id}
                        href="#hazards"
                        onClick={onClose}
                        className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{h.nameAr}</span>
                          <span className="text-[10px] text-slate-500">{h.categoryNameAr}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{h.shortDescription}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* PDFs Results */}
              {matchedPdfs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded block">
                    أدلة السلامة وPDF ({matchedPdfs.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedPdfs.map((p) => (
                      <a
                        key={p.id}
                        href="#guidelines"
                        onClick={onClose}
                        className="block p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{p.titleAr}</span>
                          <span className="text-[10px] text-emerald-600 font-mono">{p.fileSize}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Signs Results */}
              {matchedSigns.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-2.5 py-1 rounded block">
                    علامات التحذير المعيارية ({matchedSigns.length})
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {matchedSigns.map((s) => (
                      <a
                        key={s.id}
                        href="#statistics"
                        onClick={onClose}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 flex items-center justify-between"
                      >
                        <span>{s.titleAr}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{s.code}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Results */}
              {matchedArticles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded block">
                    الأخبار والحالات الدراسية ({matchedArticles.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedArticles.map((a) => (
                      <a
                        key={a.id}
                        href="#blog"
                        onClick={onClose}
                        className="block p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 transition-colors"
                      >
                        <span className="font-bold text-xs text-slate-900 block">{a.titleAr}</span>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{a.excerptAr}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
