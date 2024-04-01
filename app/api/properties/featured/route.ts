import { NextApiRequest, NextApiResponse } from "next";
import Property from "@/models/Property";
import connectDB from "@/config/database";
interface AddtitionalData {
  url: string;
}
export const GET = async (
  req: NextApiRequest & AddtitionalData,
  res: NextApiResponse
) => {
  try {
    await connectDB();

    const properties = await Property.find({ is_featured: true });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something we wrong", { status: 500 });
  }
};
