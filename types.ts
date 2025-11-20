import { LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface GameModule {
  id: string;
  title: string;
  description: string;
  mechanic: string;
  educationalGoal: string;
  imageUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ConflictStat {
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface UserProfile {
  nickname: string;
  age: string;
  division: string;
  avatar: string | null;
  xp: number;
  completedLessonIds: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index 0-2
}

export interface LessonSlide {
  title: string;
  content: string;
  image?: string;
}

export interface Lesson {
  id: string;
  title: string;
  year: string;
  summary: string;
  slides: LessonSlide[];
  quiz: QuizQuestion[];
  xpReward: number;
  imageUrl: string;
  tags: string[];
}