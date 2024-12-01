export interface Cupcake {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  nutrition: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    sugar: number;
  };
  featured?: boolean;
  recommended?: boolean;
}

export interface CartItem {
  cupcake: Cupcake;
  quantity: number;
}

export interface CartItem2 {
  product: Cupcake;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem2[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
}
