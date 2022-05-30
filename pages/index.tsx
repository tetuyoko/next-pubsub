import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

// import { AddIntegrationForm } from "../components/AddIntegrationForm";
import { IntegrationList } from "../components/IntegrationList";
import { ResetDatabaseButton } from "../components/ResetDatabaseButton";

const FriendsPage: NextPage = () => {
  const [status, setStatus] = useState("");

  async function registerIntegration(evt: any) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const thirdparty_user_id = formData.get("thirdparty_user_id");
    const thirdparty_user_password = formData.get("thirdparty_user_password");
    try {
      // TODO: Init polling
      fetch("/api/setupIntegration", {
        method: "POST",
        body: JSON.stringify({
          thirdparty_user_id,
          thirdparty_user_password,
        }),
      });
      setStatus(`Integration ${thirdparty_user_id} registration started.`);
    } catch (error) {
      setStatus(`Failed to add ${thirdparty_user_id}: ${error}`);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Test Page</title>
      </Head>
      <main className={styles.main}>
        <h1>Integraion with 3rdPartySites by JobQueue</h1>
        {
          // <AddIntegrationForm />
        }
        <p>{status}</p>
        <form onSubmit={(evt) => registerIntegration(evt)}>
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
      <hr></hr>
      <h3>Debug:</h3>
      Integrations:
      <IntegrationList />
      <ResetDatabaseButton />
      <hr></hr>
    </div>
  );
};

export default FriendsPage;
