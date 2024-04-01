import { IMessage, Message } from "@/props";

import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
});
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
const messagesService = {
  sendMessage: async (
    message: IMessage
  ): Promise<{ data: { message: string }; status: number } | undefined> => {
    const { data, status } = await httpService.post(`/messages`, {
      message,
    });
    return { data, status };
  },
  fetchMessages: async (): Promise<Message[]> => {
    const { data } = await httpService.get(`/messages`);
    return data;
  },
  markAsRead: async (id: string): Promise<Message> => {
    const { data } = await httpService.put(`/messages/${id}`);
    return data;
  },
  deleteMessage: async (id: string): Promise<Message> => {
    const { data } = await httpService.delete(`/messages/${id}`);
    return data;
  },
  getUnreadCount: async (): Promise<{ count: number }> => {
    const { data } = await httpService.get(`/messages/unreadCount`);
    return data;
  },
};

export default messagesService;
