import { useState, useEffect, useRef, useMemo } from "react";
import { MeshPhysicalMaterial } from "three";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { gsap } from "gsap";
import { skillsCategorizedData } from "../data/skills";
import { SkillCard } from "../components/ui/SkillCard";
import {
  PhysicsSphere,
  KinematicMouseCollider,
  loadedTextures,
  sphereInstances,
} from "../components/ui/TechBall";

export const TechStack = () => {
  const [physicsEngineActiveFlag, setPhysicsEngineActiveFlag] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(window.innerWidth > 1024);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollActivity = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const targetWorkSec = document.getElementById("work");
      if (targetWorkSec) {
        const boundingOffset = targetWorkSec.getBoundingClientRect().top;
        setPhysicsEngineActiveFlag(scrollPosition > boundingOffset);
      }
    };

    const handleWindowResize = () => {
      setIsDesktopMode(window.innerWidth > 1024);
    };

    const headerNavAnchors = document.querySelectorAll(".header a");
    
    const navClickScrollDelayHandler = () => {
      const triggerScrollInterval = setInterval(() => {
        handleScrollActivity();
      }, 10);
      setTimeout(() => {
        clearInterval(triggerScrollInterval);
      }, 1000);
    };

    headerNavAnchors.forEach((navAnchor) => {
      navAnchor.addEventListener("click", navClickScrollDelayHandler);
    });

    window.addEventListener("scroll", handleScrollActivity);
    window.addEventListener("resize", handleWindowResize);

    // Stagger slide reveal animations for accordion items
    const accordionItems = document.querySelectorAll(".accordion-item");
    accordionItems.forEach((itemNode, itemIdx) => {
      gsap.fromTo(
        itemNode,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: itemIdx * 0.06,
          scrollTrigger: {
            trigger: itemNode,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      window.removeEventListener("scroll", handleScrollActivity);
      window.removeEventListener("resize", handleWindowResize);
      headerNavAnchors.forEach((navAnchor) => {
        navAnchor.removeEventListener("click", navClickScrollDelayHandler);
      });
    };
  }, []);

  const ballMaterialsList = useMemo(() => {
    return loadedTextures.map(
      (texture) =>
        new MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" id="techstack" ref={wrapperRef}>
      <h2>My Techstack</h2>

      <div className="techstack-flex">
        <div className="skills-accordion">
          {Object.entries(skillsCategorizedData).map(([categoryName, skills]) => {
            const isOpen = activeCategory === categoryName;
            return (
              <div
                key={categoryName}
                className={`accordion-item ${isOpen ? "active" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => setActiveCategory(isOpen ? null : categoryName)}
                  onMouseEnter={() => setIsHoveringInteractive(true)}
                  onMouseLeave={() => setIsHoveringInteractive(false)}
                >
                  <span className="accordion-title">{categoryName}</span>
                  <span className={`accordion-icon ${isOpen ? "open" : ""}`}>+</span>
                </button>
                <div className="accordion-content-wrapper">
                  <div className="accordion-content">
                    <div className="hex-grid">
                      {skills.map((skill) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          onMouseEnter={() => setIsHoveringInteractive(true)}
                          onMouseLeave={() => setIsHoveringInteractive(false)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isDesktopMode && (
        <div className="techstack-canvas-container">
          <Canvas
            eventSource={wrapperRef as unknown as React.MutableRefObject<HTMLElement>}
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(sceneState) => {
              sceneState.gl.toneMappingExposure = 1.5;
            }}
            className="tech-canvas"
          >
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <directionalLight position={[0, 5, -4]} intensity={2} />
            <Physics gravity={[0, 0, 0]}>
              <KinematicMouseCollider
                isActive={physicsEngineActiveFlag}
                isHovering={isHoveringInteractive}
              />
              {sphereInstances.map((sphereProps, sphereIdx) => (
                <PhysicsSphere
                  key={`physics-ball-${sphereIdx}`}
                  {...sphereProps}
                  material={ballMaterialsList[Math.floor(Math.random() * ballMaterialsList.length)]}
                  isActive={physicsEngineActiveFlag}
                />
              ))}
            </Physics>
            <Environment
              preset="studio"
              environmentIntensity={0.5}
              environmentRotation={[0, 4, 2]}
            />
            <EffectComposer enableNormalPass={false}>
              <N8AO color="#20000a" aoRadius={2} intensity={1.15} />
            </EffectComposer>
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default TechStack;
