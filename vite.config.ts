import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';

function apiServerPlugin(): Plugin {
  return {
    name: 'api-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/gemini/advisor' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const userPrompt = data.prompt || 'كيف يمكنني تقييم المخاطر في بيئة العمل؟';
              const context = data.context || '';

              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'GEMINI_API_KEY environment variable is missing.' }));
              }

              const ai = new GoogleGenAI({
                apiKey: apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  },
                },
              });

              const systemInstruction = `أنت مهندس خبير ومستشار معتمد في الصحة والسلامة المهنية (OSH Specialist) لمنصة "وقاية".
إجاباتك يجب أن تكون باللغة العربية الواضحة الاحترافية المعتمدة على معايير OSHA وكودات الحريق والسلامة المهنية وتحديد الهرم الترتيبي للتحكم بالمخاطر (Hierarchy of Controls: الإزالة، الاستبدال، الضوابط الهندسية، الضوابط الإدارية، معدات الوقاية الشخصية PPE).
قدم إرشادات دقيقة خطوة بخطوة وتوصيات بأسلوب محترف ومباشر.`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: `${context ? `سياق السؤال: ${context}\n\n` : ''}سؤال المستخدم: ${userPrompt}`,
                config: {
                  systemInstruction: systemInstruction,
                  temperature: 0.7,
                },
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ text: response.text || 'لم يتم استلام رد من النظام.' }));
            } catch (err: any) {
              console.error('Gemini API Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'حدث خطأ في معالجة طلب الاستشارة الذكية.' }));
            }
          });
          return;
        }

        if (req.url === '/api/consultation' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const consultationData = JSON.parse(body || '{}');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                message: 'تم استلام طلب الاستشارة بنجاح، وسيتواصل معك مهندس السلامة المختص خلال 24 ساعة.',
                referenceCode: 'WIQ-' + Math.floor(100000 + Math.random() * 900000),
                receivedData: consultationData
              }));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'بيانات غير صالحة.' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
