import { SafetySign } from '../types/ohs';

export const SAFETY_SIGNS_DATA: SafetySign[] = [
  // 1. Mandatory Signs (علامات الإلزام - أزرق وأبيض)
  {
    id: 'sign-m1',
    code: 'ISO 7010 - M001',
    titleAr: 'يجب ارتداء خوذة السلامة',
    titleEn: 'Wear Protective Helmet',
    category: 'mandatory',
    categoryAr: 'علامات الإلزام',
    descriptionAr: 'يجب ارتداء خوذة السلامة المعتمدة لحماية الرأس من سقوط الأجسام والأجزاء الصلبة.',
    iconName: 'HardHat',
    colorTheme: {
      bg: 'bg-blue-600',
      text: 'text-white',
      border: 'border-blue-700',
      badge: 'bg-blue-100 text-blue-800'
    }
  },
  {
    id: 'sign-m2',
    code: 'ISO 7010 - M002',
    titleAr: 'يجب ارتداء واقيات الأذن',
    titleEn: 'Wear Ear Protection',
    category: 'mandatory',
    categoryAr: 'علامات الإلزام',
    descriptionAr: 'إجباري في جميع المناطق ذات مستويات الضوضاء المستمرة التي تتجاوز 85 ديسيبل.',
    iconName: 'Headphones',
    colorTheme: {
      bg: 'bg-blue-600',
      text: 'text-white',
      border: 'border-blue-700',
      badge: 'bg-blue-100 text-blue-800'
    }
  },
  {
    id: 'sign-m3',
    code: 'ISO 7010 - M004',
    titleAr: 'يجب ارتداء نظارات حماية العين',
    titleEn: 'Wear Eye Protection',
    category: 'mandatory',
    categoryAr: 'علامات الإلزام',
    descriptionAr: 'حماية العينين أثناء أعمال الشحذ، اللحام، وتقطيع المواد والكيميائيات.',
    iconName: 'Glasses',
    colorTheme: {
      bg: 'bg-blue-600',
      text: 'text-white',
      border: 'border-blue-700',
      badge: 'bg-blue-100 text-blue-800'
    }
  },

  // 2. Warning Signs (علامات التحذير - أصفر وأسود)
  {
    id: 'sign-w1',
    code: 'ISO 7010 - W012',
    titleAr: 'تحذير: خطر كهرباء عالية الجهد',
    titleEn: 'Warning: High Voltage Electricity',
    category: 'warning',
    categoryAr: 'علامات التحذير',
    descriptionAr: 'ينبه لوجود خطورة تماس مع لوحات ومعدات كهربائية ذات جهد عالي.',
    iconName: 'Zap',
    colorTheme: {
      bg: 'bg-amber-500',
      text: 'text-slate-900',
      border: 'border-amber-600',
      badge: 'bg-amber-100 text-amber-900'
    }
  },
  {
    id: 'sign-w2',
    code: 'ISO 7010 - W002',
    titleAr: 'تحذير: مواد قابلة للاشتعال',
    titleEn: 'Warning: Flammable Materials',
    category: 'warning',
    categoryAr: 'علامات التحذير',
    descriptionAr: 'منطقة تحتوي على غازات وسوائل سريعة الاشتعال تتطلب تجنب الشرار والحرارة.',
    iconName: 'Flame',
    colorTheme: {
      bg: 'bg-amber-500',
      text: 'text-slate-900',
      border: 'border-amber-600',
      badge: 'bg-amber-100 text-amber-900'
    }
  },
  {
    id: 'sign-w3',
    code: 'ISO 7010 - W016',
    titleAr: 'تحذير: أسطح زلقة ومخاطر التعثر',
    titleEn: 'Warning: Slippery Surface',
    category: 'warning',
    categoryAr: 'علامات التحذير',
    descriptionAr: 'تحذير من وجود بقع زيوت أو مياه تجعل الأرضية زلقة ومسببة للسقوط.',
    iconName: 'AlertTriangle',
    colorTheme: {
      bg: 'bg-amber-500',
      text: 'text-slate-900',
      border: 'border-amber-600',
      badge: 'bg-amber-100 text-amber-900'
    }
  },

  // 3. Prohibition Signs (علامات الحظر - أحمر وأبيض)
  {
    id: 'sign-p1',
    code: 'ISO 7010 - P002',
    titleAr: 'ممنوع التدخين وإشعال النار',
    titleEn: 'No Smoking / Open Flames',
    category: 'prohibition',
    categoryAr: 'علامات الحظر',
    descriptionAr: 'يُحظر تماماً استخدام الولاعات والتدخين في مستودعات المواد والغازات.',
    iconName: 'Ban',
    colorTheme: {
      bg: 'bg-red-600',
      text: 'text-white',
      border: 'border-red-700',
      badge: 'bg-red-100 text-red-800'
    }
  },
  {
    id: 'sign-p2',
    code: 'ISO 7010 - P006',
    titleAr: 'ممنوع دخول غير المصرح لهم',
    titleEn: 'No Unauthorized Access',
    category: 'prohibition',
    categoryAr: 'علامات الحظر',
    descriptionAr: 'المنطقة مخصصة للكوادر المؤهلة والحاملة لتصاريح العمل فقط.',
    iconName: 'Lock',
    colorTheme: {
      bg: 'bg-red-600',
      text: 'text-white',
      border: 'border-red-700',
      badge: 'bg-red-100 text-red-800'
    }
  },

  // 4. Emergency Signs (علامات الطوارئ - أخضر وأبيض)
  {
    id: 'sign-e1',
    code: 'ISO 7010 - E001',
    titleAr: 'مخرج طوارئ (Emergency Exit)',
    titleEn: 'Emergency Exit Route',
    category: 'emergency',
    categoryAr: 'علامات الطوارئ',
    descriptionAr: 'يشير إلى الاتجاه المباشر لمسالك الخروج الآمنة في حالات الحريق والإخلاء.',
    iconName: 'LogOut',
    colorTheme: {
      bg: 'bg-emerald-600',
      text: 'text-white',
      border: 'border-emerald-700',
      badge: 'bg-emerald-100 text-emerald-800'
    }
  },
  {
    id: 'sign-e2',
    code: 'ISO 7010 - E003',
    titleAr: 'صندوق الإسعافات الأولية',
    titleEn: 'First Aid Kit Station',
    category: 'emergency',
    categoryAr: 'علامات الطوارئ',
    descriptionAr: 'موقع تثبيت حقيبة ومعدات الإسعافات الأولية وتجهيزات الطوارئ.',
    iconName: 'Cross',
    colorTheme: {
      bg: 'bg-emerald-600',
      text: 'text-white',
      border: 'border-emerald-700',
      badge: 'bg-emerald-100 text-emerald-800'
    }
  }
];
