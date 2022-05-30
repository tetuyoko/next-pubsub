import type { NextApiRequest, NextApiResponse } from "next";
import reminderQueue from "./queues/reminder";

type Data = {
  body: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //console.log(JSON.parse(req.body).thirdparty_user_id);
  //console.log(JSON.parse(req.body).thirdparty_user_password);
  await reminderQueue.enqueue(email, {
    id: email,
    delay: "8sec",
  });
  res.status(200);
}
