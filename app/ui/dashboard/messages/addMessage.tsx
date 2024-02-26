import { addMessage } from "@/app/lib/actions";
import { UserFormData } from "@/app/types/types";
import styles from "@/app/ui/dashboard/messages/messages.module.css";

export const AddMessage = ({ users }: { users: UserFormData[] }) => {
  return (
    <div className={styles.container}>
      <form action={addMessage} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor="userId" className={styles.title}>
            Lets's add a message!
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
    </div>
  );
};
