import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const POST = async (req: Request | NextRequest) => {
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
    const { message } = await req.json();
    if (user.id === message.recipient) {
      return new Response(
        JSON.stringify({ message: "Can't send to yourself" }),
        { status: 400 }
      );
    }
    const newMessage = new Message({
      ...message,
      sender: user.id,
    });
    await newMessage.save();
    return new Response(JSON.stringify({ message: "Message Sent" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error parsing JSON:");
    return new Response(error as string, { status: 500 });
  }
};
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.id) {
      return new Response(JSON.stringify("User Id Is Required"), {
        status: 401,
      });
    }
    const userId = sessionUser.id;
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "username");
    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "username");
    const messages = [...unreadMessages, ...readMessages];
    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
