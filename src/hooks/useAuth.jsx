// import { useState, useEffect } from "react";

// export default function useAuth() {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     JSON.parse(localStorage.getItem("isLoggedIn"))
//   );

//   const handleLogin = () => {
//     localStorage.setItem("isLoggedIn", true);
//     setIsLoggedIn(true);
//     console.log("isLoggedIn updated to true");
//   };

//   const handleLogout = () => {
//     localStorage.setItem("isLoggedIn", false);
//     setIsLoggedIn(false);
//     console.log("auisLoggedInth updated to false");
//   };

//   useEffect(() => {
//     // checking the initial state
//     console.log("User logged in ? during first app load " + isLoggedIn);
//   }, []);

//   return { isLoggedIn, setIsLoggedIn, handleLogin, handleLogout };
// }
