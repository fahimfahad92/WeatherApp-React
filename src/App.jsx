import { useEffect } from "react";
import "./App.css";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import useAuth from "./hooks/useAuth";

function App() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <>
      <div>Weather APP Project</div>
      {console.log("Renderng for " + isLoggedIn)}
      {isLoggedIn ? (
        <Dashboard handleLogout={handleLogout} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
