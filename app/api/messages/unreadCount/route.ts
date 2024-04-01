import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    await connectDB();
    const user = await getSessionUser();

    if (!user) {
      return new Response(
        JSON.stringify({
          message: "You need to be logged in to send the message",
        }),
        {
          status: 401,
        }
      );
    }

    const unreadMessages = await Message.countDocuments({
      recipient: user.id,
      read: false,
    });

    return new Response(JSON.stringify({ count: unreadMessages }), {
      status: 200,
    });
  } catch (error) {
    console.error("Something went wrongs");
    return new Response("Something went wrong", { status: 500 });
  }
};
