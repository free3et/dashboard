import React from "react";
import { fetchAllUsers, fetchMessagesForSearch } from "@/app/lib/data";
import { AddMessage } from "@/app/ui/dashboard/messages/addMessage";
import SelectUser from "@/app/ui/dashboard/messages/selectUser";
import styles from "@/app/ui/dashboard/messages/messages.module.css";

import Search from "@/app/ui/dashboard/search/search";

const MessagesPage = async ({ searchParams }: { searchParams: any }) => {
  const users = await fetchAllUsers();
  const plainUsers = JSON.parse(JSON.stringify(users));
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  let messages = [];
  let count = 0;

  if (q) {
    const result = await fetchMessagesForSearch(q, page);
    count = result.count;
    messages = result.messages;
  }

  return (
    <div className={styles.containerMsg}>
      <Search
        placeholder="Search for a message..."
        searchParams={searchParams}
      />
      <div className={styles.wrapper}>
        <SelectUser
          users={plainUsers}
          searchMessages={messages}
          count={count}
        />

        <AddMessage users={plainUsers} />
      </div>
    </div>
  );
};

export default MessagesPage;
