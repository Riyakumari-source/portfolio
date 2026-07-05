/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Pause scrolling when mobile menu is open
  useEffect(() => {
    if (scrollEngine) {
      scrollEngine.paused(isMenuOpen);
    }
  }, [isMenuOpen]);

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

    const handleNavLinkClick = (event: Event) => {
      event.preventDefault();
      const clickedAnchor = event.currentTarget as HTMLAnchorElement;
      const targetSectionSelector = clickedAnchor.getAttribute("data-href");
      if (targetSectionSelector) {
        setIsMenuOpen(false);
        if (scrollEngine) {
          scrollEngine.scrollTo(targetSectionSelector, true);
        } else {
          const element = document.querySelector(targetSectionSelector);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    // Query links in both desktop header and mobile menu overlay
    const getLinks = () => document.querySelectorAll(".header ul a, .mobile-menu-links a");
    const navLinks = getLinks();

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
        <ul className="desktop-menu">
          {ROUTES.map((route) => (
            <li key={route.path}>
              <a data-href={route.path} href={route.path}>
                <HoverLinks text={route.label} />
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          data-cursor="disable"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-links">
          {ROUTES.map((route) => (
            <a
              key={`mobile-${route.path}`}
              data-href={route.path}
              href={route.path}
              className="mobile-menu-link"
            >
              {route.label}
            </a>
          ))}
        </div>
      </div>

      <div className="hero-circle1"></div>
      <div className="hero-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};
export default Navbar;
