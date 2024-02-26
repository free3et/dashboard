"use client";

import React, { useEffect, useState } from "react";
import {
  deleteMessage,
  messageByUserId,
  reactToMessage,
} from "@/app/lib/actions";
import { SimplifiedMessagesProp, UserFormData } from "@/app/types/types";
import styles from "@/app/ui/dashboard/messages/messages.module.css";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { FaRegMessage } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const SelectUser = ({
  users,
  searchMessages,
  count,
}: {
  users: UserFormData[];
  count: number;
  searchMessages: SimplifiedMessagesProp[];
}) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [liked, setLiked] = useState<{ [messageId: string]: boolean }>({});
  const [messages, setMessages] = useState<SimplifiedMessagesProp[]>([]);
  const [filters, setFilters] = useState({
    date: "",
    liked: false,
  });

  const handleUserSelect = async () => {
    try {
      const formData = new FormData();
      formData.append("user", selectedUser);
      formData.append("filters", JSON.stringify(filters));

      const { simplifiedMessages } = await messageByUserId(formData);
      setMessages(simplifiedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({ ...filters, [filterType]: value });
  };

  useEffect(() => {
    const initialLikedState: { [messageId: string]: boolean } = {};
    messages?.forEach((message) => {
      if (message.reactions?.liked) {
        initialLikedState[message._id] = true;
      }
    });
    setLiked(initialLikedState);
  }, [messages]);

  const handleApplyFilters = async () => {
    try {
      const formData = new FormData();
      formData.append("user", selectedUser);
      formData.append("filters", JSON.stringify(filters));

      const { simplifiedMessages } = await messageByUserId(formData);
      setMessages(simplifiedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReact = async (messageId: string, userId: string) => {
    try {
      if (!userId) {
        console.error("User ID is undefined or empty");
        return;
      }
      const { success } = await reactToMessage(messageId, userId);

      if (success) {
        const isAlreadyLiked = messages.find(
          (message) => message._id === messageId && message.reactions?.liked
        );

        setLiked((prevLiked) => ({
          ...prevLiked,
          [messageId]: !!isAlreadyLiked,
        }));

        handleUserSelect();
      } else {
        console.error(`Failed to react to message with ID: ${messageId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.title}>Select Filtres:</label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUserSelect();
        }}
        className={styles.form}
      >
        <label>User:</label>
        <select
          name="user"
          id="userSelect"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">All Users</option>
          {users?.map((user) => (
            <option key={user._id} value={user._id.toString()}>
              {user.username}
            </option>
          ))}
        </select>
        <div className={styles.filters}>
          <label>Date:</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              handleFilterChange("date", e.target.value.toString())
            }
          />
        </div>
        <div className={styles.filters}>
          <label>Liked:</label>

          <input
            type="checkbox"
            checked={filters.liked}
            className={styles.liked}
            onChange={(e) =>
              handleFilterChange("liked", e.target.checked.toString())
            }
          />
        </div>
        <button
          type="button"
          className={styles.btn}
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </form>

      <div>
        <h4 className={styles.title}>Messages for </h4>
        <ul>
          {messages?.map((message, index) => (
            <li key={index} className={styles.list}>
              <FaRegMessage className={styles.msgIcon} />
              <strong className={styles.username}>{message.username}:</strong>
              {message.comment}
              {liked[message._id] && message?.reactions?.liked === true ? (
                <FaHeart
                  className={styles.svgFill}
                  onClick={() => handleReact(message._id, message.user)}
                />
              ) : (
                <CiHeart
                  className={styles.svg}
                  onClick={() => handleReact(message._id, message.user)}
                />
              )}
              <MdDeleteOutline
                size={22}
                className={styles.svg}
                onClick={() => deleteMessage(message._id)}
              />
            </li>
          ))}
          {searchMessages && <h4 className={styles.title}>We founded </h4>}
          {searchMessages?.map(
            (message: SimplifiedMessagesProp, index: number) => (
              <li key={index} className={styles.list}>
                <FaRegMessage className={styles.msgIcon} />
                <strong className={styles.username}>{message.username}:</strong>
                {message.comment}
                {liked[message._id] && message?.reactions?.liked === true ? (
                  <FaHeart
                    className={styles.svgFill}
                    onClick={() => handleReact(message._id, message.user)}
                  />
                ) : (
                  <CiHeart
                    className={styles.svg}
                    onClick={() => handleReact(message._id, message.user)}
                  />
                )}
                <MdDeleteOutline
                  size={22}
                  className={styles.svg}
                  onClick={() => deleteMessage(message._id)}
                />
              </li>
            )
          )}
        </ul>
        {(searchMessages || messages) &&
          (searchMessages || messages).length === 0 && (
            <h4 className={styles.noMsg}>There are no messages yet</h4>
          )}
      </div>

      <Pagination count={count} />
    </div>
  );
};

export default SelectUser;
