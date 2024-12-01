import React from "react";
import { login } from "../../firebase";

import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import styles from "../../styles/Login.module.css";

export default function Login() {
  return (
    <div className={styles.center}>
      <center>
        <h1>Welcome to Weather App</h1>
        <br />
        <Button onClick={login}>
          <Mail />
          Sign In with Google
        </Button>
      </center>
    </div>
  );
}
