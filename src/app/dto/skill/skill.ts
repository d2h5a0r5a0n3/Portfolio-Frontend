import { SkillLog } from "./skill-log";

export interface Skill {
    id?: number;
    name: string;
    skillCategory: string;
    proficiency: string;
    description?: string;
    iconUrl?: string;
    logs?: SkillLog[];
  }