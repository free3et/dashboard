import React from "react";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { auth, signOut } from "../../../auth";
import { Session } from "next-auth";

const menuItems = [
  {
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard size={25} />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <FaUsers size={25} />,
      },

      {
        title: "Messages",
        path: "/dashboard/messages",
        icon: <FaRegMessage size={22} />,
      },
      {
        title: "Keywords",
        path: "/dashboard/keywords",
        icon: <IoKeyOutline size={25} />,
      },
    ],
  },
];

export const Sidebar = async () => {
  const session: Session | null = await auth();

  if (!session || !session.user) return;

  const { user } = session;

  console.log(user);

  const { username, image } = user;

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={image || "/noavatar.png"}
          alt="active user"
          width="80"
          height="80"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{username}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat, index) => (
          <li key={index}>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <IoIosLogOut size={30} />
          Logout
        </button>
      </form>
    </div>
  );
};
