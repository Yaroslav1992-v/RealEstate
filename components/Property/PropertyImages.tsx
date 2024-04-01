import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <Gallery>
      <div className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt="property image"
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`${
                    images.length === 3 && i === 2 ? "col-span-2" : "col-span-1"
                  }`}
                >
                  <Item
                    original={images[i]}
                    thumbnail={images[i]}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={img}
                        alt="property image"
                        className="object-cover h-[400px] w-full rounded-xl"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Gallery>
  );
};
export default PropertyImages;
