import { NextApiRequest, NextApiResponse } from "next";
import Property from "@/models/Property";
import connectDB from "@/config/database";
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something we wrong", { status: 500 });
  }
};

