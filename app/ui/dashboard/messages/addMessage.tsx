"use client";

import React, { useState } from "react";
import { addMessage } from "@/app/lib/actions";
import { UserFormData } from "@/app/types/types";
import styles from "@/app/ui/dashboard/messages/messages.module.css";

interface MessageState {
  type: string;
  text?: string;
}

export const AddMessage = ({ users }: { users: UserFormData[] }) => {
  const [message, setMessage] = useState<MessageState | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await addMessage(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
    } else if (result.error) {
      setMessage({ type: "error", text: result.error });
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor="userId" className={styles.title}>
            Lets&apos;s add a message!
          </label>
          <select name="userId" id="userId">
            {users?.map((user) => (
              <option key={user._id} value={user._id.toString()}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="comment" className={styles.title}>
            Message:
          </label>
          <input type="text" name="comment" id="comment" />
        </div>
        <button type="submit" className={styles.addMsg}>
          Add Message
        </button>
      </form>
      {message && (
        <div
          className={message.type === "success" ? styles.success : styles.error}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};
