import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles,
  ShieldCheck,
  User,
  Trash2,
  Lightbulb,
  CornerDownLeft
} from 'lucide-react';
import { AIChatMessage } from '../types/ohs';

interface AISafetyAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const AISafetyAssistantModal: React.FC<AISafetyAssistantModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'مرحباً بك! أنا "مساعد وقاية الذكي" المتخصص في الصحة والسلامة المهنية (OSH). كيف يمكنني مساعدتك اليوم في تقييم المخاطر، استشارات الأمان، أو تفسير كودات السلامة واللوائح؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'كيف أصمم خطة تقييم مخاطر شاملة لموقع بناء؟',
    'ما هي الاشتراطات الرسمية لصندوق الإسعافات الأولية 2024؟',
    'كيف أطبق الهرم الترتيبي للسيطرة على الضوضاء الصناعية؟',
    'ما هي إجراءات السلامة عند صيانة اللوحات الكهربائية LOTO؟',
  ];

  useEffect(() => {
    if (initialTopic) {
      handleSendMessage(`أحتاج استشارة فنية وإرشادات حول: ${initialTopic}`);
    }
  }, [initialTopic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, context: initialTopic || '' }),
      });

      const data = await response.json();
      setLoading(false);

      const botMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.text || 'شكرًا لطلبك. استنادًا إلى أحدث معايير الصحة والسلامة المهنية، يُوصى بتطبيق الضوابط الهندسية والالتزام بمعدات الوقاية الشخصية مع الفحص الدوري.',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setLoading(false);
      const fallbackMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'عذراً، حدث خطأ مؤقت في الاتصال بالمساعد الذكي. للحصول على توجيه فورية، يمكنك مراجعة قسم إرشادات السلامة أو التواصل مع مهندس السلامة عبر نموذج الاستشارات.',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between border-r border-slate-200 text-right">
        
        {/* Drawer Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white font-['Cairo']">مساعد وقاية الذكي</h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/30">Gemini OSH AI</span>
              </div>
              <p className="text-[11px] text-slate-400">مستشار افتراضي معتمد في الصحة والسلامة المهنية</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages(messages.slice(0, 1))}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="مسح المحادثة"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50">
          
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${isUser ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isUser ? 'bg-blue-600 text-white' : 'bg-slate-900 text-cyan-400'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tl-none shadow-md'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tr-none shadow-sm whitespace-pre-line'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[10px] block mt-1.5 font-mono ${isUser ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 max-w-[85%] ml-auto">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-cyan-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tr-none border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>يقوم المساعد الذكي بتحليل طلبك وصياغة الإرشادات...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length < 3 && (
          <div className="px-5 py-2 bg-slate-100 border-t border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>أسئلة مقترحة للاستشارة:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-[11px] bg-white text-slate-700 hover:text-blue-600 hover:border-blue-300 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all text-right"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="اكتب سؤالك أو استشارتك في الصحة والسلامة..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputPrompt.trim()}
              className="absolute left-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[10px] text-slate-400 mt-1.5 block text-center">
            مُدعم بذكاء Gemini الاصطناعي لإرشادات الصحة والسلامة المهنية
          </span>
        </div>

      </div>
    </div>
  );
};
