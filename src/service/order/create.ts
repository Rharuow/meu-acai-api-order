import { createOrderRepository } from "@repositories/orders";
import { success } from "@serializer/erros/200";
import { CreateServiceOrderRequestBody } from "src/types/order/create";

export const createOrderService = async (call: any, callback: any) => {
  try {
    const orderCreated = await createOrderRepository(call.request);
    return callback(null, orderCreated._id);
  } catch (err) {
    console.error("CREATE Error to create service order  =", err);
    throw new Error("Error to create service order = " + err.message);
  }
};
