import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  X,
  Share2,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  HardHat
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogData';
import { BlogArticle } from '../types/ohs';

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticleModal, setActiveArticleModal] = useState<BlogArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<{ [key: string]: boolean }>({});
  const [failedImages, setFailedImages] = useState<{ [key: string]: boolean }>({});
  const [failedAvatars, setFailedAvatars] = useState<{ [key: string]: boolean }>({});

  const categories = ['all', 'تشريعات', 'دراسة حالة', 'توجيهات فنية'];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleAvatarError = (id: string) => {
    setFailedAvatars((prev) => ({ ...prev, [id]: true }));
  };

  const filteredArticles = BLOG_ARTICLES.filter((art) => {
    if (selectedCategory === 'all') return true;
    return art.category === selectedCategory;
  });

  return (
    <section id="blog" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200 inline-flex items-center gap-1.5">
            <Newspaper className="w-3.5 h-3.5 text-indigo-600" />
            <span>مدونة ومستجدات السلامة والصحة المهنية</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Cairo']">
            آخر تحديثات السلامة وحالات دراسية ميدانية
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            مواكبة دورية لأحدث الأنظمة والتشريعات العمالية، مع دراسات حالة تطبيقية من واقع المصانع والمؤسسات ومواقع الإنشاءات.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              {cat === 'all' ? 'جميع المقالات والدراسات' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const isSaved = bookmarkedIds[article.id] || false;
            const hasImageFailed = failedImages[article.id];
            const hasAvatarFailed = failedAvatars[article.id];

            return (
              <div
                key={article.id}
                onClick={() => setActiveArticleModal(article)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
              >
                <div>
                  {/* Article Image Container */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    {!hasImageFailed ? (
                      <img
                        src={article.imageUrl}
                        alt={article.titleAr}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(article.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 p-6 flex flex-col justify-between text-white relative">
                        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                          <span className="text-xs font-bold text-slate-300">وقاية OSH</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-blue-300 font-semibold">{article.category}</span>
                          <h4 className="text-sm font-bold line-clamp-2 text-white font-['Cairo']">{article.titleAr}</h4>
                        </div>
                      </div>
                    )}
                    
                    {/* Category Badge Overlay */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-md ${
                        article.isCaseStudy ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-blue-600 text-white'
                      }`}>
                        {article.category}
                      </span>
                    </div>

                    {/* Bookmark Action */}
                    <button
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                      }`}
                      title="حفظ المقال"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Article Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors leading-snug font-['Cairo']">
                      {article.titleAr}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerptAr}
                    </p>
                  </div>
                </div>

                {/* Article Author Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {!hasAvatarFailed ? (
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        referrerPolicy="no-referrer"
                        onError={() => handleAvatarError(article.id)}
                        className="w-8 h-8 rounded-full object-cover border border-slate-300"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs border border-slate-300">
                        {article.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{article.author.name}</span>
                      <span className="text-[10px] text-slate-500">{article.author.role}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1">
                    قراءة المقال <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Article Detail Modal Viewer */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 my-8 text-right">
            
            {/* Modal Header Bar */}
            <div className="relative h-64 bg-slate-900">
              {!failedImages[`modal-${activeArticleModal.id}`] ? (
                <img
                  src={activeArticleModal.imageUrl}
                  alt={activeArticleModal.titleAr}
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(`modal-${activeArticleModal.id}`)}
                  className="w-full h-full object-cover filter brightness-75"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-8 flex items-center justify-between">
                  <div className="space-y-2">
                    <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    <span className="text-xs text-blue-300 font-bold">منصة وقاية الرسمية</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 right-6 left-6 text-white space-y-2">
                <span className="text-xs font-extrabold px-3 py-1 rounded-md bg-blue-600 text-white">
                  {activeArticleModal.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-['Cairo'] leading-tight">
                  {activeArticleModal.titleAr}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              
              {/* Meta details */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  {!failedAvatars[`modal-${activeArticleModal.id}`] ? (
                    <img
                      src={activeArticleModal.author.avatar}
                      alt={activeArticleModal.author.name}
                      referrerPolicy="no-referrer"
                      onError={() => handleAvatarError(`modal-${activeArticleModal.id}`)}
                      className="w-10 h-10 rounded-full object-cover border border-slate-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm border border-slate-300">
                      {activeArticleModal.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{activeArticleModal.author.name}</span>
                    <span>{activeArticleModal.author.role}</span>
                  </div>
                </div>

                <div className="text-left space-y-1">
                  <div>تاريخ النشر: <strong className="text-slate-800">{activeArticleModal.date}</strong></div>
                  <div>وقت القراءة: <strong className="text-slate-800">{activeArticleModal.readTime}</strong></div>
                </div>
              </div>

              {/* Full Content */}
              <div className="text-slate-800 text-sm leading-loose whitespace-pre-line font-normal space-y-4">
                {activeArticleModal.contentAr}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> الوسوم:
                </span>
                {activeArticleModal.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                منصة وقاية للتوعية بالصحة والسلامة المهنية
              </span>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                إغلاق النافذة
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

