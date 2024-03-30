import connectDB from "@/config/database";
import Property from "@/models/Property";
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
    let message;
    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
export const GET = async (
  req: NextApiRequest,

  res: NextApiResponse
) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.id) {
      return new Response(JSON.stringify("User Id Is Required"), {
        status: 401,
      });
    }
    const userId = sessionUser.id;
    const user = await User.findOne({ _id: userId });
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
