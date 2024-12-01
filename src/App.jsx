import "./App.css";
import "./index.css";

import React from "react";
import { auth } from "./firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/business/Login";
import Dashboard from "./components/business/Dashboard.jsx";

function App() {
  const [user] = useAuthState(auth);
  return user ? <Dashboard /> : <Login />;
}

export default App;
