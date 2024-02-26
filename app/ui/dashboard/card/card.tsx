import React from "react";
import styles from "./card.module.css";
import { FaUsers } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";

interface CardProps {
  item: {
    title: string;
    number: number;
    change: number;
    icon: string;
  };
}

interface IconsMap {
  [key: string]: JSX.Element;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const iconsMap: IconsMap = {
    FaUsers: <FaUsers size={25} />,
    IoKeyOutline: <IoKeyOutline size={25} />,
    FaRegMessage: <FaRegMessage size={22} />,
  };

  return (
    <div className={styles.container}>
      {iconsMap[item.icon]}
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>{item.number}</span>
        <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than the previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
