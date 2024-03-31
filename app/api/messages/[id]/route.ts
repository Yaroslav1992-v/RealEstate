import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextApiRequest, NextApiResponse } from "next";

interface Params {
  params: { id: string };
}
export const dynamic = "force-dynamic";
export const PUT = async (req: NextApiRequest & Params, res: Params) => {
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

    const message = await Message.findById(res.params.id);
    if (!message) {
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });
    }
    if (message.recipient.toString() !== user.id) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 404,
      });
    }

    if (user.id === message.recipient) {
      return new Response("Unauthorized", { status: 401 });
    }
    message.read = !message.read;
    await message.save();
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error("Something went wrongs");
    return new Response("Something went wrong", { status: 500 });
  }
};
export const DELETE = async (req: NextApiRequest & Params, res: Params) => {
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

    const message = await Message.findById(res.params.id);
    if (!message) {
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });
    }
    if (message.recipient.toString() !== user.id) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 404,
      });
    }

    if (user.id === message.recipient) {
      return new Response("Unauthorized", { status: 401 });
    }
    await message.deleteOne();
    return new Response("Message Deleted", { status: 200 });
  } catch (error) {
    console.error("Something went wrongs");
    return new Response("Something went wrong", { status: 500 });
  }
};
