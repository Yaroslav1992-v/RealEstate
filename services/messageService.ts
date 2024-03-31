import { IMessage, Message } from "@/props";

import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
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
    const { data, status } = await httpService.post(`/api/messages`, {
      message,
    });
    return { data, status };
  },
  fetchMessages: async (): Promise<Message[]> => {
    const { data } = await httpService.get(`/api/messages`);
    return data;
  },
  markAsRead: async (id: string): Promise<Message> => {
    const { data } = await httpService.put(`/api/messages/${id}`);
    return data;
  },
  deleteMessage: async (id: string): Promise<Message> => {
    const { data } = await httpService.delete(`/api/messages/${id}`);
    return data;
  },
  getUnreadCount: async (): Promise<{ count: number }> => {
    const { data } = await httpService.get(`/api/messages/unreadCount`);
    return data;
  },
};

export default messagesService;
