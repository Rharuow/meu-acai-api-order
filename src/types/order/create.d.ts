export type CreateServiceOrderRequestBody = {
  name?: string;
  size: string;
  paymentMethod: "pix" | "card" | "cash";
  isPaid: boolean;
  maxCreamsAllowed: number;
  maxToppingsAllowed: number;
  price: number;
  totalPrice: number;
  creams: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  toppings?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  extras?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
};
