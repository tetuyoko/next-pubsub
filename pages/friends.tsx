import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { AddFriendForm } from "../components/AddFriendForm";
import { FriendList } from "../components/FriendList";

const FriendsPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test Page</title>
      </Head>

      <main className={styles.main}>
        <h1>My simple Dexie app</h1>
        <h2>Add Friend</h2>
        <AddFriendForm defaultAge={21} />
        <h2>Friend List</h2>
        <FriendList />
      </main>
    </div>
  );
};

export default FriendsPage;
