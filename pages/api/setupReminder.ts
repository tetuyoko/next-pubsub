// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  body: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const email = req.body;
  const body = `I'll setup the reminder for ${email}.`;
  console.log(body);
  res.status(200).json({ body });
}
