import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Helper to generate page header for multi-page OSH documents.
 */
function renderPageHeader(codeRef: string, pageNum: number, totalPages: number) {
  return `
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: #ffffff; padding: 22px 32px; border-bottom: 5px solid #059669; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background-color: #059669; width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; color: #ffffff;">
          و
        </div>
        <div>
          <div style="font-size: 16px; font-weight: 900; color: #ffffff;">منصة وقاية الوطنية للصحة والسلامة المهنية</div>
          <div style="font-size: 10px; color: #93c5fd;">Wiqaya OSH Platform • Official Technical Reference Guide</div>
        </div>
      </div>
      <div style="text-align: left; display: flex; gap: 12px; align-items: center;">
        <div style="background-color: rgba(255, 255, 255, 0.12); padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); text-align: center;">
          <div style="font-size: 9px; color: #cbd5e1;">المرجع التنظيمي</div>
          <div style="font-size: 11px; font-weight: 700; color: #34d399; direction: ltr;">${codeRef}</div>
        </div>
        <div style="background-color: #059669; color: #ffffff; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 800;">
          صفحة ${pageNum} من ${totalPages}
        </div>
      </div>
    </div>
  `;
}

/**
 * Helper to generate page footer.
 */
function renderPageFooter(pageNum: number, totalPages: number) {
  return `
    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; align-items: center;">
      <div>منصة وقاية للتشريعات والمواصفات الوطنية للصحة والسلامة المهنية © ${new Date().getFullYear()}</div>
      <div>وثيقة مرجعية معتمدة • الصفحة ${pageNum} من ${totalPages}</div>
      <div>https://wiqaya-osh.org</div>
    </div>
  `;
}

/**
 * Generates a high-quality, multi-page Arabic PDF manual/guide for OSH standards.
 */
