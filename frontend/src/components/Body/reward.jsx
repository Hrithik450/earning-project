import "./reward.css";
import { FaCoins } from "react-icons/fa6";

function Reward() {
  const handleRedeem = (amount, points) => {};

  return (
    <>
      <h1 className="price-heading">Rewards</h1>
      <div className="reward-container" id="rewards">
        <div>
          <div className="reward-card-container">
            <h3 className="reward-heading">₹100</h3>
            <div className="reward-label">
              <FaCoins style={{ color: "gold" }} />
              2000 Points
            </div>
            <button
              className="reward-button"
              onClick={() => handleRedeem(100, 2000)}
            >
              <FaCoins style={{ color: "gold" }} />
              2000
            </button>
          </div>

          <div className="reward-card-container">
            <h3 className="reward-heading">₹200</h3>
            <div className="reward-label">
              <FaCoins style={{ color: "gold" }} />
              4000 Points
            </div>
            <button
              className="reward-button"
              onClick={() => handleRedeem(200, 4000)}
            >
              <FaCoins style={{ color: "gold" }} />
              4000
            </button>
          </div>

          <div className="reward-card-container">
            <h3 className="reward-heading">₹500</h3>
            <div className="reward-label">
              <FaCoins style={{ color: "gold" }} />
              10000 Points
            </div>
            <button
              className="reward-button"
              onClick={() => handleRedeem(500, 10000)}
            >
              <FaCoins style={{ color: "gold" }} />
              10000
            </button>
          </div>
        </div>
        <div>
          <div className="reward-card-container">
            <h3 className="reward-heading">₹1000</h3>
            <div className="reward-label">
              <FaCoins style={{ color: "gold" }} />
              20000 Points
            </div>
            <button
              className="reward-button"
              onClick={() => handleRedeem(1000, 20000)}
            >
              <FaCoins style={{ color: "gold" }} />
              20000
            </button>
          </div>

          <div className="reward-card-container">
            <h3 className="reward-heading">₹2500</h3>
            <div className="reward-label">
              <FaCoins style={{ color: "gold" }} />
              50000 Points
            </div>
            <button
              className="reward-button"
              onClick={() => handleRedeem(2500, 50000)}
            >
              <FaCoins style={{ color: "gold" }} />
              50000
            </button>
          </div>

          <div className="reward-card-container">
            <h3 className="reward-heading">₹5000</h3>
            <div className="reward-label">
              <FaCoins style={{ color: "gold" }} />
              100000 Points
            </div>
            <button
              className="reward-button"
              onClick={() => handleRedeem(5000, 100000)}
            >
              <FaCoins style={{ color: "gold" }} />
              100000
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reward;
