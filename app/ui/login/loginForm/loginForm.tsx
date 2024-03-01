"use client";
import React from "react";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { authenticate, googleAuthenticate } from "../../../lib/actions";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  const [errorMsgGoogle, dispatchGoogle] = useFormState(
    googleAuthenticate,
    undefined
  );

  return (
    <div className={styles.wrapper}>
      <form action={formAction} className={styles.form}>
        <h2 className={styles.title}>Fill in your username and password</h2>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login</button>

        {state && state}
      </form>
      <form className={styles.googleform} action={dispatchGoogle}>
        <button>Google Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;
