import React from "react";
import { fetchAllKeywords, fetchAllMessages, fetchAllUsers } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Activities from "../ui/dashboard/activities/activities";

const Dashboard = async () => {
  const users = await fetchAllUsers();
  const keywordsData = await fetchAllKeywords();
  const messagesData = await fetchAllMessages();

  const cards = [
    {
      id: 1,
      title: "Total Users",
      number: Array.isArray(users) ? users.length : 0,
      change: 12,
      icon: "FaUsers",
    },
    {
      id: 2,
      title: "Keywords",
      number: Array.isArray(keywordsData) ? keywordsData.length : 0,
      change: 5,
      icon: "IoKeyOutline",
    },
    {
      id: 3,
      title: "Messages",
      number: Array.isArray(messagesData) ? messagesData.length : 0,
      change: 18,
      icon: "FaRegMessage",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        {/* @ts-ignore */}
        <Activities />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
