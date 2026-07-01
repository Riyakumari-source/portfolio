import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  MapPin,
  Sparkles,
  Mail,
  Phone,
  ExternalLink,
  FileText,
  Award,
  ArrowUp,
  Menu,
  X,
  Moon,
  Sun,
  Code2,
  Server,
  Database,
  Workflow,
  Heart,
  CheckCircle2
} from 'lucide-react';
import riyaPhoto from './assets/riya.jpg';

// Human-designed inline SVGs for GitHub and LinkedIn matching the design style
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// High-performance Scroll Reveal component supporting dynamic directions
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

function Reveal({ children, delay = 0, direction = 'up' }: RevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getDirectionClass = () => {
    if (visible) return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    switch (direction) {
      case 'left':
        return 'opacity-0 -translate-x-12 scale-99';
      case 'right':
        return 'opacity-0 translate-x-12 scale-99';
      case 'down':
        return 'opacity-0 -translate-y-12 scale-99';
      case 'up':
      default:
        return 'opacity-0 translate-y-12 scale-99';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${getDirectionClass()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Custom typing animation hook for interactive hero text
function useTypewriter(words: string[], speed: number = 80, delay: number = 1500) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return currentText;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const typingRole = useTypewriter([
    'Aspiring Full Stack Developer',
    'MERN Stack Engineer',
    'Software Developer Intern',
    'Database Queries Builder'
  ], 80, 2000);

  // Sync darkMode state with standard document dark class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Three featured projects in chronological order of importance (WorkTrack Pro, Instagram Clone, Hotel Management System)
  const projects = [
    {
      id: 1,
      title: 'WorkTrack Pro',
      date: 'May 2026 – Present (Ongoing)',
      description: 'Workforce Monitoring & Productivity Platform designed to streamline remote employee management and track activity metrics.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'JWT'],
      features: [
        'Secure role-based user authentication & JWT routing (bcrypt)',
        'Attendance, shift, and break tracking logs',
        'Automated screenshot captures and location tracking modules',
        'Centralized workforce management via interactive admin dashboards'
      ],
      github: 'https://github.com/Riyakumari-source/worktrack-pro'
    },
    {
      id: 2,
      title: 'Instagram Clone (Full Stack)',
      date: 'January 2025 – June 2025',
      description: 'A full-stack social media application inspired by Instagram, utilizing a modern client-server architecture with secure API endpoints.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Socket.IO'],
      features: [
        'Secure JWT user authentication & password encryption (bcrypt)',
        'Real-time one-to-one chats with instant seen status via Socket.IO',
        'Dynamic user feeds, story uploads with automated 24h expiration',
        'Private profiles, follow requests, likes, comments, and post saves',
        'Optimized relational database design mapped using Prisma ORM'
      ],
      github: 'https://github.com/Riyakumari-source/instagram-clone-fullstack'
    },
    {
      id: 3,
      title: 'Hotel Management System',
      date: 'Jan 2023 - March 2023',
      description: 'A desktop-based management application for rooms, bookings, reservations, check-in/out, customer profiles, and billing cycles.',
      tech: ['Java', 'Swing', 'JDBC', 'MySQL', 'NetBeans'],
      features: [
        'Desktop GUI room booking, check-in, and check-out logs',
        'Customer registrations, automated billing, and payment processing',
        'Relational MySQL database managing secure payment & booking structures',
        'Robust database CRUD operations integrated using Java JDBC interfaces'
      ]
    }
  ];

  const skills = {
    Languages: ['Java', 'JavaScript', 'TypeScript', 'C', 'SQL'],
    Frontend: ['HTML', 'CSS', 'React', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express'],
    Database: ['PostgreSQL', 'MySQL', 'Prisma ORM'],
    Tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render'],
    'Core Concepts': ['Data Structures & Algorithms (Basic)', 'Computer Networks', 'Cloud Computing', 'Internet of Things (IoT)']
  };

  interface TimelineItem {
    year: string;
    title: string;
    institution: string;
    details: string;
    bullets?: string[];
    certificate?: string;
  }

  const timeline: TimelineItem[] = [
    {
      year: '2026',
      title: 'Software Developer Intern',
      institution: 'Infinity Arthvishva Pvt. Ltd., Shivaji Nagar, Pune',
      details: 'Contributed directly to company website and customer panel development, gaining hands-on exposure to full-stack implementation.',
      bullets: [
        'Developed 10+ responsive and dynamic web pages using React.js, Tailwind CSS, and JavaScript, ensuring cross-browser compatibility and responsive design.',
        'Developed a Customer Dashboard and implemented backend functionality for five dashboard modules using Node.js, Express.js, and PostgreSQL.',
        'Developed and maintained the Admin Panel, enabling administrators to upload CSV files, manage product information, and update product details efficiently.',
        'Integrated RESTful APIs between frontend and backend to enable seamless data retrieval, storage, and real-time updates.',
        'Developed financial product modules including Bonds, Life Insurance, Fire Insurance, Personal Loan, and NCD with responsive and user-friendly interfaces.'
      ],
      certificate: '/internship_certificate.pdf'
    },
    {
      year: 'Current',
      title: 'Master of Computer Applications (MCA)',
      institution: 'ATSS IICMR (SPPU affiliated), Pune, Maharashtra',
      details: 'Acquiring theoretical foundations in software engineering, database systems, and algorithms. Graduating class of 2026.'
    },
    {
      year: '2023',
      title: 'BCA (Bachelor of Computer Applications)',
      institution: 'DS College, Purnea University, Purnea, Bihar',
      details: 'Completed BCA with 83.5%, building academic databases and desktop utilities.'
    },
    {
      year: '2019',
      title: '12th Grade (HSC - PCM)',
      institution: 'SBP Vidya Vihar, Katihar, Bihar',
      details: 'Completed high school studies focusing on Physics, Chemistry, and Mathematics (65.5%).'
    },
    {
      year: '2017',
      title: '10th Grade (SSC)',
      institution: 'Scottish Public School, Katihar, Bihar',
      details: 'Completed secondary schooling with 79.9% marks.'
    }
  ];

  const services = [
    { title: 'Responsive Frontend Development', desc: 'Crafting responsive React applications utilizing modern CSS styling frameworks.' },
    { title: 'Full Stack Integration', desc: 'Connecting stateful database APIs with secure client-side user interfaces.' },
    { title: 'Database Relations & Schemas', desc: 'Designing optimized relational PostgreSQL structures and querying patterns.' },
    { title: 'API Testing & Verification', desc: 'Testing, validating, and debugging backend REST endpoints using Postman.' }
  ];

  const certifications = [
    {
      title: 'Celonis Foundations',
      issuer: 'Celonis Academy',
      year: '2025',
      link: 'https://www.credly.com/badges/6f01e5ad-f176-4c44-9ff7-e5bd3b7debe8'
    },
    {
      title: 'Introduction to MongoDB (For Students)',
      issuer: 'MongoDB, Inc.',
      year: '2025',
      link: '',
      certId: 'MDByvvkpxdzzt'
    },
    {
      title: 'Java Tutorial for Complete Beginners',
      issuer: 'Udemy',
      year: '2025',
      link: 'https://www.udemy.com/certificate/UC-fbd1c5f2-b6d9-4970-8505-432ab1aaefb2/',
      certId: 'UC-fbd1c5f2-b6d9-4970-8505-432ab1aaefb2'
    },
    {
      title: 'Introduction to Internet of Things (Elite)',
      issuer: 'NPTEL — IIT Kharagpur',
      year: '2025',
      link: '',
      certId: 'NPTEL25CS147S1066904512'
    },
    {
      title: 'Cloud Computing',
      issuer: 'NPTEL — IIT Kharagpur',
      year: '2025',
      link: '',
      certId: 'NPTEL25CS107S366903494'
    }
  ];

  return (
    <div className="min-h-screen relative font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">

      {/* Sleek Gradient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Main Wrapper */}
      <div className="relative z-10">

        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <a
              href="#"
              className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 font-display"
            >
              Riya Kumari
            </a>

            {/* Desktop Navbar Menu */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
              <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projects</a>
              <a href="#journey" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Journey</a>
              <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                title="Toggle Mode"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>

              {/* Resume Button */}
              <button
                onClick={() => setShowResumeModal(true)}
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-slate-950 transition-all shadow-sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Resume
              </button>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          {menuOpen && (
            <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 absolute w-full left-0 py-4 px-6 flex flex-col space-y-4 shadow-xl">
              <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
              <a href="#skills" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Skills</a>
              <a href="#projects" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projects</a>
              <a href="#journey" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Journey</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
              <button
                onClick={() => { setMenuOpen(false); setShowResumeModal(true); }}
                className="w-full justify-center flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-indigo-600 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </button>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 md:pt-28 md:pb-36">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">

            {/* Text details */}
            <div className="flex-1 space-y-6 text-left animate-slide-up">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-600/20 bg-indigo-600/5 text-indigo-600 dark:text-indigo-400 font-medium text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MCA Student & Intern • Open to Work 💼</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none font-display">
                Riya Kumari
              </h1>

              <h2 className="text-xl sm:text-2xl text-indigo-650 dark:text-indigo-400 font-semibold tracking-wide min-h-[32px]">
                {typingRole}
                <span className="animate-pulse ml-0.5 font-light">|</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                An MCA student and former Software Developer Intern with hands-on experience building clean, responsive user interfaces and robust relational database endpoints using React, Node.js, and PostgreSQL.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
                >
                  View Projects
                </a>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Resume Preview</span>
                </button>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* Profile Image - Centered on mobile, aligned on desktop */}
            <div className="flex-shrink-0 relative animate-slide-up animation-delay-200 mx-auto md:mx-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl rotate-3 scale-102 opacity-25 animate-pulse-slow" />
              <div className="relative w-64 sm:w-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
                <img
                  src={riyaPhoto}
                  alt="Riya Kumari original profile picture"
                  className="w-full h-auto block"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Section: About Me */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-slate-200 dark:border-slate-800">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

              {/* Heading text column */}
              <div className="md:col-span-4 text-left">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 font-display">
                  About Me
                </h2>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                  My Background
                </p>
              </div>

              {/* Detailed Description */}
              <div className="md:col-span-8 space-y-6 text-left text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                <p>
                  I am an aspiring Full Stack Developer pursuing my Master of Computer Applications (MCA) at ATSS IICMR, Pune (SPPU affiliated), graduating in 2026. My passion lies in constructing optimized backend systems, writing clean queries, and developing interactive user interfaces.
                </p>
                <p>
                  Recently, I completed a 6-month Software Developer Internship at Infinity Arthvishva Pvt. Ltd. in Pune, where I designed customer dashboards, built admin control systems, and integrated RESTful APIs with PostgreSQL. I am now actively looking for full-time Junior Software Developer or Associate Full Stack Developer opportunities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Location</h4>
                      <p className="text-xs text-slate-500 font-medium">Katihar, Bihar (Open to Relocate)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <GraduationCap className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Education</h4>
                      <p className="text-xs text-slate-500">MCA Batch 2026 / BCA Graduate 2023</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </section>

        {/* Section: Skills */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

            {/* Title column */}
            <div className="md:col-span-4 text-left">
              <Reveal>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 font-display">
                  Skills & Tools
                </h2>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                  My tech stack
                </p>
              </Reveal>
            </div>

            {/* List column */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              {Object.entries(skills).map(([category, items], catIdx) => (
                <Reveal key={category} delay={catIdx * 75}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                      {category === 'Languages' && <Code2 className="w-4.5 h-4.5 text-indigo-500" />}
                      {category === 'Frontend' && <Code2 className="w-4.5 h-4.5 text-indigo-500" />}
                      {category === 'Backend' && <Server className="w-4.5 h-4.5 text-emerald-500" />}
                      {category === 'Database' && <Database className="w-4.5 h-4.5 text-indigo-500" />}
                      {category === 'Tools' && <Workflow className="w-4.5 h-4.5 text-amber-500" />}
                      {category === 'Core Concepts' && <Workflow className="w-4.5 h-4.5 text-amber-500" />}
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white tracking-wide uppercase">{category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-855 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium hover:-translate-y-0.5 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-[0_4px_12px_rgba(99,102,241,0.08)] transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* Section: Featured Projects */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-slate-200 dark:border-slate-800">
          <div className="text-left mb-12">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 font-display">
                Projects
              </h2>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                Recent applications I developed
              </p>
            </Reveal>
          </div>

          {/* Clean Responsive Project Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, pIdx) => (
              <Reveal
                key={p.id}
                delay={pIdx * 150}
                direction={pIdx === 0 ? 'left' : pIdx === 2 ? 'right' : 'up'}
              >
                <article className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-[0_12px_30px_rgba(99,102,241,0.12)] transition-all duration-350 text-left overflow-hidden h-full">
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {p.title}
                        </h3>
                        <Code2 className="w-4.5 h-4.5 text-slate-400 group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      {p.date && (
                        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{p.date}</p>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Key Features:</span>
                      <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                        {p.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-auto">
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md border border-transparent hover:border-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-default">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center justify-start text-xs font-bold pt-1">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            <GithubIcon className="w-4 h-4 mr-1.5" />
                            Code Repository
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Section: Timeline Journey */}
        <section id="journey" className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

            {/* Title column */}
            <div className="md:col-span-4 text-left">
              <Reveal>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 font-display">
                  Professional & Academic Path
                </h2>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                  My timeline
                </p>
              </Reveal>
            </div>

            {/* Timeline details */}
            <div className="md:col-span-8 relative border-l border-slate-200 dark:border-slate-800 pl-6 text-left space-y-10">
              {timeline.map((item, idx) => (
                <Reveal key={idx} delay={idx * 50}>
                  <div className="relative group pl-2 pb-2">
                    {/* Bullet with custom hover scale & active pulsing indicator for current activities */}
                    <div className="absolute -left-[33px] top-[22px] w-4.5 h-4.5 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center z-10 group-hover:border-indigo-500 group-hover:scale-115 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-655 group-hover:bg-indigo-500 group-hover:scale-125 transition-all duration-300" />
                      {(idx === 0 || idx === 1) && (
                        <div className="absolute inset-0 rounded-full border border-indigo-500 animate-ping opacity-75 pointer-events-none" />
                      )}
                    </div>

                    {/* Glassmorphic timeline card layout */}
                    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:border-indigo-500/50 hover:shadow-[0_8px_24px_rgba(99,102,241,0.06)] group-hover:translate-x-2 transition-all duration-300 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border border-indigo-200/20">
                          {item.year}
                        </span>
                        <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {item.institution}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      {item.details && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {item.details}
                        </p>
                      )}
                      {item.bullets && (
                        <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 pt-1.5 list-disc pl-4 leading-relaxed">
                          {item.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      )}
                      {item.certificate && (
                        <div className="pt-2.5">
                          <a
                            href={item.certificate}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            <FileText className="w-3.5 h-3.5 mr-1.5" />
                            View Internship Certificate
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* Section: Certifications & Capabilities */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Certifications column */}
            <Reveal>
              <div className="text-left space-y-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-750 transition-all duration-300 h-full">
                <h3 className="text-xl font-bold font-display border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-indigo-500" />
                  <span>Certifications</span>
                </h3>
                <div className="space-y-4 pt-2">
                  {certifications.map((c, idx) => (
                    <div key={idx} className="flex items-start space-x-3 group/item">
                      <Award className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">{c.title}</h4>
                        <p className="text-xs text-slate-500">{c.issuer} — {c.year}</p>
                        {c.link && c.link !== '#' && (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-0.5"
                          >
                            Verify Credential
                            <ExternalLink className="w-2.5 h-2.5 ml-1" />
                          </a>
                        )}
                        {c.certId && (
                          <p className="text-[10px] font-mono text-slate-400">
                            Credential ID: {c.certId}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Capabilities Column */}
            <Reveal delay={100}>
              <div className="text-left space-y-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-750 transition-all duration-300 h-full">
                <h3 className="text-xl font-bold font-display border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Capabilities</span>
                </h3>
                <div className="space-y-4 pt-2">
                  {services.map((s, idx) => (
                    <div key={idx} className="flex items-start space-x-3 group/item">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">{s.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* Section: Contact */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-16 md:py-24 border-t border-slate-200 dark:border-slate-800">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 font-display">
                  Let's Connect
                </h2>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-4">
                  Get in touch
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  I am currently seeking software development and full stack developer roles. Feel free to contact me for opportunities, internships, or questions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
                <a
                  href="mailto:riakri0207@gmail.com"
                  className="flex items-center justify-center space-x-3 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm w-full sm:w-auto"
                >
                  <Mail className="w-4.5 h-4.5 text-indigo-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">riakri0207@gmail.com</span>
                </a>

                <a
                  href="tel:+918825157131"
                  className="flex items-center justify-center space-x-3 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm w-full sm:w-auto"
                >
                  <Phone className="w-4.5 h-4.5 text-indigo-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">+91 88251 57131</span>
                </a>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4.5 h-4.5 text-indigo-500" />
                <span className="font-semibold text-slate-900 dark:text-white">Katihar, Bihar, India (Open to Relocate)</span>
              </div>

              {/* Social links */}
              <div className="flex justify-center space-x-4 pt-2">
                <a
                  href="https://github.com/Riyakumari-source"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all bg-white dark:bg-slate-900 shadow-sm"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/riya-kumari-93937b307/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all bg-white dark:bg-slate-900 shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p>© {new Date().getFullYear()} Riya Kumari. All rights reserved.</p>
            <p className="flex items-center justify-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>using React & Tailwind CSS</span>
            </p>
          </div>
        </footer>

        {/* Back to Top Button */}
        <a
          href="#"
          className="fixed bottom-6 right-6 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 shadow-md hover:-translate-y-0.5 transition-all z-40"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </a>

        {/* Resume Preview Modal */}
        {showResumeModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-slate-850">

              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-855">
                <span className="font-bold text-slate-900 dark:text-white text-base">Curriculum Vitae</span>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Resume Body */}
              <div className="p-6 space-y-6 text-left max-h-[65svh] overflow-y-auto">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Riya Kumari</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Aspiring Full Stack Developer</p>
                  </div>
                  <div className="text-xs text-slate-500 mt-2 sm:mt-0 leading-relaxed font-mono">
                    <p>riakri0207@gmail.com</p>
                    <p>Katihar, Bihar (Open to Relocate)</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2.5">Internship Experience</h4>
                    <div className="border-l-2 border-indigo-500 pl-3 space-y-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Software Developer Intern</p>
                      <p className="text-xs text-slate-500">Infinity Arthvishva Company | Jan 2026 - June 2026</p>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        Assisting developer workflows, constructing frontend layouts with React, building Node.js endpoints, and optimizing SQL schema structures.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2.5">Education</h4>
                    <div className="space-y-3.5 border-l-2 border-indigo-500 pl-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Master of Computer Applications (MCA)</p>
                        <p className="text-xs text-slate-500">ATSS IICMR (SPPU affiliated) | Graduating 2026</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Bachelor of Computer Applications (BCA)</p>
                        <p className="text-xs text-slate-500">DS College, Purnea University | Completed 2023 (83.5%)</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Git'].map(s => (
                        <span key={s} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-medium rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 p-3 rounded-lg text-indigo-700 dark:text-indigo-400 text-xs">
                  <strong>Official Resume:</strong> You can download the verified PDF version directly using the button below.
                </div>
              </div>

              {/* Modal footer */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-150 dark:border-slate-850 flex items-center justify-between">
                <span className="text-xs text-slate-400">PDF Document Preview</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowResumeModal(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    Close
                  </button>
                  <a
                    href="/riya_kumari_resume.pdf"
                    download="Riya_Kumari_Resume.pdf"
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    Download CV
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
