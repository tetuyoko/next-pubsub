import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHandlers,
  FormikHelpers,
} from "formik";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import UUID from "uuidjs";
import { db } from "../models/db";
// import styles from "../styles/Home.module.css";
import { TableView } from "../components/TableView";
import { Statistics } from "../components/Statistics";
import { AddIntegrationForm } from "../components/AddIntegrationForm";
import { IntegrationList } from "../components/IntegrationList";
import { ResetDatabaseButton } from "../components/ResetDatabaseButton";
import { IndexableType } from "dexie";
import sleepSec from "../lib/sleepSec";
import randNumber from "../lib/randNumber";
import { identity } from "lodash";

interface Values {
  thirdparty_user_id: string;
  thirdparty_user_password: string;
}

const FriendsPage: NextPage = () => {
  const [status, setStatus] = useState("");
  const [pollingStatus, setPollingStatus] = useState("");
  const [trafficStatus, setTrafficStatus] = useState("");
  const toast = useToast();

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
    // await sleepSec(randNumber(5, 10));
    await sleepSec(3);
    // INFO: queuing in real case
    await db.integrations.update(id, { enabled: 1 });
    // TODO: loope until enabled=true
    setPollingStatus(`Polling ${id} ended.`);
    // TODO: separate
    updateTrafficCount();
  }

  async function registerIntegration(values: Values) {
    const thirdparty_user_id = values.thirdparty_user_id;
    const thirdparty_user_password = values.thirdparty_user_password;
    const uuid = UUID.genV4().hexNoDelim;

    try {
      const id = await db.integrations.add({
        thirdparty_user_id,
        thirdparty_user_password,
        user_id: uuid,
        enabled: 0,
      });
      await pollingProcess(id);
    } catch (error) {
      // TODO: Handle error
    }
  }

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
        <Formik
          initialValues={{
            thirdparty_user_id: "",
            thirdparty_user_password: "",
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            registerIntegration(values);
            setTimeout(() => {
              toast({
                title: "Integration created.",
                status: "success",
                duration: 3000,
                position: "top",
              });
              setSubmitting(false);
            }, 5000);
          }}
        >
          {(props) => (
            <Form>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                  Async form simulator
                </Heading>

                <Field name="thirdparty_user_id">
                  {({ field, form }) => (
                    <FormControl isRequired>
                      <FormLabel>3rd Party&apos;s UserId</FormLabel>
                      <Input
                        {...field}
                        placeholder="your-thirdparty-user-id"
                        type="text"
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="thirdparty_user_password">
                  {({ field, form }) => (
                    <FormControl isRequired>
                      <FormLabel>3rd Party&apos;s Password</FormLabel>
                      <Input {...field} type="password" />
                    </FormControl>
                  )}
                </Field>
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
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
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
