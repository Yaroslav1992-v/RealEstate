import { NextApiRequest, NextApiResponse } from "next";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { newPropertyData } from "@/props";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
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
    console.error("Error parsing JSON:", error);
    return new Response("failed to add property", { status: 500 });
  }
};
function nextConnect<T, U>() {
  throw new Error("Function not implemented.");
}
