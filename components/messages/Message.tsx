"use client ";
import { Message } from "@/props";
import messagesService from "@/services/messageService";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";
const MessageComponent: React.FC<{ message: Message }> = ({ message }) => {
  const { sender, property, body, email } = message;
  const { unreadCount, setCount } = useGlobalContext();
  const [isRead, setIsRead] = useState<boolean>(message.read);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const handleDelete = async () => {
    try {
      const res = await messagesService.deleteMessage(message._id);

      if (res) {
        toast.success("Message Deleted ");
        setIsDeleted(true);
        setCount(unreadCount - 1);
      }
    } catch (e) {
      toast.error("Message Not Deleted");
    } finally {
      setLoading(false);
    }
  };
  const handleReadClick = async () => {
    try {
      const res = await messagesService.markAsRead(message._id);

      if (res) {
        setIsRead(res.read);
        setCount(res.read ? unreadCount - 1 : unreadCount + 1);
        toast.success(res.read ? "Marked as read" : "Marked as new");
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  if (isDeleted) {
    return <div className="hidden"></div>;
  }
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {property.name}
      </h2>
      <p className="text-gray-700">{body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>
        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${email}`} className="text-blue-500">
            {email}
          </a>
        </li>
        {message.phone && (
          <li>
            <strong>Reply Phone:</strong>
            <a href={`tel:${message.phone}`} className="text-blue-500">
              {message.phone}
            </a>
          </li>
        )}
        <li>
          <strong>Received:</strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300 " : "bg-blue-500 text-white"
        }   py-1 px-3 rounded-md`}
      >
        {!isRead ? "Mark As Read" : "Mark As New"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageComponent;
