import { NextApiResponse } from "next";
import Property from "@/models/Property";
import connectDB from "@/config/database";

import { NextRequest } from "next/server";
interface Params {
  params: {
    userId: string;
  };
}
export const GET = async (
  req: Request | NextRequest,
  { params }: NextApiResponse & Params
) => {
  try {
    await connectDB();
    const userId = params.userId;
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }
    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("something we wrong", { status: 500 });
  }
};
