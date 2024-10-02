import { useEffect, useState } from "react";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { FaGift } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { useAuthContext } from "../../store/context/AuthContext";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import UserOptions from "../Auth/logout";

export function Navlists({ isAuthenticated, user, handleLogout }) {
  return (
    <>
      <div className="navbar-lists">
        <div className="list-items">
          <ul>
            <li>
              <FaHome className="nav-icons" />
              <a href="#Home">Home </a>
            </li>
            <li>
              <ImPriceTags className="nav-icons" />
              <a href="#pricing">pricing </a>
            </li>
            <li>
              <FaGift className="nav-icons" />
              <a href="#rewards">Reward </a>
            </li>
            <li>
              <FaQuestionCircle className="nav-icons" />
              <a href="#footer">About </a>
            </li>
            <li>
              <MdOutlineMiscellaneousServices className="nav-icons" />
              <a href="#services">Services </a>
            </li>
            {isAuthenticated ? (
              <>
                <li
                  style={{
                    display: "flex",
                    columnGap: "0.5rem",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <CgProfile style={{ fontSize: "1.5rem" }} />
                  {user && user.username}
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/user/auth"
                    style={{
                      display: "flex",
                      columnGap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <IoMdLogIn style={{ fontSize: "1.3rem" }} />
                    Login
                  </a>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li>
                <a
                  href="#"
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    columnGap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <ImExit />
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

function Navbar() {
  const [active, setactive] = useState(false);
  const [menu, setmenu] = useState(false);
  const { isAuthenticated, loadUser, handleLogout, user } = useAuthContext();

  useEffect(() => {
    loadUser();
  }, []);

  const handleMenu = () => {
    if (menu) {
      setmenu(false);
    } else {
      setmenu(true);
    }
  };

  const handleNav = () => {
    if (active) {
      setactive(false);
    } else {
      setactive(true);
    }
  };

  return (
    <>
      <div className="Navbar-container">
        <div
          className="navbar-container"
          style={{ position: "fixed", top: "0", width: "96%" }}
        >
          <div className="image">
            <img src="" alt="logo-img" />
          </div>
          {active ? (
            <>
              <Navlists
                isAuthenticated={isAuthenticated}
                user={user}
                handleLogout={handleLogout}
              />
            </>
          ) : (
            <>
              <div className="menu">
                <a href="#Home">Home </a>
                <a href="#pricing">pricing </a>
                <a href="#rewards">Reward </a>
                <a href="#footer">About </a>
                <a href="#services">Services </a>
                {isAuthenticated ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        columnGap: "0.5rem",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <CgProfile
                        style={{ fontSize: "1.3rem" }}
                        onClick={handleMenu}
                      />
                      {user && user.username}
                      {isAuthenticated && <UserOptions menu={menu} />}
                    </div>
                  </>
                ) : (
                  <a href="/user/auth">
                    <IoMdLogIn style={{ fontSize: "1.3rem" }} />
                  </a>
                )}
              </div>
            </>
          )}
        </div>

        <div
          className="mobile-nav-btn"
          onClick={handleNav}
          style={{ position: "fixed", top: "0" }}
        >
          <GiHamburgerMenu className={`${active ? "closeIcon" : ""}`} />
          <IoClose className={`${active ? "" : "closeIcon"}`} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
