"use client";

import React from "react";
import { signIn } from "next-auth/react";
const handleGoogleSignIn = async () => {
  await signIn("google", { callbackUrl: "/dashboard" });
};

export const GoogleButton = () => {
  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
};
