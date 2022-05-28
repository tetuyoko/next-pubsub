import { Queue } from "quirrel/next";

const wait = (sec: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, sec * 1000);
  });
};

export default Queue(
  "api/queues/reminder", // the route it's reachable under
  async (recipient: string) => {
    console.log(`Sending an E-Mail to ${recipient}`);
    await wait(3);
    console.log(`Done`);
  }
);
