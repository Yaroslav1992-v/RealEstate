import { Property, newPropertyData } from "@/props";
import { convertImages } from "@/utils/convertImages";
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
const propertyService = {
  createProperty: async (
    property: newPropertyData,
    images: File[]
  ): Promise<Property | undefined> => {
    const convertedImages = await convertImages(images);
    try {
      const { data } = await httpService.post(`/api/properties`, {
        property,
        images: convertedImages,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  loadUserProperties: async (
    userId: string
  ): Promise<Property[] | undefined> => {
    try {
      const { data } = await httpService.get(`/api/properties/user/${userId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  loadProperty: async (id: string): Promise<Property | undefined> => {
    try {
      const { data } = await httpService.get(`/api/properties/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteProperty: async (
    id: string
  ): Promise<{ data: string; status: number } | undefined> => {
    try {
      const data = await httpService.delete(`/api/properties/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  updateProperty: async (property: Property): Promise<Property | undefined> => {
    try {
      const { data } = await httpService.put(
        `/api/properties/${property._id}`,
        property
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default propertyService;
