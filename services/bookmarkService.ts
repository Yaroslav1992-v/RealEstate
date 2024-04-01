import { Property } from "@/props";

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
const bookmarkService = {
  handleBookMark: async (
    propertyId: string
  ): Promise<{ message: string; isBookmarked: boolean } | undefined> => {
    const { data } = await httpService.post(`/bookmarks`, { propertyId });

    return data;
  },
  ifBookmarked: async (
    propertyId: string
  ): Promise<{ isBookmarked: boolean } | undefined> => {
    const { data } = await httpService.post(`/bookmarks/check`, {
      propertyId,
    });

    return data;
  },
  fetchBookMarks: async (): Promise<Property[]> => {
    const { data } = await httpService.get(`/bookmarks`);
    return data;
  },
};

export default bookmarkService;
