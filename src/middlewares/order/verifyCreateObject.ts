import { CreateServiceOrderRequestBody } from "src/types/order/create";

// Type guard function to check if 'order' is of type CreateServiceOrderRequestBody
export function isCreateServiceOrderRequestBody(
  order: any
): order is CreateServiceOrderRequestBody {
  // Perform type checks based on the structure of CreateServiceOrderRequestBody
  return (
    typeof order === "object" &&
    order !== null &&
    "size" in order &&
    "maxCreamsAllowed" in order &&
    "maxToppingsAllowed" in order &&
    "price" in order &&
    "totalPrice" in order &&
    "creams" in order &&
    Array.isArray(order.creams) &&
    order.creams.every(
      (cream: any) => "id" in cream && "name" in cream && "price" in cream
    ) &&
    (order.toppings === undefined ||
      (Array.isArray(order.toppings) &&
        order.toppings.every(
          (topping: any) =>
            "id" in topping && "name" in topping && "price" in topping
        ))) &&
    (order.extras === undefined ||
      (Array.isArray(order.extras) &&
        order.extras.every(
          (extra: any) => "id" in extra && "name" in extra && "price" in extra
        )))
  );
}
