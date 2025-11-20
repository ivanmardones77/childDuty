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
}