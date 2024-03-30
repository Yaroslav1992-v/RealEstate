import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextApiRequest, NextApiResponse } from "next";
export const dynamic = "force-dynamic";
export const POST = async (
  req: NextApiRequest & {
    json: () => { propertyId: string };
  },
  res: NextApiResponse
) => {
  try {
    await connectDB();
    const { propertyId } = await req.json();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.id) {
      return new Response(JSON.stringify("User Id Is Required"), {
        status: 401,
      });
    }

    const userId = sessionUser.id;
    const user = await User.findOne({ _id: userId });
    let isBookmarked = user.bookmarks.includes(propertyId);

    await user.save();
    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
