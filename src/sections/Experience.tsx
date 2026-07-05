import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { careerTimelineData } from "../data/experience";
import { TimelineCard } from "../components/ui/TimelineCard";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const markerDotRef = useRef<HTMLImageElement>(null);
  const careerBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const careerDetailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const isDesktop = window.innerWidth > 1024;
    if (!isDesktop) return;

    // 1. Suit girl moves down into Career Timeline
    const careerTimelineDrop = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 95%",
        end: "top 35%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    careerTimelineDrop.to(".suit-girl-img", {
      y: "125vh",
      x: -40,
      scale: 0.44,
      ease: "none",
    });

    // 2. Jump effect for timeline marker
    const markerBounceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 55%",
        toggleActions: "play none none none",
      },
    });
    
    markerBounceTimeline.to(".suit-girl-img", { yPercent: -20, duration: 0.3, ease: "power2.out" });
    markerBounceTimeline.to(".suit-girl-img", { yPercent: 0, duration: 0.7, ease: "bounce.out" });

    // 3. Animate the title in from below
    gsap.fromTo(
      ".career-section h2",
      { opacity: 0, y: 60, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".career-section",
          start: "top 80%",
        },
      }
    );

    // 4. Animate the timeline line growing downward
    gsap.fromTo(
      timelineLineRef.current,
      { maxHeight: "0%" },
      {
        maxHeight: "100%",
        duration: 2.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".career-info",
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
        },
      }
    );

    // 5. Animate each career box staggered from left/right
    careerBoxRefs.current.forEach((box, i) => {
      if (!box) return;
      const fromLeft = i % 2 === 0;
      gsap.fromTo(
        box,
        { opacity: 0, x: fromLeft ? -60 : 60, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
          },
        }
      );
    });

    // 6. Animate detail text: description <p> + each <li> bullet
    careerDetailRefs.current.forEach((detailEl) => {
      if (!detailEl) return;

      const descP = detailEl.querySelector("p");
      if (descP) {
        const words = descP.textContent?.split(" ") || [];
        descP.innerHTML = words
          .map(
            (w) =>
              `<span class="career-word" style="display:inline-block; overflow:hidden; vertical-align:top;"><span class="career-word-inner" style="display:inline-block">${w}</span></span>`
          )
          .join(" ");

        gsap.fromTo(
          detailEl.querySelectorAll(".career-word-inner"),
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.04,
            scrollTrigger: {
              trigger: detailEl,
              start: "top 88%",
            },
          }
        );
      }

      const bullets = detailEl.querySelectorAll("li");
      if (bullets.length > 0) {
        gsap.fromTo(
          bullets,
          { opacity: 0, x: -30, filter: "blur(4px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: detailEl,
              start: "top 85%",
            },
          }
        );
      }

      const certLink = detailEl.querySelector(".career-cert-link");
      if (certLink) {
        gsap.fromTo(
          certLink,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.6,
            scrollTrigger: {
              trigger: detailEl,
              start: "top 80%",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="career-section section-container" id="career" ref={mainSectionRef}>
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline" ref={timelineLineRef}>
            <img
              src="/images/suit-girl.png"
              alt="timeline progress indicator"
              className="career-dot"
              ref={markerDotRef}
            />
          </div>
          {careerTimelineData.map((historyItem, itemIndex) => (
            <TimelineCard
              key={`history-item-${itemIndex}`}
              historyItem={historyItem}
              itemIndex={itemIndex}
              ref={(el) => {
                careerBoxRefs.current[itemIndex] = el;
              }}
              detailRef={(el) => {
                careerDetailRefs.current[itemIndex] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
