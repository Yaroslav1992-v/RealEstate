import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextApiRequest, NextApiResponse } from "next";
interface AddtitionalData {
  url: string;
}
interface QueryType {
  $or: {}[];
  type?: RegExp;
}
export const GET = async (
  req: NextApiRequest & AddtitionalData,
  res: NextApiResponse
) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location!, "i");

    let query: QueryType = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        {
          "location.street": locationPattern,
        },
        {
          "location.city": locationPattern,
        },
        {
          "location.state": locationPattern,
        },
        {
          "location.zipcode": locationPattern,
        },
      ],
    };
    //only check for poperty if it not 'ALL'
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query = { ...query, type: typePattern };
    }
    console.log(query)
    const properties = await Property.find(query);
    console.log(properties);
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
