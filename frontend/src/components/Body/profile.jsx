import { CgProfile } from "react-icons/cg";
import "./profile.css";
// import { useCartContext } from "../store/Context/CartContext";
// import { useAuthContext } from "../store/Context/AuthContext";
import { useEffect, useMemo } from "react";
// import LoadingSpinner from "./spinner/spinner";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { BsCalendar2Date } from "react-icons/bs";
import { IoWallet } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // const navigate = useNavigate();
  // const { loadUser, user, isAuthenticated, error } = useAuthContext();

  // useEffect(() => {
  //   loadUser();
  // }, []);

  // {
  //   user && user.Data.username;
  // }
  // {
  //   user && user.Data.email;
  // }
  // {user && user.Data.createdAt.split("T")[0]}

  // if (!isAuthenticated) {
  //   return (
  //     <>
  //       <h1>{error}</h1>
  //     </>
  //   );
  // }

  // if (!user || !user.Data) {
  //   return (
  //     <>
  //       <LoadingSpinner />
  //     </>
  //   );
  // }

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          margin: "0px",
          paddingBlock: "1rem",
          fontWeight: "900",
        }}
      >
        Profile
      </h1>
      <div className="profile-container">
        <div className="section-1">
          <CgProfile className="profile-icon" style={{ marginBlock: "5px" }} />
          <button style={{ padding: "0.5rem", color: "white" }}>
            My profile
          </button>
          <button
            className="bottom-btn"
            style={{ padding: "0.5rem", color: "white" }}
          >
            Change password
          </button>
        </div>
        <div className="section-2">
          <div className="item">
            <FaRegFaceSmileWink className="item-icon" />
            <h4>Username</h4>
            <span>username</span>
          </div>
          <div className="item">
            <TfiEmail className="item-icon" />
            <h4>Email</h4>
            <span>email</span>
          </div>
          <div className="item">
            <IoWallet className="item-icon" />
            <h4>Wallet</h4>
            <span>₹0</span>
          </div>
          <input
            type="Number"
            placeholder="Amount"
            required
            style={{
              width: "40%",
              marginLeft: "10%",
              marginTop: "0px",
              padding: "0.5rem",
              paddingLeft: "2%",
              borderRadius: "2rem",
            }}
          />
          <div style={{ margin: "0px" }}>
            <button
              style={{
                padding: "0.6rem",
                color: "white",
                width: "43%",
                marginLeft: "10%",
              }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
