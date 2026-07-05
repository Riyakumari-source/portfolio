import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillSetData } from "../data/skills";

export const Skills = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const registerRef = (element: HTMLDivElement | null, itemIndex: number) => {
    elementsRef.current[itemIndex] = element;
  };

  useEffect(() => {
    const activeTouchMode = ScrollTrigger.isTouch;
    const items = elementsRef.current;

    const toggleActiveItem = (targetItem: HTMLDivElement) => {
      targetItem.classList.toggle("what-content-active");
      targetItem.classList.remove("what-sibling");
      
      const parentNode = targetItem.parentElement;
      if (parentNode) {
        const otherSiblings = Array.from(parentNode.children);
        otherSiblings.forEach((siblingNode) => {
          if (siblingNode !== targetItem) {
            siblingNode.classList.remove("what-content-active");
            siblingNode.classList.toggle("what-sibling");
          }
        });
      }
    };

    if (activeTouchMode) {
      items.forEach((item) => {
        if (item) {
          item.classList.remove("what-noTouch");
          item.addEventListener("click", () => toggleActiveItem(item));
        }
      });
    }

    return () => {
      items.forEach((item) => {
        if (item) {
          item.removeEventListener("click", () => toggleActiveItem(item));
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>{" "}
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
        <img
          src="/images/suit-girl.png"
          alt="Riya Kumari illustration"
          className="suit-girl-img"
        />
      </div>
      <div className="what-box">
        <div className="what-box-in">
          {/* Vertical dash lines wrapper */}
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          {skillSetData.map((data, idx) => (
            <div
              key={`skill-card-${idx}`}
              className="what-content what-noTouch"
              ref={(el) => registerRef(el, idx)}
            >
              {/* Horizontal dashed border SVG */}
              <div className="what-border1">
                <svg height="100%">
                  {idx === 0 && (
                    <line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="0"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                    />
                  )}
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>
              </div>
              <div className="what-corner"></div>

              <div className="what-content-in">
                <h3>{data.category}</h3>
                <h4>Description</h4>
                <p>{data.about}</p>
                <h5>Skillset & tools</h5>
                <div className="what-content-flex">
                  {data.skills.map((skillName, sIdx) => (
                    <div key={`skill-tag-${sIdx}`} className="what-tags">
                      {skillName}
                    </div>
                  ))}
                </div>
                <div className="what-arrow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
