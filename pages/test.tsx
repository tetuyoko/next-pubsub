import type { NextPage } from 'next'
import { GetServerSideProps } from "next";
import Head from 'next/head'
import styles from '../styles/Home.module.css'

type Props = {
  email?: string;
  linked?: boolean;
}

const TestPage: NextPage = (props:Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test Page</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          email: `{props?.email}`
          linked: `{props?.linked?.toString()}`
        </p>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/test.tsx</code>
        </p>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.APP_URI}/api/foobar`)
  const data = await res.json()
  const props: Props = {
    email: data.email,
    linked: data.linked,
  }
  return { props }
}

export default TestPage
