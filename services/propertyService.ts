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
  ): Promise<Property> => {
    const convertedImages = await convertImages(images);
    const { data } = await httpService.post(`/api/properties`, {
      property,
      images: convertedImages,
    });
    return data;
  },
};

export default propertyService;
