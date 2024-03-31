"use-client";
import React, { ChangeEvent, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ActionButton from "../ActionButton";
import { IMessage, Property, newMessage } from "@/props";
import InputField from "./InputField";
import TextArea from "./TextArea";
import messagesService from "@/services/messageService";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ContactForm: React.FC<{ property: Property }> = ({ property }) => {
  const [message, setMessage] = useState<IMessage>(newMessage);
  const [wasSubmited, setWasSubmited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = event;
    setMessage((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: IMessage = {
      ...message,
      recipient: property.owner,
      property: property._id,
    };
    try {
      const res = await messagesService.sendMessage(data);
      setWasSubmited(true);
      console.log(res);
      if (res) {
        if (res.status === 400 || res.status === 401) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      }
    } catch (error: any) {
      console.log(error);
      const msg = error?.response?.data?.message || "Error sending form";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        {!session ? (
          <p>You must be logged in to send a message</p>
        ) : wasSubmited ? (
          <p className="text-green-500 mb-4">
            Your message has been sent successfully
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <InputField
              onChange={handleChange}
              label="Name:"
              name="name"
              placeholder="Enter your name"
              value={message.name}
            />
            <InputField
              onChange={handleChange}
              label="Email:"
              name="email"
              placeholder="Enter your email"
              value={message.email}
            />
            <InputField
              onChange={handleChange}
              label="Phone:"
              name="phone"
              placeholder="Enter your phone number"
              value={message.phone || ""}
            />
            <TextArea
              name="body"
              label="Message:"
              onChange={handleChange}
              placeholder="Enter your message"
              value={message.body || ""}
              rows={4}
            />
            <div>
              <ActionButton
                text="Send Message"
                className="bg-blue-500 hover:bg-blue-600"
                action={() => {}}
                Icon={FaPaperPlane}
                loading={loading}
              />
            </div>
          </form>
        )}
      </div>
    </aside>
  );
};

export default ContactForm;
