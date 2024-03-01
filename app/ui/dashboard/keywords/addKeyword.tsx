"use client";

import React from "react";
import { addKeywords } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/keywords/keywords.module.css";
import { useState } from "react";

interface KeywordsState {
  type: string;
  text?: string;
}

export const AddKeyword = () => {
  const [message, setMessage] = useState<KeywordsState | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await addKeywords(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
    } else if (result.error) {
      setMessage({ type: "error", text: result.error });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label className={styles.title}>Let&apos;s add a keyword!</label>

          <label htmlFor="keyword" className={styles.title}>
            Keyword text:
          </label>
          <input type="text" name="keyword" id="keyword" />
        </div>
        <button type="submit" className={styles.addMsg}>
          Add Keyword
        </button>
      </form>

      {message && (
        <div
          className={message.type === "success" ? styles.success : styles.error}
        >
          {message.text}
        </div>
      )}
    </>
  );
};