export async function generateSafetyCodePDF(
  title: string,
  category: string,
  topics: string[],
  codeRef: string
) {
  // Wait for Cairo font to be fully loaded in document
  if (document.fonts) {
    await document.fonts.ready;
  }

  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // Exact A4 width at 96 DPI
  container.style.backgroundColor = '#f1f5f9';
  container.style.color = '#0f172a';
  container.style.fontFamily = "'Cairo', system-ui, -apple-system, sans-serif";
  container.style.direction = 'rtl';
  container.style.textAlign = 'right';
  container.style.boxSizing = 'border-box';
  container.style.zIndex = '-9999';

  const todayStr = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isFireCode = codeRef.includes('الحريق') || title.includes('الحريق');
  const isFirstAid = codeRef.includes('78') || title.includes('الإسعاف');
  const isMedical = codeRef.includes('83') || title.includes('الطبي');
  const isCommittee = codeRef.includes('33') || title.includes('لجان');

  // Multi-Page HTML Generation
  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
      * { box-sizing: border-box; font-family: 'Cairo', system-ui, sans-serif !important; letter-spacing: normal !important; }
      .pdf-page { width: 794px; height: 1120px; background-color: #ffffff; position: relative; box-sizing: border-box; overflow: hidden; page-break-after: always; }
      .page-content { padding: 28px 36px 60px 36px; }
      .section-title { font-size: 15px; font-weight: 800; color: #1e3a8a; margin: 18px 0 10px 0; border-right: 4px solid #059669; padding-right: 10px; display: flex; align-items: center; justify-content: space-between; }
      .info-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 14px; }
      .data-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 11px; }
      .data-table th { background-color: #1e3a8a; color: #ffffff; padding: 8px 10px; text-align: right; font-weight: 800; border: 1px solid #1e3a8a; }
      .data-table td { padding: 8px 10px; border: 1px solid #cbd5e1; color: #334155; font-size: 11px; line-height: 1.5; }
      .data-table tr:nth-child(even) { background-color: #f8fafc; }
      .article-card { background: #ffffff; border: 1px solid #cbd5e1; border-right: 4px solid #1e3a8a; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; }
    </style>

    <!-- PAGE 1: Executive Overview & Legislative Framework -->
    <div class="pdf-page">
      ${renderPageHeader(codeRef, 1, 4)}
      <div class="page-content">
        
        <!-- Cover Title Box -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 22px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="background-color: #d1fae5; color: #065f46; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; border: 1px solid #a7f3d0;">
              تصنيف الدليل: ${category}
            </span>
            <span style="font-size: 11px; color: #64748b; font-weight: 700;">
              📅 تاريخ الاعتماد والطباعة: ${todayStr}
            </span>
          </div>
          <h1 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 900; color: #0f172a; line-height: 1.4;">
            ${title}
          </h1>
          <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.6;">
            مرجع إرشادي وتشريعي موحد صادر عن منصة وقاية الوطنية للصحة والسلامة المهنية، بهدف تبيان الأحكام والتعليمات التنفيذية والمواصفات الفنية المعتمدة لحماية بيئة العمل والعاملين بالمملكة.
          </p>
        </div>

        <!-- Section 1: Executive Scope -->
        <div class="section-title">
          <span>أولاً: نطاق التطبيق والغرض التشريعي</span>
          <span style="font-size: 11px; color: #64748b; font-weight: 600;">الفصل الأول</span>
        </div>
        <div class="info-box">
          <p style="margin: 0 0 8px 0; font-size: 11.5px; color: #334155; line-height: 1.6;">
            تسري أحكام هذا الدليل التنفيذي على جميع المنشآت الاقتصادية والصناعية والانشائية والخدمية العاملة في القطاعين العام والخاص. يُلزم أصحاب العمل ومسؤولو السلامة باتباع الضوابط الواردة فيه لضمان الامتثال للأنظمة الوطنية.
          </p>
          <div style="display: flex; gap: 16px; margin-top: 10px; font-size: 11px; color: #1e3a8a; font-weight: 700; background-color: #ffffff; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1;">
            <div>• السلطة المرجعية: وزارة العمل والدفاع المدني</div>
            <div>• درجة الإلزام: معيار تنفيذي ملزم قانوناً</div>
          </div>
        </div>

        <!-- Section 2: Key Mandates -->
        <div class="section-title">
          <span>ثانياً: المحاور والركائز التنفيذية الرئيسية</span>
          <span style="font-size: 11px; color: #64748b; font-weight: 600;">الفصل الثاني</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${topics.map((topic, idx) => `
            <div class="article-card">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="background-color: #1e3a8a; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; shrink: 0;">
                  ${idx + 1}
                </div>
                <div style="font-size: 12px; font-weight: 800; color: #0f172a;">
                  ${topic}
                </div>
              </div>
              <div style="margin-top: 6px; font-size: 11px; color: #475569; line-height: 1.5; padding-right: 34px;">
                الالتزام التام بكافة التفاصيل الإجرائية والفنية الصادرة بموجب هذا المبدأ، مع توثيق السجلات ذات الصلة وإتاحتها لمفتشي السلامة المهنية عند الطلب.
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Section 3: Risk Classification -->
        <div class="section-title">
          <span>ثالثاً: تصنيف المنشآت حسب مستويات الخطورة</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>فئة الخطورة</th>
              <th>نوع الأنشطة المشمولة</th>
              <th>درجة الفحص الدوري</th>
              <th>متطلبات الإشراف</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>عالية الخطورة (High)</strong></td>
              <td>الانشاءات، الصناعات الكيميائية، التعدين، الطاقة</td>
              <td>شهرياً + فحص يومي ميداني</td>
              <td>أخصائي سلامة متفرغ لكل 100 عامل</td>
            </tr>
            <tr>
              <td><strong>متوسطة الخطورة (Medium)</strong></td>
              <td>الورش الميكانيكية، المستودعات، الأغذية، النقل</td>
              <td>كل 3 أشهر</td>
              <td>مشرف سلامة لكل 150 عاملاً</td>
            </tr>
            <tr>
              <td><strong>منخفضة الخطورة (Low)</strong></td>
              <td>المكاتب التجارية، المدارس، المتاجر البسيطة</td>
              <td>سنوياً</td>
              <td>ضابط اتصال سلامة معتمد</td>
            </tr>
          </tbody>
        </table>

      </div>
      ${renderPageFooter(1, 4)}
    </div>

    <!-- PAGE 2: Technical Specifications & Operational Standards -->
    <div class="pdf-page">
      ${renderPageHeader(codeRef, 2, 4)}
      <div class="page-content">

        <div class="section-title">
          <span>رابعاً: الاشتراطات والمواصفات الفنية التفصيلية</span>
          <span style="font-size: 11px; color: #64748b; font-weight: 600;">المعايير الهندسية</span>
        </div>

        ${isFireCode ? `
          <div class="article-card">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#1e3a8a;">1. أنظمة الإطفاء والرش التلقائي (NFPA 13 / 14)</h4>
            <p style="margin:0; font-size:11px; color:#334155; line-height:1.6;">
              تلتزم المباني التي تتجاوز مساحتها 400 م² بتركيب شبكة رشاشات مياه تلقائية (Automatic Sprinklers) تعمل تحت ضغط تشغيلي لا يقل عن 4.5 بار. يجب توفير مضخة حريق ديزل معتمدة مع مضخة جوكي (Jockey Pump) للمحافظة على الضغط المائي بشكل مستمر.
            </p>
          </div>
          <div class="article-card">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#1e3a8a;">2. أنظمة الإنذار المبكر ومخارج الطوارئ</h4>
            <p style="margin:0; font-size:11px; color:#334155; line-height:1.6;">
              تركيب كواشف الدخان والحرارة في جميع الممرات والمكاتب. يجب ألا تزيد مسافة الانتقال الوصولية لأقرب مخرج طوارئ عن 30 متراً للمباني غير المزودة بررشاشات و45 متراً للمباني المحمية. أبواب الطوارئ تفتح للخارج ومزودة بكالون دفع (Panic Bar).
            </p>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>نوع طفاية الحريق</th>
                <th>المادة الإطفائية</th>
                <th>مجال الاستخدام المعتمد</th>
                <th>مسافة التوزيع القصوى</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>بودرة كيميائية جافة (ABC)</td>
                <td>Monoammonium Phosphate</td>
                <td>المواد الصلبة، السوائل، والكهرباء</td>
                <td>كل 15 متراً طولي</td>
              </tr>
              <tr>
                <td>ثاني أكسيد الكربون (CO2)</td>
                <td>CO2 تحت ضغط عالٍ</td>
                <td>اللوحات والمعدات الكهربائية الدقيقة</td>
                <td>بجوار الغرف الكهربائية</td>
              </tr>
              <tr>
                <td>الرغوة المائية (Foam)</td>
                <td>AFFF Foam</td>
                <td>حرائق السوائل القابلة للاشتعال (فئة B)</td>
                <td>كل 20 متراً في المستودعات</td>
              </tr>
            </tbody>
          </table>
        ` : isFirstAid ? `
          <div class="article-card">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#1e3a8a;">1. الجدول القانوني لمحتويات صندوق الإسعافات الـ 18</h4>
            <p style="margin:0; font-size:11px; color:#334155; line-height:1.6;">
              يشترط قانوناً احتواء كل صندوق إسعاف على: شاش معقم أحجام مختلفة (10)، رباط ضاغط (5)، بلاستر طبي مائي، مقص معقم، جيل حروق، محلول غسيل للعين، قفازات طبية نيتريل (10 أزواج)، كمامات CPR، ميزان حرارة، وملاقط معقمة.
            </p>
          </div>
          <div class="article-card">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#1e3a8a;">2. جهاز إزالة الرجفان القلبي (AED) وغرف الإسعاف</h4>
            <p style="margin:0; font-size:11px; color:#334155; line-height:1.6;">
              الشركات التي يتجاوز عدد عمالها 200 عامل ملزمة بتوفير جهاز AED تلقائي في مكان بارز. للمنشآت التي تضم 100 عامل فأكثر، يجب تخصيص غرفة إسعافات بمساحة لا تقل عن 12 م² مزودة بسرير كشف ومغسلة مياه وسلندر أوكسجين.
            </p>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>عدد العمال بالمنشأة</th>
                <th>عدد الحقائب المطلوب</th>
                <th>نسبة المسعفين المدربين</th>
                <th>غرفة إسعاف اختصاصية</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>من 1 إلى 20 عاملاً</td>
                <td>حقيبة حجم صغير (1)</td>
                <td>مسعف مدرب واحد على الأقل</td>
                <td>غير إجباري (صندوق معتمد)</td>
              </tr>
              <tr>
                <td>من 21 إلى 100 عامل</td>
                <td>حقيبة حجم متوسط (2)</td>
                <td>2% من إجمالي الكادر</td>
                <td>ركن إسعاف مخصص</td>
              </tr>
              <tr>
                <td>أكثر من 100 عامل</td>
                <td>حقيبة كبيرة لكل 50 عاملاً</td>
                <td>4% من إجمالي العمال</td>
                <td>غرفة إسعاف متكاملة وممرض</td>
              </tr>
            </tbody>
          </table>
        ` : isMedical ? `
          <div class="article-card">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#1e3a8a;">1. برنامج الفحص الطبي الابتدائي قبل التوظيف</h4>
            <p style="margin:0; font-size:11px; color:#334155; line-height:1.6;">
              إجراء فحص شامل يضمن لياقة العامل الصحية للمهنة المرشح لها، يشمل: الصورة الدموية الكاملة (CBC)، وظائف الكبد والكلى، تخطيط القلب (ECG)، فحص النظر وتمييز الألوان، وصورة أشعة سينية للصدر للعمال في البيئات الغبارية.
            </p>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>نوع الخطر المهني</th>
                <th>نوع الفحص الطبي الدوري</th>
                <th>دورية الفحص</th>
                <th>الحدود الحرج المسموحة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>الضوضاء المهنية (>85 ديسيبل)</td>
                <td>فحص السمع بدقة (Audiometry)</td>
                <td>كل 12 شهراً</td>
                <td>تراجع السمع بحد أقصى 10 ديسيبل</td>
              </tr>
              <tr>
                <td>الأغبرة والمواد الكيميائية</td>
                <td>وظائف التنفس (Spirometry) + أشعة صدر</td>
                <td>كل 6 إلى 12 شهراً</td>
                <td>سعة الحيوية الرئوية FVC > 80%</td>
              </tr>
              <tr>
                <td>المعادن الثقيلة والرصاص</td>
                <td>تحليل مستوى الرصاص بالدم والمؤشرات الكيميائية</td>
                <td>كل 6 أشهر</td>
                <td>الرصاص بالدم أقل من 30 ميكروغرام/ديسيلتر</td>
              </tr>
            </tbody>
          </table>
        ` : `
          <div class="article-card">
            <h4 style="margin:0 0 6px 0; font-size:12.5px; color:#1e3a8a;">1. الهيكل التنظيمي للسلامة وتوزيع الأدوار</h4>
            <p style="margin:0; font-size:11px; color:#334155; line-height:1.6;">
              تشكيل لجنة سلامة برئاسة صاحب العمل أو من ينوب عنه، وعضوية كل من: مشرف السلامة المهنية، طبيب/مسعف المنشأة، وممثلين عن العمال بنسبة لا تقل عن 50% من إجمالي أعضاء اللجنة.
            </p>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>حجم المنشأة (عدد العمال)</th>
                <th>الكادر المطلوب للسلامة</th>
                <th>اجتماعات اللجنة</th>
                <th>التقارير المطلوبة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>50 إلى 200 عامل</td>
                <td>مشرف سلامة فني معتمد (1)</td>
                <td>شهرياً بشكل دوري</td>
                <td>محضر اجتماع شهري لوزارة العمل</td>
              </tr>
              <tr>
                <td>201 إلى 500 عامل</td>
                <td>أخصائي سلامة + مشرف فني (2)</td>
                <td>شهرياً أو عند الطوارئ</td>
                <td>تقرير ربع سنوي وتقييم مخاطر</td>
              </tr>
              <tr>
                <td>أكثر من 500 عامل</td>
                <td>إدارة سلامة متكاملة (3+)</td>
                <td>كل أسبوعين</td>
                <td>خطة سلامة سنوية ميزانية مستقلة</td>
              </tr>
            </tbody>
          </table>
        `}

        <div class="section-title">
          <span>خامساً: خطوات التفتيش والقياس الميداني</span>
        </div>
        <div class="info-box">
          <ul style="margin:0; padding-right:18px; font-size:11px; color:#334155; line-height:1.7;">
            <li>معايرة جميع أجهزة القياس البيئي (قياس الضوضاء، الغازات، الإضاءة) شهرياً بشهادة رسمية.</li>
            <li>الاحتفاظ بسجلات الصيانة الدورية واختبارات الأجهزة لمدة لا تقل عن 5 سنوات في ملفات السلامة.</li>
            <li>إلزام المقاولين والزوار بجميع تعليمات السلامة واللوحات الإرشادية داخل حدود الموقع.</li>
          </ul>
        </div>

      </div>
      ${renderPageFooter(2, 4)}
    </div>

    <!-- PAGE 3: Responsibilities, Penalties & Risk Assessment -->
    <div class="pdf-page">
      ${renderPageHeader(codeRef, 3, 4)}
      <div class="page-content">

        <div class="section-title">
          <span>سادساً: مصفوفة المسؤوليات وواجبات الأطراف</span>
          <span style="font-size: 11px; color: #64748b; font-weight: 600;">الحوكمة والامتثال</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div class="info-box" style="border-top: 3px solid #1e3a8a;">
            <h4 style="margin:0 0 6px 0; font-size:12px; color:#1e3a8a;">واجبات صاحب العمل والإنشاءات</h4>
            <ul style="margin:0; padding-right:16px; font-size:10.5px; color:#475569; line-height:1.6;">
              <li>توفير جميع معدات الوقاية الشخصية (PPE) مجاناً وبدون أي تكلفة على العامل.</li>
              <li>توفير بيئة عمل آمنة خالية من المخاطر الفيزيائية والكيميائية والبيولوجية.</li>
              <li>تأمين التدريب التخصصي الأولي والدوري لجميع العاملين الجدد والقدامى.</li>
            </ul>
          </div>

          <div class="info-box" style="border-top: 3px solid #059669;">
            <h4 style="margin:0 0 6px 0; font-size:12px; color:#059669;">واجبات العامل والموظف</h4>
            <ul style="margin:0; padding-right:16px; font-size:10.5px; color:#475569; line-height:1.6;">
              <li>الالتزام الصارم بارتداء وسيلة الحماية الشخصية المقررة طوال فترة العمل.</li>
              <li>الإبلاغ الفوري عن أي عطل أو خطر أو حادث وشيك الوقوع لمشرف السلامة.</li>
              <li>الامتناع عن تعطيل أو إزالة حواجز الأمان والمعدات الوقائية المجهزة للآلات.</li>
            </ul>
          </div>
        </div>

        <div class="section-title">
          <span>سابعاً: جدول المخالفات والعقوبات القانونية المترتبة</span>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>درجة المخالفة</th>
              <th>وصف عدم الامتثال</th>
              <th>الإجراء الإداري الأول</th>
              <th>الغرامة والعقوبة القانونية</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>مخالفة جسيمة (درجة أ)</strong></td>
              <td>تشغيل الموقع بدون وسائل إطفاء أو إزالة حواجز حماية المرتفعات</td>
              <td>إيقاف العمل فوراً وإغلاق جزئي للموقع</td>
              <td>غرامة مالية من 1,000 إلى 5,000 دينار + إحالة للقضاء</td>
            </tr>
            <tr>
              <td><strong>مخالفة متوسطة (درجة ب)</strong></td>
              <td>عدم توفير صندوق إسعافات متكامل أو التأخر في الفحص الطبي الدوري</td>
              <td>إنذار كتابي مهلة 7 أيام للتصحيح</td>
              <td>غرامة مالية من 300 إلى 1,000 دينار عند التكرار</td>
            </tr>
            <tr>
              <td><strong>مخالفة بسيطة (درجة ج)</strong></td>
              <td>عدم تعليق اللوحات الإرشادية أو نقص جزئي في السجلات الإدارية</td>
              <td>إشعار تنبيه مهلة 14 يوماً</td>
              <td>غرامة مالية من 100 إلى 300 دينار</td>
            </tr>
          </tbody>
        </table>

        <div class="section-title">
          <span>ثامناً: تعليمات حفظ الملفات والسجلات الطبية والهندسية</span>
        </div>
        <div class="info-box">
          <p style="margin:0; font-size:11px; color:#334155; line-height:1.6;">
            تلتزم إدارة المنشأة بحفظ الملفات التالية لمدة لا تقل عن <strong>10 سنوات</strong> من تاريخ إغلاقها:
            <br/>
            1. سجل حوادث وإصابات العمل والأمراض المهنية (نموذج 14 معتمد).
            <br/>
            2. تقارير الفحص الطبي الأولي والدوري لجميع العاملين مع نتائج التحاليل.
            <br/>
            3. محاضر اجتماعات لجنة السلامة والصحة المهنية وتقارير التفتيش الدوري.
          </p>
        </div>

      </div>
      ${renderPageFooter(3, 4)}
    </div>

    <!-- PAGE 4: Emergency Protocols & Official Approval Seals -->
    <div class="pdf-page">
      ${renderPageHeader(codeRef, 4, 4)}
      <div class="page-content">

        <div class="section-title">
          <span>تاسعاً: خطة الاستجابة للطوارئ والإخلاء الميداني</span>
          <span style="font-size: 11px; color: #64748b; font-weight: 600;">إدارة الأزمات</span>
        </div>

        <div class="article-card" style="border-right-color: #dc2626;">
          <h4 style="margin:0 0 6px 0; font-size:12px; color:#dc2626;">خطوات تفعيل خطة الطوارئ العامة عند الخطر الداهم</h4>
          <ol style="margin:0; padding-right:18px; font-size:11px; color:#334155; line-height:1.7;">
            <li>تفعيل جرس إنذار الحريق/الطوارئ فوراً وتنبيه غرفة التحكم الرئيسية.</li>
            <li>إيقاف جميع العمليات والماكينات فوراً وقفل صمامات الغاز والكهرباء الرئيسية.</li>
            <li>توجه جميع العمال عبر مسالك الطوارئ المحمية نحو نقاط التجمع الآمنة (Assembly Points).</li>
            <li>إجراء حصر وأخذ التفقد الميداني للعمال للتأكد من عدم وجود محتجزين داخل المبنى.</li>
            <li>التواصل الفوري مع خط الطوارئ الموحد (الدفاع المدني 911 / الإسعاف).</li>
          </ol>
        </div>

        <div class="section-title">
          <span>عاشراً: الاعتماد الرسمي للوثيقة وختم منصة وقاية</span>
        </div>

        <!-- Official Stamp & Accreditation Box -->
        <div style="background-color: #f8fafc; border: 2px solid #059669; border-radius: 12px; padding: 20px 24px; margin-top: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;">
              <div style="font-size: 14px; font-weight: 900; color: #1e3a8a; margin-bottom: 6px;">
                وثيقة معتمدة ومسجلة بالسجل الوطني للسلامة المهنية
              </div>
              <div style="font-size: 11px; color: #475569; line-height: 1.6;">
                تم إصدار هذا الدليل آلياً عبر نظام المرجعية الرقمية لمنصة وقاية الوطنية.
                تعتبر هذه النسخة مطابقة للوائح والقوانين التنفيذية الصادرة لسلامة بيئة العمل.
                <br/>
                <strong>رمز التوثيق الرقمي:</strong> <span style="direction: ltr; display: inline-block; font-family: monospace; font-weight: 700; color: #059669;">WIQ-OSH-${Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <!-- Visual Stamp Seal -->
            <div style="border: 3px double #059669; border-radius: 50%; width: 100px; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6px; background-color: #ffffff; color: #059669; shrink: 0; margin-right: 16px;">
              <div style="font-size: 8px; font-weight: 900;">منصة وقاية</div>
              <div style="font-size: 18px; margin: 2px 0;">🛡️</div>
              <div style="font-size: 8px; font-weight: 900;">اعتماد تنفيذ</div>
              <div style="font-size: 7px; color: #64748b; direction: ltr;">VERIFIED OSH</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 11px; color: #334155; margin-top: 20px; padding-top: 14px; border-top: 1px dashed #cbd5e1;">
            <div>اسم اعتماد المفتش: ...........................................</div>
            <div>التوقيع والاعتماد الرسمي: ...........................................</div>
          </div>
        </div>

      </div>
      ${renderPageFooter(4, 4)}
    </div>
  `;

  document.body.appendChild(container);

  try {
    // Wait a brief moment for canvas layout calculation
    await new Promise((res) => setTimeout(res, 300));

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 5) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const cleanTitle = title.replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '_').substring(0, 30);
    pdf.save(`دليل_وقاية_الرسمي_${cleanTitle}.pdf`);
  } catch (error) {
    console.error('Error generating Safety Code PDF:', error);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

/**
 * Generates a high-quality Arabic PDF report for OHS Field Audits & Checklists.
 */
export async function generateChecklistReportPDF(
  checklistTitle: string,
  scorePercentage: number,
  compliantCount: number,
  totalItems: number,
  items: { questionAr: string; isCompliant?: boolean | null }[]
) {
  if (document.fonts) {
    await document.fonts.ready;
  }

  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px';
  container.style.backgroundColor = '#f1f5f9';
  container.style.color = '#0f172a';
  container.style.fontFamily = "'Cairo', system-ui, -apple-system, sans-serif";
  container.style.direction = 'rtl';
  container.style.textAlign = 'right';
  container.style.boxSizing = 'border-box';
  container.style.zIndex = '-9999';

  const todayStr = new Date().toLocaleString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const badgeBg = scorePercentage >= 80 ? '#059669' : scorePercentage >= 50 ? '#d97706' : '#dc2626';
  const badgeText = scorePercentage >= 80 ? 'جاهز ومستوفٍ للمواصفات الوطنية' : scorePercentage >= 50 ? 'مستوفٍ جزئياً يتطلب خطة تصحيحية' : 'غير مستوفٍ - تنبيه مخاطر وتوقف';

  container.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
      * { box-sizing: border-box; font-family: 'Cairo', system-ui, sans-serif !important; letter-spacing: normal !important; }
      .pdf-page { width: 794px; height: 1120px; background-color: #ffffff; position: relative; box-sizing: border-box; overflow: hidden; page-break-after: always; }
      .page-content { padding: 28px 36px 60px 36px; }
      .section-title { font-size: 15px; font-weight: 800; color: #1e3a8a; margin: 18px 0 10px 0; border-right: 4px solid #059669; padding-right: 10px; display: flex; align-items: center; justify-content: space-between; }
      .data-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 11px; }
      .data-table th { background-color: #1e3a8a; color: #ffffff; padding: 8px 10px; text-align: right; font-weight: 800; border: 1px solid #1e3a8a; }
      .data-table td { padding: 8px 10px; border: 1px solid #cbd5e1; color: #334155; font-size: 11px; line-height: 1.5; }
    </style>

    <!-- PAGE 1: Executive Audit Summary & Score Overview -->
    <div class="pdf-page">
      ${renderPageHeader('تقارير التفتيش الميداني', 1, 2)}
      <div class="page-content">

        <!-- Top Score Header Banner -->
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: #ffffff; padding: 22px 28px; border-radius: 12px; margin-bottom: 20px; border-bottom: 6px solid ${badgeBg};">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 11px; color: #93c5fd; font-weight: 700;">تقرير التفتيش والتدقيق الميداني المعتمد</div>
              <h1 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 900; color: #ffffff;">${checklistTitle}</h1>
              <div style="font-size: 11px; color: #cbd5e1; margin-top: 6px;">🕒 تاريخ التفتيش الاصدار: <strong>${todayStr}</strong></div>
            </div>

            <!-- Score Display Box -->
            <div style="background-color: ${badgeBg}; color: #ffffff; padding: 12px 22px; border-radius: 12px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
              <div style="font-size: 10px; font-weight: 700; opacity: 0.95;">مؤشر الامتثال الميداني</div>
              <div style="font-size: 30px; font-weight: 900; line-height: 1; margin: 2px 0;">${scorePercentage}%</div>
              <div style="font-size: 9.5px; font-weight: 800; background-color: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 10px; margin-top: 4px;">${badgeText}</div>
            </div>
          </div>
        </div>

        <!-- Audit Metrics Breakdown Cards -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 14px; text-align: center;">
            <div style="font-size: 11px; color: #065f46; font-weight: 700;">البنود المحققة (Pass)</div>
            <div style="font-size: 22px; font-weight: 900; color: #047857;">${compliantCount}</div>
          </div>
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 14px; text-align: center;">
            <div style="font-size: 11px; color: #991b1b; font-weight: 700;">البنود غير المحققة (Fail)</div>
            <div style="font-size: 22px; font-weight: 900; color: #dc2626;">${totalItems - compliantCount}</div>
          </div>
          <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; text-align: center;">
            <div style="font-size: 11px; color: #1e40af; font-weight: 700;">إجمالي بنود التفتيش</div>
            <div style="font-size: 22px; font-weight: 900; color: #1e3a8a;">${totalItems}</div>
          </div>
        </div>

        <!-- Section Title: Detailed Item Evaluation -->
        <div class="section-title">
          <span>نتائج التقييم الميداني للبنود التفصيلية</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
          ${items.map((item, idx) => {
            const isPass = item.isCompliant === true;
            const isFail = item.isCompliant === false;
            const statusBg = isPass ? '#ecfdf5' : isFail ? '#fef2f2' : '#f1f5f9';
            const statusBorder = isPass ? '#a7f3d0' : isFail ? '#fecaca' : '#cbd5e1';
            const statusText = isPass ? '✅ مطبق / Pass' : isFail ? '❌ غير مطبق / Fail' : '⚪ غير محدد';
            const textColor = isPass ? '#065f46' : isFail ? '#991b1b' : '#475569';

            return `
              <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                  <span style="font-weight: 800; font-size: 11px; color: #1e3a8a; background-color: #eff6ff; padding: 2px 8px; border-radius: 6px;">
                    بند #${idx + 1}
                  </span>
                  <span style="font-size: 11.5px; font-weight: 700; color: #0f172a; line-height: 1.4;">
                    ${item.questionAr}
                  </span>
                </div>
                <div style="background-color: ${statusBg}; border: 1px solid ${statusBorder}; color: ${textColor}; padding: 4px 12px; border-radius: 16px; font-size: 10.5px; font-weight: 800; shrink: 0; margin-right: 12px;">
                  ${statusText}
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
      ${renderPageFooter(1, 2)}
    </div>

    <!-- PAGE 2: Corrective Action Plan & Official Sign-off -->
    <div class="pdf-page">
      ${renderPageHeader('خطط التصحيح والاعتماد الرسمية', 2, 2)}
      <div class="page-content">

        <div class="section-title">
          <span>خطة الإجراءات التصحيحية الواجبة والتوقيتات التنفيذية</span>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>البند المحتاج للتصحيح</th>
              <th>الإجراء التصحيحي الواجب</th>
              <th>المهلة المحددة</th>
              <th>الجهة المسؤولة</th>
            </tr>
          </thead>
          <tbody>
            ${items.filter(i => i.isCompliant !== true).length > 0 ? items.filter(i => i.isCompliant !== true).map((item) => `
              <tr>
                <td><strong>${item.questionAr}</strong></td>
                <td>تصحيح الوضع فوراً، توفير معدات الوقاية والرفع لمدير السلامة</td>
                <td>خلال 24 إلى 48 ساعة</td>
                <td>مشرف سلامة الموقع + المهندس المقيم</td>
              </tr>
            `).join('') : `
              <tr>
                <td colspan="4" style="text-align: center; color: #059669; font-weight: 800; padding: 14px;">
                  🎉 جميع بنود التفتيش مطبقة ومستوفية للشروط بالكامل! لا توجد إجراءات تصحيحية مطلوبة.
                </td>
              </tr>
            `}
          </tbody>
        </table>

        <div class="section-title">
          <span>توقيعات واعتماد هيئة التفتيش والسلامة المهنية</span>
        </div>

        <!-- Official Signatures Block -->
        <div style="border: 2px solid #cbd5e1; border-radius: 12px; padding: 22px; background-color: #f8fafc; margin-top: 20px;">
          <div style="font-size: 13px; font-weight: 900; color: #1e3a8a; margin-bottom: 16px;">
            توقيع واعتماد مفتش السلامة والصحة المهنية المعتمد:
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 11px; color: #334155;">
            <div>
              <div style="margin-bottom: 12px;">اسم المفتش / المهندس: ...........................................</div>
              <div style="margin-bottom: 12px;">رقم الهوية / الترخيص: ...........................................</div>
              <div>التوقيع: ...........................................................</div>
            </div>

            <div>
              <div style="margin-bottom: 12px;">اسم مدير الموقع / صاحب العمل: .........................</div>
              <div style="margin-bottom: 12px;">حالة الاعتماد: <span style="color: #059669; font-weight: 800;">معتمد للتنفيذ والمتابعة</span></div>
              <div>الختم الرسمي للمنشأة: ............................................</div>
            </div>
          </div>
        </div>

      </div>
      ${renderPageFooter(2, 2)}
    </div>
  `;

  document.body.appendChild(container);

  try {
    await new Promise((res) => setTimeout(res, 300));

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 5) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const cleanTitle = checklistTitle.replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '_').substring(0, 30);
    pdf.save(`تقرير_تفتيش_وقاية_الشامل_${cleanTitle}.pdf`);
  } catch (error) {
    console.error('Error generating Checklist PDF report:', error);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
