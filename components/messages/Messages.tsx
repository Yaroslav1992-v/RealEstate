"use client";
import messagesService from "@/services/messageService";
import React, { useEffect, useState } from "react";
import MessageComponent from "./Message";
import { Message } from "@/props";
import Spinner from "../Spinner";

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await messagesService.fetchMessages();
        console.log(res);
        if (res) {
          setMessages(res);
        }
      } catch (e) {
        console.log("Error ", e);
      } finally {
        setloading(false);
      }
    };
    getMessages();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((m) => <MessageComponent key={m._id} message={m} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
