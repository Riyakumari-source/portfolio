import {
  FaJava,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaNetworkWired,
  FaMicrochip,
  FaCode,
  FaTerminal,
  FaShieldAlt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiPostman,
  SiVercel,
  SiRender,
  SiC,
  SiCplusplus,
  SiPython,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { SkillItem, SkillCategoryData } from "../types/skill";

export const skillsCategorizedData: Record<string, SkillItem[]> = {
  Languages: [
    { name: "Java", level: 80, icon: FaJava, color: "#f89820" },
    { name: "JavaScript", level: 90, icon: FaJs, color: "#f7df1e" },
    { name: "TypeScript", level: 85, icon: SiTypescript, color: "#3178c6" },
    { name: "C", level: 75, icon: SiC, color: "#a8b9cc" },
    { name: "C++", level: 75, icon: SiCplusplus, color: "#00599c" },
    { name: "Python", level: 80, icon: SiPython, color: "#3776ab" },
    { name: "SQL", level: 85, icon: FaDatabase, color: "#00758f" },
  ],
  Frontend: [
    { name: "HTML", level: 95, icon: FaHtml5, color: "#e34f26" },
    { name: "CSS", level: 90, icon: FaCss3Alt, color: "#1572b6" },
    { name: "React", level: 90, icon: FaReact, color: "#61dafb" },
    { name: "Tailwind CSS", level: 88, icon: SiTailwindcss, color: "#06b6d4" },
  ],
  Backend: [
    { name: "Node.js", level: 82, icon: FaNodeJs, color: "#339933" },
    { name: "Express.js", level: 80, icon: SiExpress, color: "#808080" },
  ],
  Database: [
    { name: "PostgreSQL", level: 85, icon: SiPostgresql, color: "#4169e1" },
    { name: "MySQL", level: 80, icon: SiMysql, color: "#4479a1" },
    { name: "Prisma ORM", level: 85, icon: SiPrisma, color: "#5a67d8" },
  ],
  Tools: [
    { name: "Git", level: 85, icon: FaGitAlt, color: "#f05032" },
    { name: "GitHub", level: 85, icon: FaGithub, color: "#ffffff" },
    { name: "VS Code", level: 90, icon: VscCode, color: "#007acc" },
    { name: "Postman", level: 85, icon: SiPostman, color: "#ff6c37" },
    { name: "Vercel", level: 80, icon: SiVercel, color: "#ffffff" },
    { name: "Render", level: 75, icon: SiRender, color: "#46e3b7" },
  ],
  "Core Concepts": [
    { name: "Data Structures", level: 80, icon: FaCode, color: "#9b5de5" },
    { name: "Computer Networks", level: 75, icon: FaNetworkWired, color: "#f15bb5" },
    { name: "Operating System", level: 80, icon: FaTerminal, color: "#00bbf9" },
    { name: "Cybersecurity", level: 75, icon: FaShieldAlt, color: "#e63946" },
    { name: "IoT", level: 70, icon: FaMicrochip, color: "#00f5d4" },
  ],
};

export const skillSetData: SkillCategoryData[] = [
  {
    category: "FRONTEND",
    about: "Crafting responsive, interactive, and user-friendly client-side web interfaces using modern frameworks and responsive design practices.",
    skills: ["JavaScript", "TypeScript", "React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "BACKEND",
    about: "Developing robust RESTful APIs, customer and admin dashboards, and designing optimized relational database schemas.",
    skills: ["Node.js", "Express.js", "PostgreSQL", "MySQL", "Prisma ORM", "Java", "Python", "C", "C++", "SQL", "Git", "GitHub", "Postman"],
  }
];
