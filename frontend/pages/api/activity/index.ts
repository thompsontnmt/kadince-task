import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../../../src/utils/clients";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const response = await apiClient.activity.getActivity();
    return res.status(200).json(response);
  } else if (req.method === "POST") {
    const response = await apiClient.activity.postActivity(req.body);
    return res.status(200).json(response);
  }
};
export default handler;
