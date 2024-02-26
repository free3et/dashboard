"use client";

import React from "react";
import { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/keywords/keywords.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { deleteKeyword, messageByKeyword } from "@/app/lib/actions";
import { FaRegMessage } from "react-icons/fa6";
import { KeywordsProps, SimplifiedMessagesProp } from "@/app/types/types";

const highlightKeywords = (text: string, keyword: string) => {
  const regex = new RegExp(`\\b${keyword}\\b`, "gi");
  return text.replace(
    regex,
    (match) => `<span class="highlight">${match}</span>`
  );
};

interface KeywordsSearchResultProps {
  plainKeywords: KeywordsProps[];
  success: boolean;
  searchMessage: string;
  keywordsData: KeywordsProps[] | { error: string };
}

interface MessageState {
  type: string;
  text: string;
}

export const KeywordsSearchResult: React.FC<KeywordsSearchResultProps> = ({
  plainKeywords,
  success,
  searchMessage,
  keywordsData,
}) => {
  const [message, setMessage] = useState<MessageState | null>(null);
  const [keywordsList, setKeywordsList] = useState(plainKeywords);
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [messages, setMessages] = useState<SimplifiedMessagesProp[]>([]);

  useEffect(() => {
    if (success) {
      setMessage({ type: "success", text: searchMessage });
    } else {
      setMessage({ type: "error", text: searchMessage });
    }
  }, [searchMessage]);

  useEffect(() => {
    setKeywordsList(plainKeywords);
  }, [keywordsData]);

  const handleKeywordClick = async () => {
    try {
      const formData = new FormData();
      formData.append("keywordname", selectedKeyword);

      const { messagesData } = await messageByKeyword(formData);
      console.log("Messages data received:", messagesData);

      setMessages(messagesData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ul className={styles.keyWrapper}>
        {keywordsList.map((item, index) => (
          <li
            key={index}
            className={styles.key}
            onClick={() => deleteKeyword(item._id)}
          >
            {item.keywords}
            <MdDeleteOutline size={22} />
          </li>
        ))}
      </ul>
      {message && (
        <div
          className={message.type === "success" ? styles.success : styles.error}
        >
          {message.text}
        </div>
      )}
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleKeywordClick();
        }}
      >
        <select
          name="keywordname"
          id="keywordid"
          onChange={(e) => setSelectedKeyword(e.target.value)}
        >
          <option value="">All keywords</option>
          {keywordsList?.map((item) => (
            <option key={item._id} value={item.keywords}>
              {item.keywords}
            </option>
          ))}
        </select>
        <button className={styles.btn}>Find messages</button>
      </form>

      <div>
        {messages.length > 0 && (
          <h3 className={styles.title}>
            Messages containing the keyword `&quot;`{selectedKeyword}`&quot;`:
          </h3>
        )}
        <ul>
          {messages.length > 0 ? (
            messages.map((message) => (
              <>
                <li key={message._id} className={styles.list}>
                  <FaRegMessage className={styles.msgIcon} />
                  {message?.user?.username && (
                    <span className={styles.username}>
                      {message.user.username}:
                    </span>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(
                        message.comment,
                        selectedKeyword
                      ),
                    }}
                  />
                </li>
              </>
            ))
          ) : (
            <h3 className={styles.error}>No messages</h3>
          )}
        </ul>
      </div>
    </>
  );
};
