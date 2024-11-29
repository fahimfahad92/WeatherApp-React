import { useEffect } from "react";
import "./App.css";
import "./index.css";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import useAuth from "./hooks/useAuth";

function App() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <>
      <div>
        {console.log("Renderng for " + isLoggedIn)}
        {isLoggedIn ? (
          <Dashboard handleLogout={handleLogout} />
        ) : (
          <Login handleLogin={handleLogin} />
        )}
      </div>
    </>
  );
}

export default App;
