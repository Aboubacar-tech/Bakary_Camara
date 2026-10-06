export type Language = 'fr' | 'en' | 'bm';

export interface Project {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  category: 'architecture' | 'iac' | 'serverless' | 'containers';
  role: Record<Language, string>;
  summary: Record<Language, string>;
  metrics: { label: Record<Language, string>; value: string }[];
  stack: string[];
  githubUrl: string;
  architectureDetails: {
    problem: Record<Language, string>;
    solution: Record<Language, string>;
    components: { name: string; role: Record<Language, string>; icon: string }[];
    results: Record<Language, string>[];
    iacSnippet?: string;
  };
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: Record<Language, string>;
  credentialId?: string;
  status: Record<Language, string>;
  description: Record<Language, string>;
  skills: string[];
  link?: string;
  badgeType: 'aws-saa' | 'aws-cp' | 'coursera' | 'orange' | 'google';
}

export interface SkillItem {
  name: string;
  level: Record<Language, string>;
  category: 'cloud' | 'iac' | 'devops' | 'network' | 'dev';
  details: Record<Language, string>;
  highlight?: boolean;
}

export interface CloudMetric {
  id: string;
  name: Record<Language, string>;
  unit: string;
  currentValue: number;
  history: number[];
  status: 'healthy' | 'warning' | 'critical';
  threshold: number;
  category: 'compute' | 'database' | 'network' | 'cost';
}

export interface PushNotificationItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
  service: string;
}

export interface Endorsement {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  date: string;
  comment: Record<Language, string>;
  rating: number;
  verified: boolean;
}
