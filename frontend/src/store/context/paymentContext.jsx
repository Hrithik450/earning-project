import { createContext, useContext, useReducer, useState } from "react";
import axios from "axios";
const paymentContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "PAYMENT_SUCCESS":
      return {
        ...state,
        isplan: true,
      };

    case "PAYMENT_FAIL":
      return {
        ...state,
        isplan: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  isplan: null,
  error: null,
};

function PaymentProvider({ children }) {
  const [plan, setplan] = useState(null);
  const [state, dispatch] = useReducer(Reducer, initialState);

  const handlePlan = (plan) => {
    setplan(plan);
  };

  const LoadPaymentDetails = async (paymentid, email, plan) => {
    try {
      const response = await axios.post(
        `https://earning-project.onrender.com/payment/${paymentid}`,
        { email, plan },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch({
          type: "PAYMENT_SUCCESS",
          payload: response.data.payment,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "PAYMENT_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <paymentContext.Provider
      value={{ ...state, handlePlan, LoadPaymentDetails }}
    >
      {children}
    </paymentContext.Provider>
  );
}

const usePaymentContext = () => {
  return useContext(paymentContext);
};

export { paymentContext, PaymentProvider, usePaymentContext };
