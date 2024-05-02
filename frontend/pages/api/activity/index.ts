import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../../../src/utils/clients";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    let isComplete;
    if (typeof req.query.isComplete === 'string') {
      isComplete = req.query.isComplete.toLowerCase() === 'true';
    } else {
      '';
    }
    const response = await apiClient.activity.getActivity(isComplete);
    return res.status(200).json(response);
  } else if (req.method === "POST") {
    const response = await apiClient.activity.postActivity(req.body);
    return res.status(200).json(response);
  }
};
export default handler;
