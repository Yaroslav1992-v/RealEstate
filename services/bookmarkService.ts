import { Property } from "@/props";

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
const bookmarkService = {
  handleBookMark: async (
    propertyId: string
  ): Promise<{ message: string; isBookmarked: boolean } | undefined> => {
    const { data } = await httpService.post(`/api/bookmarks`, { propertyId });

    return data;
  },
  ifBookmarked: async (
    propertyId: string
  ): Promise<{ isBookmarked: boolean } | undefined> => {
    const { data } = await httpService.post(`/api/bookmarks/check`, {
      propertyId,
    });

    return data;
  },
  fetchBookMarks: async (): Promise<Property[]> => {
    const { data } = await httpService.get(`/api/bookmarks`);
    return data;
  },
};

export default bookmarkService;
