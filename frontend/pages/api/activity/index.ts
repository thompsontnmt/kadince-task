import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../../../src/utils/clients";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const response = await apiClient.activity.getActivity();
    return res.status(200).json(response);
  }
};
export default handler;
