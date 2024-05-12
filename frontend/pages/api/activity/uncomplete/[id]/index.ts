import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../../../../../src/utils/clients";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Number(req.query.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid activity id." });
  }
  if (req.method === "PUT") {
    const response = await apiClient.activity.putActivityUncomplete(id);
    return res.status(200).json(response);
  }
};
export default handler;
