/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import Lenis from "lenis";
import { ROUTES } from "../../constants/routes";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollEngineInterface {
  scrollTop: (val?: number) => number;
  paused: (state: boolean) => void;
  scrollTo: (target: string | number | HTMLElement, smooth?: boolean, position?: string) => void;
}

export let scrollEngine: ScrollEngineInterface;

const HoverLinks = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    <div className="hover-link" data-cursor={!cursor ? "disable" : undefined}>
      <div className="hover-in">
        {text} 
        <div>{text}</div>
      </div>
    </div>
  );
};

export const Navbar = () => {
  useEffect(() => {
    const scrollInstance = new Lenis({
      duration: 1.1,
      easing: (progress) => Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
      wheelMultiplier: 1.15,
    });

    scrollInstance.on("scroll", () => {
      ScrollTrigger.update();
    });

    const rafHandler = (currentTime: number) => {
      scrollInstance.raf(currentTime * 1000);
    };

    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    scrollEngine = {
      scrollTop: (scrollValue?: number) => {
        if (scrollValue !== undefined) {
          scrollInstance.scrollTo(scrollValue, { immediate: true });
        }
        return scrollInstance.scroll;
      },
      paused: (shouldPause: boolean) => {
        if (shouldPause) {
          scrollInstance.stop();
        } else {
          scrollInstance.start();
        }
      },
      scrollTo: (targetElement: string | number | HTMLElement, isSmoothScroll?: boolean) => {
        scrollInstance.scrollTo(targetElement, {
          immediate: !isSmoothScroll,
          duration: 1.5,
        });
      },
    };

    scrollEngine.scrollTop(0);
    // Do NOT pause on start — allow scrolling immediately

    const navLinks = document.querySelectorAll(".header ul a");
    const handleNavLinkClick = (event: Event) => {
      if (window.innerWidth > 1024) {
        event.preventDefault();
        const clickedAnchor = event.currentTarget as HTMLAnchorElement;
        const targetSectionSelector = clickedAnchor.getAttribute("data-href");
        if (targetSectionSelector) {
          scrollEngine.scrollTo(targetSectionSelector, true);
        }
      }
    };

    navLinks.forEach((anchor) => {
      anchor.addEventListener("click", handleNavLinkClick);
    });

    return () => {
      scrollInstance.destroy();
      gsap.ticker.remove(rafHandler);
      navLinks.forEach((anchor) => {
        anchor.removeEventListener("click", handleNavLinkClick);
      });
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/rk-logo.png" alt="RK Logo" className="navbar-logo" />
          Riya Kumari
        </a>
        <a
          href="mailto:riakri0207@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          riakri0207@gmail.com
        </a>
        <ul>
          {ROUTES.map((route) => (
            <li key={route.path}>
              <a data-href={route.path} href={route.path}>
                <HoverLinks text={route.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-circle1"></div>
      <div className="hero-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};
export default Navbar;
