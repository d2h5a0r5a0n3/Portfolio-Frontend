import { SkillLog } from "./skill-log";

export interface Skill {
    id?: string;
    order?: number;
    name: string;
    skillCategory: string;
    proficiency: string;
    description?: string;
    icon?: string;
    iconUrl?: string;
    logs?: SkillLog[];
  }