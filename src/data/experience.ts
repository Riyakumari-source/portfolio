export interface CareerHistoryItem {
  year: string;
  title: string;
  institution: string;
  details: string;
  bullets?: string[];
  certificate?: string;
}

export const careerTimelineData: CareerHistoryItem[] = [
  {
    year: "2026",
    title: "Software Developer Intern",
    institution: "Infinity Arthvishva Pvt. Ltd., Shivaji Nagar, Pune",
    details:
      "Contributed directly to company website and customer panel development, gaining hands-on exposure to full-stack implementation.",
    bullets: [
      "Developed 10+ responsive and dynamic web pages using React.js, Tailwind CSS, and JavaScript, ensuring cross-browser compatibility and responsive design.",
      "Developed a Customer Dashboard and implemented backend functionality for five dashboard modules using Node.js, Express.js, and PostgreSQL.",
      "Developed and maintained the Admin Panel, enabling administrators to upload CSV files, manage product information, and update product details efficiently.",
      "Integrated RESTful APIs between frontend and backend to enable seamless data retrieval, storage, and real-time updates.",
      "Developed financial product modules including Bonds, Life Insurance, Fire Insurance, Personal Loan, and NCD with responsive and user-friendly interfaces.",
    ],
    certificate: "/internship_certificate.pdf",
  },
  {
    year: "2026",
    title: "Master of Computer Applications (MCA)",
    institution: "ATSS IICMR (SPPU affiliated), Pune, Maharashtra",
    details:
      "Acquiring theoretical foundations in software engineering, database systems, and algorithms. Graduating class of 2026.",
  },
  {
    year: "2023",
    title: "BCA (Bachelor of Computer Applications)",
    institution: "DS College, Purnea University, Purnea, Bihar",
    details:
      "Completed BCA with 83.5%, building academic databases and desktop utilities.",
  },
  {
    year: "2019",
    title: "12th Grade (HSC - PCM)",
    institution: "SBP Vidya Vihar, Katihar, Bihar",
    details:
      "Completed high school studies focusing on Physics, Chemistry, and Mathematics (65.5%).",
  },
  {
    year: "2017",
    title: "10th Grade (SSC)",
    institution: "Scottish Public School, Katihar, Bihar",
    details: "Completed secondary schooling with 79.9% marks.",
  },
];
