import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isHoveringElement = false;
    const cursorNode = cursorDotRef.current;
    if (!cursorNode) return;

    const clientMouseCoordinates = { x: 0, y: 0 };
    const interpolatedCursorCoords = { x: 0, y: 0 };

    const updateMouseCoords = (evt: MouseEvent) => {
      clientMouseCoordinates.x = evt.clientX;
      clientMouseCoordinates.y = evt.clientY;
    };

    document.addEventListener("mousemove", updateMouseCoords);

    let animationFrameId: number;

    const renderLoop = () => {
      if (!isHoveringElement) {
        const interpolationDelay = 6;
        interpolatedCursorCoords.x += (clientMouseCoordinates.x - interpolatedCursorCoords.x) / interpolationDelay;
        interpolatedCursorCoords.y += (clientMouseCoordinates.y - interpolatedCursorCoords.y) / interpolationDelay;
        
        gsap.to(cursorNode, {
          x: interpolatedCursorCoords.x,
          y: interpolatedCursorCoords.y,
          duration: 0.1
        });
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Dynamic delegation since navbar links might mount after this hook
    const handleMouseOver = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (!interactiveEl) return;

      const boundingBox = interactiveEl.getBoundingClientRect();

      if (interactiveEl.dataset.cursor === "icons") {
        cursorNode.classList.add("cursor-icons");
        gsap.to(cursorNode, { x: boundingBox.left, y: boundingBox.top, duration: 0.1 });
        cursorNode.style.setProperty("--cursorH", `${boundingBox.height}px`);
        isHoveringElement = true;
      }
      
      if (interactiveEl.dataset.cursor === "disable") {
        cursorNode.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (!interactiveEl) return;

      cursorNode.classList.remove("cursor-disable", "cursor-icons");
      isHoveringElement = false;
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", updateMouseCoords);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return cursorDotRef;
};
export default useCursor;
