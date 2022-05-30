import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../models/db";
//import reminderQueue from "./queues/reminder";

import UUID from "uuidjs";

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

  try {
    const uuid = UUID.genV4().hexNoDelim;
    const id = await db.integrations.add({
      thirdparty_user_id,
      thirdparty_user_password,
      user_id: uuid, // TODO: Use random string
      enabled: false,
    });
    console.log(`successfully added ${id}.`);
  } catch (error) {
    console.log(error);
  }

  // Info: Belows are Subscriber dummy. needs enqueu
  // TODO: Rate balancing

  await sleepSec(3);

  // TODO: Update Integration

  res.status(200).end();
}
