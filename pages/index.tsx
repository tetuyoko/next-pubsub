import { Formik, Form, Field, FormikHelpers } from "formik";
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
import { TableView } from "../components/TableView";
import { Statistics } from "../components/Statistics";
import { ResetDatabaseButton } from "../components/ResetDatabaseButton";
import { IndexableType } from "dexie";
import randNumber from "../lib/randNumber";
import sleepSec from "../lib/sleepSec";

interface Values {
  thirdparty_user_id: string;
  thirdparty_user_password: string;
}

const TopPage: NextPage = () => {
  const [status, setStatus] = useState("");
  const [pollingStatus, setPollingStatus] = useState("");
  const [trafficStatus, setTrafficStatus] = useState("");
  const toast = useToast();

  async function pollingProcess(id: IndexableType) {
    await sleepSec(randNumber(5, 10));
    // INFO: queuing in real case
    await db.integrations.update(id, { enabled: 1 });
  }

  async function registerIntegration(values: Values, setSubmitting: Function) {
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
      setSubmitting(false);
      toast({
        title: "Integration created.",
        status: "success",
        duration: 3000,
        position: "top",
      });
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
            // TODO: comment out for test multiple run
            setSubmitting(false);
            toast({
              title: "Integration started.",
              status: "loading",
              duration: 3000,
              position: "top",
            });
            registerIntegration(values, setSubmitting);
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
                  {({ field, form }: { field: any; form: any }) => (
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
                  {({ field, form }: { field: any; form: any }) => (
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
      <ResetDatabaseButton />
      <TableView></TableView>
    </>
  );
};

export default TopPage;
