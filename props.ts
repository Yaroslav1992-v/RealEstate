export interface Location {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface Rates {
  nightly?: number;
  weekly?: number;
  monthly?: number;
}

export interface SellerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Property {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: Location;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface UserData {
  email: string;
  username: string;
  image?: string;
  bookmarks: string[];
}
export interface newPropertyData extends Omit<Property, "_id"> {}
export const emptyProperty: newPropertyData = {
  owner: "",
  type: "",
  name: "",
  description: "",
  location: {
    street: "",
    city: "",
    state: "",
    zipcode: "",
  },
  beds: 0,
  baths: 0,
  square_feet: 0,
  amenities: [],
  rates: {
    nightly: 0,
    weekly: 0,
    monthly: 0,
  },
  seller_info: {
    name: "",
    email: "",
    phone: "",
  },
  images: [],
  is_featured: false,
  createdAt: "",
  updatedAt: "",
};
export const propertyWithId = {
  _id: "",
  owner: "",
  type: "",
  name: "",
  description: "",
  location: {
    street: "",
    city: "",
    state: "",
    zipcode: "",
  },
  beds: 0,
  baths: 0,
  square_feet: 0,
  amenities: [],
  rates: {
    nightly: 0,
    weekly: 0,
    monthly: 0,
  },
  seller_info: {
    name: "",
    email: "",
    phone: "",
  },
  images: [],
  is_featured: false,
  createdAt: "",
  updatedAt: "",
};
export const amenities = [
  "Wifi",
  "Full kitchen",
  "Washer & Dryer",
  "Free Parking",
  "Swimming Pool",
  "Hot Tub",
  "24/7 Security",
  "Wheelchair Accessible",
  "Elevator Access",
  "Dishwasher",
  "Gym/Fitness Center",
  "Air Conditioning",
  "Balcony/Patio",
  "Smart TV",
  "Coffee Maker",
];
