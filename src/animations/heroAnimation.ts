import gsap from "gsap";
import { SplitText } from "../utils/helpers";
import { ScrollEngineInterface } from "../components/layout/Navbar";

export const runHeroEntranceAnimation = (scrollEngine: ScrollEngineInterface | null) => {
  document.body.style.overflowY = "auto";
  
  if (scrollEngine) {
    try {
      scrollEngine.scrollTop(0);
      scrollEngine.paused(false);
    } catch (err) {
      console.warn("scrollEngine is not initialized yet", err);
    }
  }
  window.scrollTo(0, 0);

  const mainLayout = document.getElementsByTagName("main")[0];
  if (mainLayout) {
    mainLayout.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Split and animate initial hero headings
  const introHeadersSplit = new SplitText(
    [".hero-info h3", ".hero-intro h2", ".hero-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );

  gsap.fromTo(
    introHeadersSplit.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const textSplitProperties = { type: "chars,lines", linesClass: "split-h2" };

  const firstSubheadingSplit = new SplitText(".hero-h2-info", textSplitProperties);
  gsap.fromTo(
    firstSubheadingSplit.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".hero-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const secondSubheadingSplit = new SplitText(".hero-h2-info-1", textSplitProperties);
  const thirdSubheadingSplit = new SplitText(".hero-h2-1", textSplitProperties);
  const fourthSubheadingSplit = new SplitText(".hero-h2-2", textSplitProperties);

  runTextLoop(firstSubheadingSplit, secondSubheadingSplit);
  runTextLoop(thirdSubheadingSplit, fourthSubheadingSplit);
};

function runTextLoop(textGroupA: SplitText, textGroupB: SplitText) {
  const loopTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delaySec = 4;
  const secondaryDelay = delaySec * 2 + 1;

  loopTimeline.fromTo(
    textGroupB.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delaySec,
    },
    0
  );

  loopTimeline.fromTo(
    textGroupA.chars,
    { y: 80 },
    {
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: secondaryDelay,
    },
    1
  );

  loopTimeline.fromTo(
    textGroupA.chars,
    { y: 0 },
    {
      y: -80,
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.1,
      delay: delaySec,
    },
    0
  );

  loopTimeline.to(
    textGroupB.chars,
    {
      y: -80,
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.1,
      delay: secondaryDelay,
    },
    1
  );
}
