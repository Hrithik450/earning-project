import { useEffect } from "react";
import { useAuthContext } from "../store/context/AuthContext";
import "./wallet.css";
import { FaCoins } from "react-icons/fa6";

function Wallet() {
  const { user } = useAuthContext();

  return (
    <>
      <div className="wallet">
        <div className="points">
          <label style={{ marginBottom: "0.5rem" }}>Current points</label>
          <p style={{ display: "flex", alignItems: "center" }}>
            <FaCoins style={{ color: "gold" }} />
            <span style={{ color: "darkgrey", fontWeight: "900" }}>
              {user && user.points}
            </span>
          </p>
        </div>
        <div className="wallet-navigations">
          <div
            style={{ backgroundColor: "rgb(98 84 243)", position: "relative" }}
          >
            <span
              style={{
                position: "absolute",
                transform: "translateY(-120%)",
                borderRadius: "0.1rem",
                fontSize: "1rem",
                textShadow: `
                  -1px -1px 0 black,
                   1px -1px 0 black,
                  -1px 1px 0 black,
                   1px 1px 0 black
                 `,
              }}
            >
              Refer Code
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>{(user && user.referCode) || <>NONE</>}</p>
            </div>
          </div>
          <div>
            <span
              style={{
                position: "absolute",
                transform: "translateY(-120%)",
                borderRadius: "0.1rem",
                fontSize: "1rem",
                textShadow: `
                  -1px -1px 0 black,
                   1px -1px 0 black,
                  -1px 1px 0 black,
                   1px 1px 0 black
                 `,
              }}
            >
              Active Plan
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>{(user && user.plan) || <>NONE</>}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
