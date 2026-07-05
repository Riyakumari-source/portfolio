import { MdArrowOutward } from "react-icons/md";

interface SocialMediaLink {
  label: string;
  url: string;
}

export const Contact = () => {
  const externalSocials: SocialMediaLink[] = [
    { label: "Github", url: "https://github.com/Riyakumari-source" },
    { label: "Linkedin", url: "https://www.linkedin.com/in/riya-kumari-7b5a031a4/" }
  ];

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:riakri0207@gmail.com" data-cursor="disable">
                riakri0207@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+918102712155" data-cursor="disable">
                +91 81027 12155
              </a>
            </p>
            <h4>Location</h4>
            <p>
              Katihar, Bihar <span style={{ color: "var(--accentColor)", fontWeight: 500 }}>(Open to Relocate)</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {externalSocials.map((socialLink, linkIdx) => (
              <a
                key={`social-link-${linkIdx}`}
                href={socialLink.url}
                target="_blank"
                data-cursor="disable"
                className="contact-social"
                rel="noreferrer"
              >
                {socialLink.label} <MdArrowOutward />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              Developed <br /> by <span>Riya Kumari</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
