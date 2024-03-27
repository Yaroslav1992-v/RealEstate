import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY__API_KEY,
  api_secret: process.env.CLOUDINARY__API_SECRET,
});
export default cloudinary;
