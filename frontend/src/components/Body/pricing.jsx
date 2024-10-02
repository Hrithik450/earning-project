import { useEffect } from "react";
import "./pricing.css";
import axios from "axios";
import { useAuthContext } from "../../store/context/AuthContext";
import { usePaymentContext } from "../../store/context/paymentContext";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const { handlePlan, LoadPaymentDetails } = usePaymentContext();

  const loadscript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const RazorpayScreen = async (amount, plan) => {
    try {
      const response = await loadscript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!response) {
        console.log("error in react js");
        return;
      }

      const options = {
        key: "rzp_test_vjabmn66zAR3J9",
        amount: amount,
        currency: "INR",
        name: "Softkart",
        description: "paying to Softkart",
        image: "https://papayacoders.com/demo.png",
        handler: async function (response) {
          LoadPaymentDetails(response.razorpay_payment_id, user.email, plan);
        },
        prefill: {
          name: "Softkart",
          email: "mhrithik450@gmail.com",
        },
        theme: {
          color: "#F4C430",
        },
      };

      const paymentobject = new window.Razorpay(options);
      paymentobject.open();
    } catch (error) {
      paymentObject.on("payment.failed", function (response) {
        console.error(response.error);
        alert("Payment failed, please try again.");
      });
    }
  };

  const RazorpayOrder = async (amount, plan) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/payment/checkout",
        { amount, plan },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        RazorpayScreen(response.data.order.amount, plan);
      }
    } catch (error) {
      console.log("Error at", error);
    }
  };

  const handlepayment = (amount, plan) => {
    if (isAuthenticated) {
      RazorpayOrder(amount, plan);
    }
  };

  return (
    <>
      <h1 className="price-heading">Pricing</h1>
      <div className="pricing-container" id="pricing">
        <div className="card">
          <h3 className="card-heading">BASIC</h3>
          <h1 className="card-price">₹399</h1>
          <ul>
            <li>1 time withdrawl per day</li>
            <li>24 x 7 support</li>
            <li>Unlimited Earnings</li>
            <li>valid 1 month</li>
          </ul>
          <button
            className="card-button"
            onClick={() => handlepayment(399, "BASIC")}
          >
            Buy now
          </button>
        </div>

        <div className="card">
          <h3 className="card-heading">PRO</h3>
          <h1 className="card-price">₹449</h1>
          <ul>
            <li>5 time withdrawl per day</li>
            <li>24 x 7 support</li>
            <li>Unlimited Earnings</li>
            <li>valid 3 month</li>
          </ul>
          <button
            className="card-button"
            onClick={() => handlepayment(449, "PRO")}
          >
            Buy now
          </button>
        </div>

        <div className="card">
          <h3 className="card-heading">PREMIUM</h3>
          <h1 className="card-price">₹499</h1>
          <ul>
            <li>unlimited withdrawl</li>
            <li>24 x 7 support</li>
            <li>Unlimited Earnings</li>
            <li>valid 1 year</li>
          </ul>
          <button
            className="card-button"
            onClick={() => handlepayment(499, "PREMIUM")}
          >
            Buy now
          </button>
        </div>
      </div>
    </>
  );
}

export default Pricing;
