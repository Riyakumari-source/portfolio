import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom SplitText Utility to avoid external GSAP member dependency issues
export class SplitText {
  elements: HTMLElement[] = [];
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private cachedOriginalHTML: Map<HTMLElement, string> = new Map();

  constructor(
    domTargets: string | HTMLElement | (string | HTMLElement)[],
    formattingOptions: { type?: string; linesClass?: string } = {}
  ) {
    const matchedNodes: HTMLElement[] = [];
    
    const parseTargetElements = (targetItem: string | HTMLElement) => {
      if (typeof targetItem === "string") {
        matchedNodes.push(...Array.from(document.querySelectorAll<HTMLElement>(targetItem)));
      } else if (targetItem instanceof HTMLElement) {
        matchedNodes.push(targetItem);
      }
    };

    if (Array.isArray(domTargets)) {
      domTargets.forEach(parseTargetElements);
    } else {
      parseTargetElements(domTargets);
    }

    this.elements = matchedNodes;
    const splitModes = formattingOptions.type ? formattingOptions.type.split(",") : ["words", "chars"];
    const containsCharsMode = splitModes.some(modeName => modeName.trim() === "chars");

    matchedNodes.forEach((node) => {
      this.cachedOriginalHTML.set(node, node.innerHTML);
      const plainTextContent = node.textContent || "";
      node.innerHTML = ""; 

      const spaceSplitWords = plainTextContent.split(" ");
      spaceSplitWords.forEach((wordString, wordIdx) => {
        if (wordString === "") return;
        const wordContainerSpan = document.createElement("span");
        wordContainerSpan.className = "split-word";
        wordContainerSpan.style.display = "inline-block";
        wordContainerSpan.style.position = "relative";

        if (containsCharsMode) {
          const letterChars = wordString.split("");
          letterChars.forEach((letterChar) => {
            const letterSpanNode = document.createElement("span");
            letterSpanNode.className = "split-char";
            letterSpanNode.style.display = "inline-block";
            letterSpanNode.style.position = "relative";
            letterSpanNode.textContent = letterChar;
            wordContainerSpan.appendChild(letterSpanNode);
            this.chars.push(letterSpanNode);
          });
        } else {
          wordContainerSpan.textContent = wordString;
        }

        node.appendChild(wordContainerSpan);
        this.words.push(wordContainerSpan);

        if (wordIdx < spaceSplitWords.length - 1) {
          const nonBreakingSpaceNode = document.createElement("span");
          nonBreakingSpaceNode.style.display = "inline-block";
          nonBreakingSpaceNode.innerHTML = "&nbsp;";
          node.appendChild(nonBreakingSpaceNode);
        }
      });

      if (formattingOptions.linesClass) {
        this.lines = this.words;
        this.words.forEach((wordElement) => {
          wordElement.classList.add(formattingOptions.linesClass!);
        });
      }
    });
  }

  revert() {
    this.cachedOriginalHTML.forEach((originalMarkup, targetNode) => {
      targetNode.innerHTML = originalMarkup;
    });
  }
}

interface AnimatableTextElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

export function initializeTextSplits() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  
  const paragraphElements: NodeListOf<AnimatableTextElement> = document.querySelectorAll(".para");
  const headingElements: NodeListOf<AnimatableTextElement> = document.querySelectorAll(".title");

  const startThreshold = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const activeToggleActions = "play pause resume reverse";

  paragraphElements.forEach((paragraphNode: AnimatableTextElement) => {
    paragraphNode.classList.add("visible");
    
    if (paragraphNode.anim) {
      paragraphNode.anim.progress(1).kill();
      paragraphNode.split?.revert();
    }

    paragraphNode.split = new SplitText(paragraphNode, {
      type: "lines,words",
      linesClass: "split-line",
    });

    paragraphNode.anim = gsap.fromTo(
      paragraphNode.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: paragraphNode.parentElement?.parentElement,
          toggleActions: activeToggleActions,
          start: startThreshold,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  headingElements.forEach((headingNode: AnimatableTextElement) => {
    if (headingNode.anim) {
      headingNode.anim.progress(1).kill();
      headingNode.split?.revert();
    }

    headingNode.split = new SplitText(headingNode, {
      type: "chars,lines",
      linesClass: "split-line",
    });

    headingNode.anim = gsap.fromTo(
      headingNode.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: headingNode.parentElement?.parentElement,
          toggleActions: activeToggleActions,
          start: startThreshold,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });
}
