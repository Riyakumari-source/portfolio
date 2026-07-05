export const About = () => {
  const profileDetails = [
    "I am an aspiring Full Stack Developer having completed my Master of Computer Applications (MCA) at ATSS IICMR, Pune (SPPU affiliated), in 2026. My passion lies in constructing optimized backend systems, writing clean queries, and developing interactive user interfaces.",
    "Recently, I completed a 6-month Software Developer Internship at Infinity Arthvishva Pvt. Ltd. in Pune, where I designed customer dashboards, built admin control systems, and integrated RESTful APIs with PostgreSQL. I am now actively looking for full-time Junior Software Developer or Associate Full Stack Developer opportunities."
  ];

  return (
    <div className="about-section" id="about">
      <div className="about-card">
        <div className="about-photo-bg">
          <img
            src="/images/riya-profile.jpg"
            alt="Riya Kumari profile picture"
            className="about-photo-img"
          />
          <div className="about-photo-overlay" />
        </div>

        <div className="about-me">
          <h3 className="title">About Me</h3>
          <div className="para">
            {profileDetails.map((paragraphText, paragraphIndex) => (
              <p
                key={`bio-para-${paragraphIndex}`}
                style={{
                  marginBottom: paragraphIndex < profileDetails.length - 1 ? "1.5rem" : "0px",
                }}
              >
                {paragraphText}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
