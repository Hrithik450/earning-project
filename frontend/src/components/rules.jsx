import "./rules.css";
import { FaCoins } from "react-icons/fa6";
function Rules() {
  return (
    <>
      <div className="rules-container">
        <h2>Rules:</h2>
        <div className="refer-rules">
          <p>On Every Successful Referal You will get </p>

          <p className="text-outline">
            1 Refer =
            <FaCoins style={{ color: "gold", marginInline: "0.5rem" }} />
            4000 points
          </p>
          <p className="text-outline" style={{ marginBottom: "2rem" }}>
            10 Refer =
            <FaCoins style={{ color: "gold", marginInline: "0.2rem" }} /> 45000
            points
          </p>
          <label className="referCount">Total Refered: 0</label>
        </div>
        <div className="rules">
          <h2>Follow Steps:</h2>
          <p>Step 1: Share your Referal Code</p>
          <p>Step 2: Register your friends using Your Refer Code</p>
          <p>Step 3: On Successfull purchasing any plan</p>
          <p>Step 4: You will be credited 4000 points</p>
        </div>
      </div>
    </>
  );
}

export default Rules;
