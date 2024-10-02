import axios from "axios";
import { createContext, useContext, useReducer } from "react";
const DataContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "COIN_REQUEST":
      return {
        ...state,
        coins: 0,
      };

    case "COIN_SUCCESS":
      return {
        ...state,
        coins: action.paylaod,
      };

    case "COIN_FAIl":
      return {
        ...state,
        error: action.paylaod,
      };

    default:
      return state;
  }
};

const initialState = {
  error: null,
  coins: 0,
};

function GamaDataProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const handleCoins = async (coin) => {
    console.log(coin);
    dispatch({
      type: "COIN_REQUEST",
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/Updatecoin",
        { coin },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "COIN_SUCCESS",
          paylaod: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "COIN_FAIl",
        paylaod: error.response.data.message,
      });
    }
  };

  return (
    <DataContext.Provider value={{ handleCoins }}>
      {children}
    </DataContext.Provider>
  );
}

const useGameContext = () => {
  return useContext(DataContext);
};

export { useGameContext, GamaDataProvider };
