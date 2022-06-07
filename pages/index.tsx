import { Formik, Form } from "formik";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import UUID from "uuidjs";
import { db } from "../models/db";
// import styles from "../styles/Home.module.css";
import { TableView } from "../components/TableView";
import { Toast } from "../components/Toast";
import { Statistics } from "../components/Statistics";
import { AddIntegrationForm } from "../components/AddIntegrationForm";
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

  // TODO: refs: https://chakra-ui.com/docs/components/form/form-control
  // TODO: use table https://chakra-ui.com/docs/components/data-display/table#table-container
  return (
    <>
      <Flex
        minH={"10vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Head>
          <title>Test Page</title>
        </Head>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Async form simulator
          </Heading>
          <Formik
            initialValues={{}}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <FormControl id="thirdparty_user_id" isRequired>
                  <FormLabel>3rd Party&apos;s UserId</FormLabel>
                  <Input
                    placeholder="your-thirdparty-user-id"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="thirdparty_user_password" isRequired>
                  <FormLabel>3rd Party&apos;s Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    type="submit"
                    isLoading={props.isSubmitting}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
      <Toast></Toast>
      <Statistics></Statistics>
      <TableView></TableView>
    </>
  );

  //return (
  //  <div className={styles.container}>
  //    <Head>
  //      <title>Test Page</title>
  //    </Head>
  //    <main className={styles.main}>
  //      <h1>Aync form simulator</h1>
  //      {
  //        // <AddIntegrationForm />
  //      }
  //      <form onSubmit={(evt) => registerIntegration(evt)}>
  //        UserId:
  //        <input
  //          name="thirdparty_user_id"
  //          type="text"
  //          placeholder="thirdparty_user_id"
  //        />
  //        Password:
  //        <input
  //          name="thirdparty_user_password"
  //          type="text"
  //          placeholder="thirdparty_password"
  //        />
  //        <button type="submit">Submit</button>
  //      </form>
  //      <hr></hr>
  //      <h3>Debug:</h3>
  //      <p>main: {status}</p>
  //      <p>polling: {pollingStatus}</p>
  //      <p>traffic: {trafficStatus}</p>
  //      Integrations:
  //      <IntegrationList />
  //      <ResetDatabaseButton />
  //      <hr></hr>
  //    </main>
  //  </div>
  //);
};

export default FriendsPage;
