/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { runHeroEntranceAnimation } from "../../animations/heroAnimation";
import { scrollEngine } from "./Navbar";

const Loader = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [progressFinished, setProgressFinished] = useState(false);
  const [welcomePhaseReady, setWelcomePhaseReady] = useState(false);
  const [screenExitInitiated, setScreenExitInitiated] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setProgressFinished(true);
      setTimeout(() => {
        setWelcomePhaseReady(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    if (welcomePhaseReady) {
      setScreenExitInitiated(true);
      setTimeout(() => {
        runHeroEntranceAnimation(scrollEngine);
        setIsLoading(false);
      }, 900);
    }
  }, [welcomePhaseReady, setIsLoading]);

  const trackHoverCoordinates = (event: React.MouseEvent<HTMLElement>) => {
    const { currentTarget: hoverTarget } = event;
    const clientRect = hoverTarget.getBoundingClientRect();
    const xCoord = event.clientX - clientRect.left;
    const yCoord = event.clientY - clientRect.top;
    
    hoverTarget.style.setProperty("--mouse-x", `${xCoord}px`);
    hoverTarget.style.setProperty("--mouse-y", `${yCoord}px`);
  };

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Riya Kumari
        </a>
        <div className={`loaderGame ${screenExitInitiated && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, idx) => (
                <div className="loaderGame-line" key={`loading-line-${idx}`}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div
          className={`loading-wrap ${screenExitInitiated && "loading-clicked"}`}
          onMouseMove={trackHoverCoordinates}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${progressFinished && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;

export const setProgress = (setLoading: (val: number) => void) => {
  let percentValue = 0;

  let tickerInterval = setInterval(() => {
    if (percentValue <= 50) {
      const increment = Math.round(Math.random() * 5);
      percentValue = percentValue + increment;
      setLoading(percentValue);
    } else {
      clearInterval(tickerInterval);
      tickerInterval = setInterval(() => {
        percentValue = percentValue + Math.round(Math.random());
        setLoading(percentValue);
        if (percentValue > 91) {
          clearInterval(tickerInterval);
        }
      }, 2000);
    }
  }, 100);

  const clearTimer = () => {
    clearInterval(tickerInterval);
    setLoading(100);
  };

  const waitForLoadToFinish = () => {
    return new Promise<number>((resolve) => {
      clearInterval(tickerInterval);
      tickerInterval = setInterval(() => {
        if (percentValue < 100) {
          percentValue++;
          setLoading(percentValue);
        } else {
          resolve(percentValue);
          clearInterval(tickerInterval);
        }
      }, 2);
    });
  };

  return { loaded: waitForLoadToFinish, percent: percentValue, clear: clearTimer };
};
