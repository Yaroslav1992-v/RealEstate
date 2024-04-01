import { NextApiRequest, NextApiResponse } from "next";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { newPropertyData } from "@/props";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
interface AddtitionalData {
  url: string;
}
export const GET = async (
  req: NextApiRequest & AddtitionalData,
  res: NextApiResponse
) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 6;
    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);
    const result = {
      properties,
      total,
    };
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("something we wrong", { status: 500 });
  }
};

export const POST = async (
  req: NextApiRequest & {
    json: () => { property: newPropertyData; images: File[] };
  },
  res: NextApiResponse
) => {
  try {
    await connectDB();
    const user = await getSessionUser();
    if (!user) {
      return new Response("Unathorized", { status: 401 });
    }
    const { property, images } = await req.json();
    const imagesUploadPromises = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${image}`,
        {
          folder: "RentApp",
        }
      );
      imagesUploadPromises.push(result.secure_url);
      const uploadImages = await Promise.all(imagesUploadPromises);
      property.images = uploadImages;
    }
    const newProperty: newPropertyData = { ...property, owner: user.id };
    const newP = new Property(newProperty);
    await newP.save();
    return new Response(JSON.stringify(newP), { status: 200 });
  } catch (error) {
    console.error("Error parsing JSON:");
    return new Response(error as string, { status: 500 });
  }
};
