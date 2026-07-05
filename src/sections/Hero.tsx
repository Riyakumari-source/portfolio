import { PropsWithChildren } from "react";

export const Hero = ({ children }: PropsWithChildren) => {
  return (
    <div className="hero-section" id="heroDiv">
      <div className="hero-container">
        <div className="hero-intro">
          <h2>Hello! I'm</h2>
          <h1>
            RIYA
            <br />
            <span>KUMARI</span>
          </h1>
        </div>
        {children}
        <div className="hero-info">
          <h3>A Creative</h3>
          <h2 className="hero-info-h2">
            <div className="hero-h2-1">Developer</div>
            <div className="hero-h2-2">Engineer</div>
          </h2>
          <h2>
            <div className="hero-h2-info">Full Stack</div>
            <div className="hero-h2-info-1">Software Developer</div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
