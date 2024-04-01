import Property from "@/models/Property";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

import { NextRequest } from "next/server";
interface Params {
  params: { id: string };
}
export const GET = async (req: Request | NextRequest, { params }: Params) => {
  try {
    await connectDB();
    const property = await Property.findById((params.id as string) || "");

    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response("something we wrong", { status: 500 });
  }
};
export const DELETE = async (
  req: Request | NextRequest,
  { params }: Params
) => {
  try {
    await connectDB();
    const propertyId = params.id;
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.id) {
      return new Response("User Id is required", { status: 404 });
    }
    const property = await Property.findById(propertyId);
    if (property.owner.toString() !== sessionUser.id) {
      return new Response("Unuthorized", { status: 404 });
    }
    await property.deleteOne();
    return new Response("Property Deleted", { status: 200 });
  } catch (error) {
    return new Response("something we wrong", { status: 500 });
  }
};
export const PUT = async (req: Request | NextRequest, { params }: Params) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    const editedProperty = await req.json();
    if (!sessionUser || !sessionUser.id) {
      return new Response("User Id is required", { status: 404 });
    }
    const { id } = params;
    const userId = sessionUser.id;
    const exisistingProperty = await Property.findById(id);
    if (!exisistingProperty) {
      return new Response("Property does not exist", { status: 404 });
    }
    if (exisistingProperty.owner.toString() !== userId) {
      return new Response("Unuthorized", { status: 401 });
    }
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      editedProperty
    );
    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return new Response("failed to add property", { status: 500 });
  }
};
