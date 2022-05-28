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
      </main>
    </div>
  );
};

export default FriendsPage;
