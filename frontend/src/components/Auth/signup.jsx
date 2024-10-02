import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { Login } from "./login";
import { FaRegFaceSmile } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useAuthContext } from "../../store/context/AuthContext";
import { FaChildReaching } from "react-icons/fa6";
// import LoadingSpinner from "../spinner/spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSubmit, spinner, user, isAuthenticated, error } =
    useAuthContext();

  const [Eyeopen, setEyeopen] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    refferalCode: "",
  });
  const [LoginPage, setLoginPage] = useState(false);

  const handleButton = () => {
    if (LoginPage) {
      setLoginPage(false);
    } else {
      setLoginPage(true);
    }
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(isAuthenticated);

  if (isAuthenticated) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  return (
    <>
      {LoginPage ? (
        <Login handleButton={handleButton} />
      ) : (
        <div className="signup-container">
          <form
            className="Signup-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);
            }}
          >
            <div className="shift-bar">
              <div onClick={handleButton} style={{ color: "orange" }}>
                Login
              </div>
              <div className="active" style={{ color: "orange" }}>
                Register
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <FaRegFaceSmile className="image" />
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                required
                style={{ paddingLeft: window.innerWidth < 450 ? "15%" : "12%" }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <TfiEmail className="image" />
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
                style={{ paddingLeft: window.innerWidth < 450 ? "15%" : "12%" }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <CiLock className="image" />
              <input
                type={Eyeopen ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
                style={{ paddingLeft: window.innerWidth < 450 ? "15%" : "12%" }}
              />
              {Eyeopen ? (
                <IoEyeOffOutline
                  className="EyeOutline"
                  onClick={() => setEyeopen(false)}
                />
              ) : (
                <IoEyeOutline
                  className="EyeOutline"
                  onClick={() => setEyeopen(true)}
                />
              )}
            </div>
            <div style={{ position: "relative" }}>
              <FaChildReaching className="image" />
              <input
                type="text"
                placeholder="Refer Code"
                name="refferalCode"
                onChange={handleChange}
                required
                style={{ paddingLeft: window.innerWidth < 450 ? "15%" : "12%" }}
              />
            </div>
            <button
              style={{
                fontSize: "1.10rem",
                fontWeight: "600",
                backgroundColor: "orange",
                marginLeft: "9%",
              }}
            >
              SignUp
              {/* {spinner ? <LoadingSpinner /> : <>Sign Up</>} */}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUp;
