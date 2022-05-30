import type { NextApiRequest, NextApiResponse } from "next";
//import reminderQueue from "./queues/reminder";

type Data = {
  body: any;
};

const sleepSec = (second: number) => {
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);
  const thirdparty_user_id = body.thirdparty_user_id;
  const thirdparty_user_password = body.thirdparty_user_password;
  console.log(`I'll setup the reminder for ${thirdparty_user_id}.`);
  // TODO: Add Integration
  //
  // TODO: Add Some Queue
  //
  //await reminderQueue.enqueue(email, {
  //  id: email,
  //  delay: "8sec",
  //});
  //
  // Info: Belows are Subscriber dummy
  // TODO: Rate balancing
  // TODO: Update Integration
  await sleepSec(3);
  console.log(`Done.`);

  res.status(200).end();
}
