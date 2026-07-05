import gsap from "gsap";
import { SplitText } from "../utils/helpers";

export const runProjectSlideTransition = (
  projectImgElement: HTMLElement | null,
  projectInfoElement: HTMLElement | null,
  slideDirection: "next" | "prev"
) => {
  if (!projectInfoElement || !projectImgElement) return;
  const initialXOffset = slideDirection === "next" ? 70 : -70;

  // 1. Slide and scale the project preview image
  gsap.fromTo(
    projectImgElement,
    { x: initialXOffset, scale: 0.95, opacity: 0.5, filter: "blur(4px)" },
    { x: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
  );

  // 2. Animate split titles
  const titleCharacters = new SplitText(".work-text-in h3", { type: "chars" });
  gsap.fromTo(
    titleCharacters.chars,
    { opacity: 0, y: 30, filter: "blur(3px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.02, ease: "power2.out" }
  );

  // 3. Fade in details (description, tag badges, features)
  gsap.fromTo(
    [".work-text-in p", ".work-tags", ".work-list-item", ".work-link-a"],
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power1.out", delay: 0.2 }
  );
};
