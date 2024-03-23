import { NextApiRequest, NextApiResponse } from "next";
import Property from "@/models/Property";
import connectDB from "@/config/database";
interface Params {
  params: { id: string };
}
export const GET = async (req: NextApiRequest, { params }: Params) => {
  try {
    await connectDB();
    const property = await Property.findById((params.id as string) || "");

    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response("something we wrong", { status: 500 });
  }
};
