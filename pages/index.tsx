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

const randNumber = () => {
  const min = 5;
  const max = 10;
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const FriendsPage: NextPage = () => {
  const [status, setStatus] = useState("");
  const [pollingStatus, setPollingStatus] = useState("");

  async function pollingProcess(id: IndexableType) {
    setPollingStatus(`Polling ${id} started.`);
    await sleepSec(randNumber());
    // INFO: queuing in real case
    await db.integrations.update(id, { enabled: true });
    // TODO: loope until enabled=true
    setPollingStatus(`Polling ${id} ended.`);
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
      pollingProcess(id);
    } catch (error) {
      // Some error
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
        <p>{pollingStatus}</p>
        <p>{status}</p>
        Integrations:
        <IntegrationList />
        <ResetDatabaseButton />
        <hr></hr>
      </main>
    </div>
  );
};

export default FriendsPage;
