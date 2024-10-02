import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQ":
    case "REGISTER_REQ":
      return { ...state, spinner: true, isAuthenticated: false };

    case "LOAD_FAIL":
    case "LOGOUT_FAIL":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      console.log(action.payload);
      return {
        spinner: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "LOAD_SUCCESS":
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        isAuthenticated: true,
        spinner: false,
        user: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    case "LOGOUT_SUCCESS":
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        user: null,
        spinner: false,
        isAuthenticated: false,
      };

    default:
      break;
  }
};

const initialState = {
  user: {},
  spinner: null,
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  error: null,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const handleSubmit = async (data) => {
    dispatch({
      type: "REGISTER_REQ",
    });

    try {
      const response = await axios.post(
        "https://earning-project.onrender.com/api/user/signup",
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: response.data.Data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "REGISTER_FAIL",
        payload: error.response,
      });
    }
  };

  const loadUser = async () => {
    try {
      const response = await axios.get("https://earning-project.onrender.com/api/user/me", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch({
          type: "LOAD_SUCCESS",
          payload: response.data.Data,
        });
      }
    } catch (error) {
      dispatch({
        type: "LOAD_FAIL",
        payload: error,
      });
    }
  };

  const LoadUser = async () => {
    try {
      const response = await axios.get("https://earning-project.onrender.com/refresh", {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch({
          type: "LOAD_SUCCESS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "LOAD_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  const handleLogin = async (data) => {
    dispatch({
      type: "LOGIN_REQ",
    });

    try {
      const response = await axios.post(
        "https://earning-project.onrender.com/api/user/login",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://earning-project.onrender.com/api/user/logout",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: "LOGOUT_SUCCESS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGOUT_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleSubmit,
        ...state,
        handleLogin,
        loadUser,
        LoadUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
