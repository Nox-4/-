export type HazardCategory = 'physical' | 'chemical' | 'electrical' | 'mechanical' | 'ergonomic' | 'biological';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface HierarchyOfControls {
  elimination: string;
  substitution: string;
  engineering: string;
  administrative: string;
  ppe: string;
}

export interface PPERequirement {
  name: string;
  icon: string; // lucide icon identifier
  mandatory: boolean;
}

export interface HazardCard {
  id: string;
  category: HazardCategory;
  categoryNameAr: string;
  nameAr: string;
  nameEn: string;
  iconName: string;
  severity: SeverityLevel;
  shortDescription: string;
  fullDescription: string;
  potentialImpact: string[];
  oshEngineerGuidelines: string[];
  hierarchyOfControls: HierarchyOfControls;
  requiredPPE: PPERequirement[];
  regulatoryReference: string;
  riskReductionStat: string; // e.g. "تقليل المخاطر بنسبة 85%"
}

export interface SafetyGuidelinePDF {
  id: string;
  titleAr: string;
  category: string;
  fileSize: string;
  pagesCount: number;
  description: string;
  downloadFilename: string;
  keyTopics: string[];
  codeRef: string;
}

export interface ChecklistItem {
  id: string;
  questionAr: string;
  category: string;
  hint: string;
  isCompliant?: boolean | null;
}

export interface ChecklistGroup {
  id: string;
  titleAr: string;
  descriptionAr: string;
  iconName: string;
  items: ChecklistItem[];
}

export interface PracticalStep {
  stepNumber: number;
  titleAr: string;
  descriptionAr: string;
  safetyNoteAr?: string;
  iconName?: string;
}

export interface PracticalGuide {
  id: string;
  titleAr: string;
  subtitleAr: string;
  category: string;
  estimatedTime: string;
  iconName: string;
  steps: PracticalStep[];
}

export interface BlogArticle {
  id: string;
  titleAr: string;
  excerptAr: string;
  contentAr: string;
  category: 'اخبار' | 'دراسة حالة' | 'تشريعات' | 'توجيهات فنية';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  isCaseStudy?: boolean;
}

export type SignCategory = 'mandatory' | 'warning' | 'prohibition' | 'emergency';

export interface SafetySign {
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  category: SignCategory;
  categoryAr: string;
  descriptionAr: string;
  iconName: string;
  colorTheme: {
    bg: string;
    text: string;
    border: string;
    badge: string;
  };
}

export interface ConsultationRequest {
  companyName: string;
  industrySector: string;
  riskLevel: 'أكثر خطورة' | 'أقل خطورة';
  employeeCount: string;
  serviceType: string;
  contactName: string;
  phone: string;
  email: string;
  notes?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
