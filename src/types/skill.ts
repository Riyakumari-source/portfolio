import { IconType } from "react-icons";

export interface SkillItem {
  name: string;
  level: number;
  icon: IconType;
  color: string;
}

export interface SkillCategoryData {
  category: string;
  about: string;
  skills: string[];
}
