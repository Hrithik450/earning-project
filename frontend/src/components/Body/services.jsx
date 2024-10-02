import "./services.css";
import { SlSpeedometer } from "react-icons/sl";
import { RiSecurePaymentFill } from "react-icons/ri";
import { LuShieldCheck } from "react-icons/lu";
import { MdLockPerson } from "react-icons/md";

function Services() {
  return (
    <>
      <section className="services-container" id="services">
        <h1 className="services-heading">Services</h1>
        <div className="services-grid">
          <div className="services-1">
            <SlSpeedometer className="services-icons" />
            <span className="services-content">Fastest Withdrawl Ever!</span>
          </div>
          <div className="services-2">
            <div>
              <LuShieldCheck className="services2-icons" />
              <span className="services2-content">Authorized</span>
            </div>
            <div>
              <MdLockPerson className="services2-icons" />
              <span className="services2-content">
                {" "}
                Most Secured Authentications
              </span>
            </div>
          </div>
          <div className="services-3">
            <RiSecurePaymentFill className="services-icons" />
            <span className="services-content">
              Super Secure payment systems
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
