import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { AuthProvider } from "./store/context/AuthContext.jsx";
import { PaymentProvider } from "./store/context/paymentContext.jsx";
import { GamaDataProvider } from "./store/context/gameContext.jsx";

createRoot(document.getElementById("root")).render(
  <GamaDataProvider>
    <PaymentProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PaymentProvider>
  </GamaDataProvider>
);
