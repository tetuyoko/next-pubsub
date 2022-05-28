import { Queue } from "quirrel/next";

export default Queue(
  "api/queues/reminder", // the route it's reachable under
  async (recipient) => {
    console.log(`Sending an E-Mail to ${recipient}`);
  }
);