import "./footer.css";

import "./footer.css";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <section className="footer-container" id="footer">
        <div className="mid-container">
          <div className="grid-container">
            <div className="section-grid-1">
              <h4>PocketKART</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                sint.
              </p>
            </div>
            <div className="section-grid-2">
              <h4>Subscribe to get important updates</h4>
              <input type="text" placeholder="email" required />
              <button>Subscribe</button>
            </div>
            <div className="section-grid-3">
              <h4>Follow us</h4>
              <div>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaLinkedin />
                </a>
              </div>
            </div>
            <div className="section-grid-4">
              <h4>Call us</h4>
              <p>+91 7483229386</p>
            </div>
          </div>
          <div className="last-container">
            <div>@2024 PocketKART All Rights Reserved</div>
            <div>
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
