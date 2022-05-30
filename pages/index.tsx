import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { AddIntegrationForm } from "../components/AddIntegrationForm";
import { IntegrationList } from "../components/IntegrationList";
import { ResetDatabaseButton } from "../components/ResetDatabaseButton";

const FriendsPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test Page</title>
      </Head>
      <main className={styles.main}>
        <h1>Integraion with 3rdPartySites by JobQueue</h1>
        <AddIntegrationForm />
        <IntegrationList />
        <ResetDatabaseButton />

        <form
          onSubmit={(evt: any) => {
            evt.preventDefault();
            const formData = new FormData(evt.target);
            const thirdparty_user_id = formData.get("thirdparty_user_id");
            const thirdparty_user_password = formData.get(
              "thirdparty_user_password"
            );
            fetch("/api/setupReminder", {
              method: "POST",
              body: JSON.stringify({
                thirdparty_user_id,
                thirdparty_user_password,
              }),
            });
          }}
        >
          3rdPartyUserId:
          <input
            name="thirdparty_user_id"
            type="text"
            placeholder="thirdparty_user_id"
          />
          3rdPartyUserPassword:
          <input
            name="thirdparty_user_password"
            type="text"
            placeholder="thirdparty_password"
          />
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default FriendsPage;
