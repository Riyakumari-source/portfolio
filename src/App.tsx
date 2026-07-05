import { lazy, Suspense, useEffect, useState } from "react";
import { LoadingProvider, useLoading } from "./context/LoadingProvider";
import { setProgress } from "./components/layout/Loader";
import { initializeTextSplits } from "./utils/helpers";
import { useCursor } from "./hooks/useCursor";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

// Layout components
import Navbar from "./components/layout/Navbar";

// UI components
import Avatar from "./components/ui/Avatar";

// Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const TechStack = lazy(() => import("./sections/TechStack"));

const MainLayout = () => {
  const { setLoading } = useLoading();
  const [isDesktopMode, setIsDesktopMode] = useState<boolean>(window.innerWidth > 1024);
  const cursorRef = useCursor();
  
  useScrollAnimation();

  useEffect(() => {
    const loadingTracker = setProgress((value: number) => setLoading(value));
    const avatarImg = new Image();
    avatarImg.src = "/images/girl-coder.png";
    
    const completeProgress = () => {
      loadingTracker.loaded().then(() => {
        setTimeout(() => {
          initializeTextSplits();
        }, 2500);
      });
    };

    avatarImg.onload = completeProgress;
    if (avatarImg.complete) {
      completeProgress();
    }

    const handleResize = () => {
      initializeTextSplits();
      setIsDesktopMode(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setLoading]);

  return (
    <div className="container-main">
      <div className="cursor-main" ref={cursorRef} />

      <Navbar />

      <div className="icons-section">
        <div className="social-icons" data-cursor="icons" id="social">
          <span>
            <a href="https://github.com/Riyakumari-source" target="_blank" rel="noreferrer" data-cursor="disable">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </span>
          <span>
            <a href="https://www.linkedin.com/in/riya-kumari-93937b307" target="_blank" rel="noreferrer" data-cursor="disable">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </span>
        </div>
        <div className="resume-wrapper">
          <a className="resume-button" href="/riya_kumari_resume.pdf" target="_blank" rel="noreferrer" title="View Resume">
            <div className="hover-link" data-cursor="disable">
              <div className="hover-in">
                RESUME
                <div>RESUME</div>
              </div>
            </div>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
          </a>
          <a className="resume-download" href="/riya_kumari_resume.pdf" download="Riya_Kumari_Resume.pdf" data-cursor="disable" title="Download Resume">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      {isDesktopMode && <Avatar />}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Hero>{!isDesktopMode && <Avatar />}</Hero>
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Suspense fallback={<div style={{ padding: "60px", textAlign: "center", color: "#bfaec7" }}>Loading stack visuals...</div>}>
              <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <LoadingProvider>
      <Suspense fallback={null}>
        <MainLayout />
      </Suspense>
    </LoadingProvider>
  );
};

export default App;
