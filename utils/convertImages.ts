export const convertImages = async (images: File[]) => {
  const convertedImages: string[] = [];
  for (const image of images) {
    const imagageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imagageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString("base64");
    convertedImages.push(imageBase64);
  }
  return convertedImages;
};
