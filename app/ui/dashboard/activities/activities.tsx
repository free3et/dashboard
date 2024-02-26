import { fetchAllUsers } from "@/app/lib/data";
import Image from "next/image";
import styles from "./activities.module.css";

const Activities = async () => {
  const users = await fetchAllUsers();

  const usersWithMessageCount = users
    .filter((user) => user.messages.length > 0)
    .map((user) => ({
      username: user.username,
      messageCount: user.messages.length,
      useremail: user.email,
      isActiveNow: user.isActive,
      userphone: user.phone,
    }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users activity</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>

            <th>Messages Count</th>
            <th>User Email</th>
            <th>User Phone</th>
            <th>Is Active Now</th>
          </tr>
        </thead>
        <tbody>
          {usersWithMessageCount.map((user, index) => (
            <tr key={index}>
              <td>
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt=""
                    width={60}
                    height={60}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>

              <td> {user.messageCount}</td>
              <td> {user.useremail}</td>
              <td> {user.userphone}</td>
              <td> {user.isActiveNow.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;
