export interface PersonalInfo {
  fullName: string;
  age: number;
  phone: string;
  email: string;
  location: string;
  roles: string[];
  headline: string;
  introduction: string;
  resumeUrl: string;
  profileImage: string;
}

export interface SocialLink {
  name: "GitHub" | "LinkedIn" | "Facebook" | "Instagram" | "TikTok" | "Email" | "YouTube";
  url: string;
  icon: string;
}

export interface AboutStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface AboutContent {
  paragraphs: string[];
  stats: AboutStat[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  status: string;
  honor?: string;
  description: string;
  illustration: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  address: string;
  period: string;
  current: boolean;
  points: string[];
  systems?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface WorkflowGroup {
  id: string;
  title: string;
  tools: string[];
  description: string;
}

export type ProjectStatus = "Completed" | "In Progress" | "Maintained";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  status: ProjectStatus;
  category: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  achievementUrl: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  siteUrl: string;
  ogImage: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
