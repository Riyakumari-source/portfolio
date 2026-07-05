import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  useEffect(() => {
    // 1. Timeline for Hero/Landing to About Section
    const firstTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // 2. Timeline for About to What I Do Section
    const secondTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "center 55%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // 3. Timeline for What I Do scroll animations
    const thirdTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".whatIDO",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const isDesktop = window.innerWidth > 1024;

    if (isDesktop) {
      // 1. Landing to About animations
      firstTimeline.fromTo(".character-model", { xPercent: 0 }, { xPercent: -25, duration: 1 }, 0);
      firstTimeline.to(".hero-container", { opacity: 0, duration: 0.4 }, 0);
      firstTimeline.to(".hero-container", { y: "40%", duration: 0.8 }, 0);
      firstTimeline.fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      // 2. About to What I Do (Skills) animations
      secondTimeline.to(".about-section", { y: "30%", duration: 6 }, 0);
      secondTimeline.to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0);
      
      // Move hoodie girl image out
      secondTimeline.to(".character-model", {
        xPercent: 85,
        scale: 0.55,
        opacity: 0,
        pointerEvents: "none",
        delay: 2,
        duration: 4,
        ease: "power2.inOut",
      }, 0);
      
      secondTimeline.fromTo(".character-rim", { opacity: 1, scaleX: 1.4 }, { opacity: 0, scale: 0, y: "-70%", duration: 4, delay: 0.8 }, 0);
      
      // Animate suit girl image in
      secondTimeline.fromTo(".suit-girl-img",
        { opacity: 0, x: -120, scale: 0.05 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.6,
          delay: 3.5,
          ease: "back.out(1.4)",
          onComplete: () => {
            const suitGirl = document.querySelector(".suit-girl-img");
            if (suitGirl) {
              suitGirl.classList.add("suit-girl-visible");
            }
          },
        },
        0
      );

      secondTimeline.fromTo(".what-box-in", { display: "none" }, { display: "flex", duration: 0.1, delay: 3 }, 0);

      // 3. What I Do scroll exit
      thirdTimeline.to(".whatIDO", { y: "15%", duration: 2 }, 0);
    } else {
      // Mobile / Tablet: no special animations needed
    }

    // Refresh scroll trigger positions after a tick so layout is fully settled
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      // Destroy ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};
export default useScrollAnimation;
