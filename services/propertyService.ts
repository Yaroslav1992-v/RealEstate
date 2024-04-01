import { Property, newPropertyData } from "@/props";
import { convertImages } from "@/utils/convertImages";
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
const propertyService = {
  fetchProperties: async (
    page: number,
    pageSize: number
  ): Promise<{ properties: Property[]; total: number } | undefined> => {
    const { data } = await httpService.get(
      `/properties?page=${page}&pageSize=${pageSize}`
    );
    return data;
  },
  createProperty: async (
    property: newPropertyData,
    images: File[]
  ): Promise<Property | undefined> => {
    const convertedImages = await convertImages(images);
    const { data } = await httpService.post(`/properties`, {
      property,
      images: convertedImages,
    });
    return data;
  },
  loadUserProperties: async (
    userId: string
  ): Promise<Property[] | undefined> => {
    try {
      const { data } = await httpService.get(`/properties/user/${userId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  loadProperty: async (id: string): Promise<Property | undefined> => {
    try {
      const { data } = await httpService.get(`/properties/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  searchProperties: async (
    location: string,
    propertyType: string
  ): Promise<Property[]> => {
    const { data } = await httpService.get(
      `/properties/search?location=${location}&propertyType=${propertyType}`
    );
    return data;
  },
  loadProperties: async (): Promise<Property[]> => {
    const { data } = await httpService.get(`/properties`);
    return data;
  },
  loadFeaturedProperties: async (): Promise<Property[]> => {
    const { data } = await httpService.get(`/properties/featured`);
    return data;
  },
  deleteProperty: async (
    id: string
  ): Promise<{ data: string; status: number } | undefined> => {
    try {
      const data = await httpService.delete(`/properties/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  updateProperty: async (property: Property): Promise<Property | undefined> => {
    try {
      const { data } = await httpService.put(
        `/properties/${property._id}`,
        property
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default propertyService;
