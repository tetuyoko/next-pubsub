import type { NextApiRequest, NextApiResponse } from "next";
import reminderQueue from "./queues/reminder";

type Data = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const email = req.body;
  const body = `I'll setup the reminder for ${email}.`;
  console.log(body);
  await reminderQueue.enqueue(email, {
    id: email,
    delay: "8sec",
  });
  res.status(200).json({ body });
}
