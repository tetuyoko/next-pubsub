import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import UUID from "uuidjs";

import { db } from "../models/db";
import styles from "../styles/Home.module.css";

// import { AddIntegrationForm } from "../components/AddIntegrationForm";
import { IntegrationList } from "../components/IntegrationList";
import { ResetDatabaseButton } from "../components/ResetDatabaseButton";
import { IndexableType } from "dexie";

const sleepSec = (second: number) => {
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
};

const FriendsPage: NextPage = () => {
  const [status, setStatus] = useState("");
  const [pollingStatus, setPollingStatus] = useState("");

  async function pollingProcess(id: IndexableType) {
    setPollingStatus(`Polling started.`);
    await sleepSec(3);
    // INFO: queuing in real case
    const updated = await db.integrations.update(id, { enabled: true });
    if (updated) {
      setStatus(`Integration ${id} updated.`);
    }
    await sleepSec(2);
    // TODO: loope until enabled=true
    setPollingStatus(`Polling ended.`);
  }

  async function registerIntegration(evt: any) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const thirdparty_user_id =
      formData.get("thirdparty_user_id")?.toString() || "";
    const thirdparty_user_password =
      formData.get("thirdparty_user_password")?.toString() || "";
    const uuid = UUID.genV4().hexNoDelim;

    try {
      const id = await db.integrations.add({
        thirdparty_user_id,
        thirdparty_user_password,
        user_id: uuid,
        enabled: false,
      });
      setStatus(`Integration ${id} registration started.`);
      pollingProcess(id);
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
        <p>{pollingStatus}</p>
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
        <hr></hr>
        <h3>Debug:</h3>
        Integrations:
        <IntegrationList />
        <ResetDatabaseButton />
        <hr></hr>
      </main>
    </div>
  );
};

export default FriendsPage;
