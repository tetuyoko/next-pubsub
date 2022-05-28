import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";

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
        <h1>My simple Dexie app</h1>
        <h2>Add Friend</h2>
        <AddIntegrationForm defaultAge={21} />
        <h2>Friend List</h2>
        <IntegrationList />
        <ResetDatabaseButton />
      </main>
    </div>
  );
};

export default FriendsPage;
