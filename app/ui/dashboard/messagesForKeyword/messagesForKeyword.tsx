"use client";
import { useState, useEffect } from "react";
import { fetchMessagesByKeyword } from "@/app/lib/data";

const MessagesForKeyword = ({ keyword }: { keyword: string }) => {
  const [messagesKeyword, setMessagesKeyword] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messages = await fetchMessagesByKeyword(keyword);

        setMessagesKeyword(messages);
      } catch (error) {
        console.error("Error fetching messages for keyword:", error);
      }
    };

    fetchData();
  }, [keyword]);

  return (
    <div>
      <h3>Messages containing the keyword "{keyword}":</h3>
      <ul>
        {messagesKeyword.map((message) => (
          <li key={message._id}>{message.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesForKeyword;
