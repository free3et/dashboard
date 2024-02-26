"use client";
import React from "react";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { authenticate } from "../../../lib/actions";
import { GoogleButton } from "./GoogleButton";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <>
      <form action={formAction} className={styles.form}>
        <h2 className={styles.title}>Fill in your username and password</h2>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login</button>

        {state && state}
        {/*   <GoogleButton /> */}
      </form>
    </>
  );
};

export default LoginForm;
