import Web from "../assets/icons/web.png";
import LinkedIn from "../assets/icons/linkedin.png";
import Twitter from "../assets/icons/twitter.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerText">Sam Abdul</div>
      <div className="footerIcon">

      <a href="https://www.samspace.dev/"
      onClick={() => {
        alert("Redirecting to Sam Abdul Portfolio");
      }}>
        <div>
          <img src={Web} className="icon" alt="website" />
        </div></a>
        <a href="https://www.linkedin.com/in/sam-abdul-6b5875196/">
        <div>
          <img src={LinkedIn} className="icon" alt="website" />
        </div></a>
        <a href="https://twitter.com/SamAbdul_">
        <div>
          <img src={Twitter} className="icon" alt="website" />
        </div></a>
      </div>
      <a href="https://github.com/sam-abdul">
      <div className="iconText">https://github.com/sam-abdul</div>
      </a>
     
    </div>
  );
};

export default Footer;