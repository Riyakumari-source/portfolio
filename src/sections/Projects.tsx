import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { showcaseProjectsList } from "../data/projects";
import { runProjectSlideTransition } from "../animations/projectAnimation";

const AUTO_SLIDE_DURATION = 2000;

export const Projects = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const autoSlideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseHoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectInfoRef = useRef<HTMLDivElement>(null);
  const projectImgRef = useRef<HTMLDivElement>(null);
  const animationActiveFlag = useRef(false);
  const showcaseSectionRef = useRef<HTMLDivElement>(null);

  const triggerEntranceAnimation = useCallback((slideDirection: "next" | "prev") => {
    if (!projectInfoRef.current || !projectImgRef.current) return;
    const initialXOffset = slideDirection === "next" ? 70 : -70;

    // Call project slide animations
    runProjectSlideTransition(projectImgRef.current, projectInfoRef.current, slideDirection);

    // Number indicator slide
    gsap.fromTo(
      projectInfoRef.current.querySelectorAll(".work-num, .work-title, .work-date, .work-accent"),
      { opacity: 0, x: initialXOffset },
      { opacity: 1, x: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" }
    );

    // Summary text
    gsap.fromTo(
      projectInfoRef.current.querySelectorAll(".work-desc"),
      { opacity: 0, y: 20, skewX: -4, filter: "blur(6px)" },
      { opacity: 1, y: 0, skewX: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out", delay: 0.18 }
    );

    // Feature bullet points
    gsap.fromTo(
      projectInfoRef.current.querySelectorAll(".work-features li"),
      { opacity: 0, x: 24, y: 6 },
      { opacity: 1, x: 0, y: 0, duration: 0.4, stagger: 0.07, ease: "back.out(1.4)", delay: 0.28 }
    );

    // Tech badges, buttons
    gsap.fromTo(
      projectInfoRef.current.querySelectorAll(".work-badges, .work-github, .work-arrows"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.42 }
    );

    setTimeout(() => { 
      animationActiveFlag.current = false; 
    }, 700);
  }, []);

  const selectProject = useCallback((targetIdx: number, slideDirection: "next" | "prev") => {
    if (animationActiveFlag.current) return;
    animationActiveFlag.current = true;
    setActiveProjectIdx(targetIdx);
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        triggerEntranceAnimation(slideDirection);
      });
    });
  }, [triggerEntranceAnimation]);

  const loadNextProject = useCallback(() => {
    const nextIndex = (activeProjectIdx + 1) % showcaseProjectsList.length;
    selectProject(nextIndex, "next");
  }, [activeProjectIdx, selectProject]);

  const initAutoSlide = useCallback(() => {
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
    }
    autoSlideTimerRef.current = setTimeout(loadNextProject, AUTO_SLIDE_DURATION);
  }, [loadNextProject]);

  const cancelAutoSlide = useCallback(() => {
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isMouseHovered) {
      initAutoSlide();
    } else {
      cancelAutoSlide();
    }
    return () => cancelAutoSlide();
  }, [isMouseHovered, activeProjectIdx, initAutoSlide, cancelAutoSlide]);

  useEffect(() => {
    triggerEntranceAnimation("next");
  }, [triggerEntranceAnimation]);

  useGSAP(() => {
    if (!showcaseSectionRef.current) return;

    gsap.fromTo(
      showcaseSectionRef.current.querySelector(".work-header h2"),
      { opacity: 0, y: 50, skewX: -5 },
      {
        opacity: 1, y: 0, skewX: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: showcaseSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      showcaseSectionRef.current.querySelector(".work-dots"),
      { opacity: 0, x: 20 },
      {
        opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: 0.2,
        scrollTrigger: {
          trigger: showcaseSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: showcaseSectionRef });

  const onMouseEnterShowcase = () => {
    if (mouseHoverTimerRef.current) {
      clearTimeout(mouseHoverTimerRef.current);
    }
    setIsMouseHovered(true);
  };

  const onMouseLeaveShowcase = () => {
    mouseHoverTimerRef.current = setTimeout(() => {
      setIsMouseHovered(false);
    }, 300);
  };

  const activeProject = showcaseProjectsList[activeProjectIdx];

  return (
    <div className="work-section" id="work" ref={showcaseSectionRef}>
      <div className="work-container section-container">

        <div className="work-header">
          <h2>My <span>Work</span></h2>
          
          <div className="work-dots">
            {showcaseProjectsList.map((_, dotIdx) => (
              <button
                key={`dot-indicator-${dotIdx}`}
                className={`work-dot ${dotIdx === activeProjectIdx ? "work-dot--active" : ""}`}
                style={dotIdx === activeProjectIdx ? { background: activeProject.color } : {}}
                onClick={() => selectProject(dotIdx, dotIdx > activeProjectIdx ? "next" : "prev")}
                aria-label={`Showcase Project ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

        <div
          className="work-showcase"
          onMouseEnter={onMouseEnterShowcase}
          onMouseLeave={onMouseLeaveShowcase}
        >
          <div className="work-img-side" ref={projectImgRef}>
            <div
              className="work-img-frame"
              style={{ borderColor: `${activeProject.color}40` }}
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="work-img"
              />
              <div
                className="work-img-glow"
                style={{ boxShadow: `0 0 40px ${activeProject.color}30` }}
              />
            </div>
          </div>

          <div className="work-info-side" ref={projectInfoRef}>
            <div className="work-animate">
              <span className="work-num" style={{ color: activeProject.color }}>
                {activeProject.num}
              </span>
            </div>

            <h3 className="work-title work-animate">{activeProject.title}</h3>
            <span className="work-date work-animate">{activeProject.date}</span>

            <div
              className="work-accent work-animate"
              style={{ background: `linear-gradient(90deg, ${activeProject.color}, transparent)` }}
            />

            <p className="work-desc work-animate">{activeProject.description}</p>

            <ul className="work-features work-animate">
              {activeProject.features.map((featureText, featIdx) => (
                <li key={`feat-${activeProjectIdx}-${featIdx}`} style={{ borderLeftColor: `${activeProject.color}80` }}>
                  {featureText}
                </li>
              ))}
            </ul>

            <div className="work-badges work-animate">
              {activeProject.techStack.map((techName, techIdx) => (
                <span
                  key={`tech-${activeProjectIdx}-${techIdx}`}
                  className="work-badge"
                  style={{ borderColor: `${activeProject.color}50` }}
                >
                  {techName}
                </span>
              ))}
            </div>

            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="work-github work-animate"
                style={{ color: activeProject.color }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            )}

            <div className="work-arrows">
              <button
                className="work-arrow"
                onClick={() => selectProject((activeProjectIdx - 1 + showcaseProjectsList.length) % showcaseProjectsList.length, "prev")}
                aria-label="Load previous project"
              >
                &#8592;
              </button>
              <button
                className="work-arrow"
                onClick={() => selectProject((activeProjectIdx + 1) % showcaseProjectsList.length, "next")}
                aria-label="Load next project"
              >
                &#8594;
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
