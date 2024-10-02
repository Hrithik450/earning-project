import "./logout.css";
import { RxDashboard } from "react-icons/rx";
import { GiLightningTrio } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../store/context/AuthContext";

const UserOptions = ({ menu }) => {
  const { loadUser, user, isAuthenticated, handleLogout } = useAuthContext();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      {menu && (
        <>
          <div className="popup-container">
            <a href="#" onClick={handleLogout}>
              <ImExit />
              Logout
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default UserOptions;
