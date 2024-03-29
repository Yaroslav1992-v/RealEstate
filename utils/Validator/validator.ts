import { Property, newPropertyData } from "@/props";
import { propertyValidator } from "./validatorConfig";
import { PropertyFormErrors } from "@/components/form/props";

export interface Data {
  [key: string]: string;
}

export interface ValidationConfig {
  [key: string]: {
    [key: string]: {
      message: string;
      value?: number;
    };
  };
}
export const checkForsErros = (
  fields: newPropertyData,
  imgNum: number
): Data => {
  const rates = Object.values(fields.rates).find((r) => r > 0);
  console.log(rates);
  const data: Data = {
    type: fields.type,
    name: fields.name,
    description: fields.description,
    street: fields.location.street,
    images: imgNum > 0 ? "checked" : "",
    city: fields.location.city,
    state: fields.location.state,
    zipcode: fields.location.zipcode,
    beds: fields.beds > 0 ? "checked" : "",
    baths: fields.baths > 0 ? "checked" : "",
    square_feet: fields.square_feet > 0 ? "checked" : "",
    amenities: fields.amenities.length === 0 ? "" : "checked",
    sellerName: fields.seller_info.name,
    email: fields.seller_info.email,
    phone: fields.seller_info.phone,
    rates: rates ? "1" : "",
  };
  return validator(data, propertyValidator);
};
export function validator(data: Data, config: ValidationConfig) {
  const errors: { [key: string]: string } = {};

  function validate(
    validateMethod: string,
    data: string,
    config: { message: string; value?: number }
  ) {
    let statusValidate: boolean = false;

    switch (validateMethod) {
      case "isRequired":
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else if (typeof data !== "object") {
          statusValidate = data.trim() === "";
        }
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }

      case "min": {
        statusValidate = data.length < config.value!;
        break;
      }
      case "max": {
        statusValidate = data.length > config.value!;
        break;
      }
      case "length": {
        statusValidate = Number(data) < 2;
        break;
      }
      default:
        break;
    }

    if (statusValidate) {
      return config.message;
    }
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );

      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}
