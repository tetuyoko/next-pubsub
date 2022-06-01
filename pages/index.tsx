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
import sleepSec from "../lib/sleepSec";
import randNumber from "../lib/randNumber";

const FriendsPage: NextPage = () => {
  const [status, setStatus] = useState("");
  const [pollingStatus, setPollingStatus] = useState("");
  const [trafficStatus, setTrafficStatus] = useState("");

  async function updateTrafficCount() {
    const trafficCount = await db.integrations
      .where("enabled")
      .equals(0)
      .count();
    setTrafficStatus(`Waiting ${trafficCount} tasks.`);
  }

  async function pollingProcess(id: IndexableType) {
    setPollingStatus(`Polling ${id} started.`);
    updateTrafficCount();
    await sleepSec(randNumber(5, 10));
    // INFO: queuing in real case
    await db.integrations.update(id, { enabled: 1 });
    // TODO: loope until enabled=true
    setPollingStatus(`Polling ${id} ended.`);
    // TODO: separate
    updateTrafficCount();
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
        enabled: 0,
      });
      pollingProcess(id);
    } catch (error) {
      // TODO: Handle error
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
        <p>main: {status}</p>
        <p>polling: {pollingStatus}</p>
        <p>traffic: {trafficStatus}</p>
        Integrations:
        <IntegrationList />
        <ResetDatabaseButton />
        <hr></hr>
      </main>
    </div>
  );
};

export default FriendsPage;
