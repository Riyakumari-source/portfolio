import { Project } from "../types/project";

export const showcaseProjectsList: (Project & { num: string; date: string; color: string })[] = [
  {
    num: "01",
    title: "WorkTrack Pro",
    date: "May 2026 – Present",
    color: "#7c3aed",
    category: "Full Stack",
    description:
      "Workforce Monitoring & Productivity Platform designed to streamline remote employee management and track activity metrics.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "JWT"],
    features: [
      "Secure role-based user authentication & JWT routing (bcrypt)",
      "Attendance, shift, and break tracking logs",
      "Automated screenshot captures and location tracking modules",
      "Centralized workforce management via interactive admin dashboards",
    ],
    githubUrl: "https://github.com/Riyakumari-source/worktrack-pro",
    image: "/images/worktrack-pro.png",
  },
  {
    num: "02",
    title: "Instagram Clone",
    date: "January 2025 – June 2025",
    color: "#db2777",
    category: "Full Stack",
    description:
      "A full-stack social media application inspired by Instagram, featuring real-time messaging and a modern client-server architecture.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma ORM", "Socket.IO"],
    features: [
      "Secure JWT user authentication & password encryption (bcrypt)",
      "Real-time one-to-one chats with instant seen status via Socket.IO",
      "Dynamic user feeds, story uploads with automated 24h expiration",
      "Private profiles, follow requests, likes, comments, and post saves",
    ],
    githubUrl: "https://github.com/Riyakumari-source/instagram-clone-fullstack",
    image: "/images/instagram-clone.png",
  },
  {
    num: "03",
    title: "Hotel Management System",
    date: "Jan 2023 – March 2023",
    color: "#059669",
    category: "Desktop Application",
    description:
      "A desktop-based management application for rooms, bookings, reservations, check-in/out, customer profiles, and billing cycles.",
    techStack: ["Java", "Swing", "JDBC", "MySQL", "NetBeans"],
    features: [
      "Desktop GUI room booking, check-in, and check-out logs",
      "Customer registrations, automated billing, and payment processing",
      "Relational MySQL database managing secure payment & booking structures",
      "Robust database CRUD operations integrated using Java JDBC interfaces",
    ],
    image: "/images/hotel-management.png",
  },
];
