import { CreateServiceOrderRequestBody } from "@/types/order/create";
import { OrderModel } from "@models/order";

export const createOrderRepository = async (
  order: CreateServiceOrderRequestBody
) => {
  try {
    return await OrderModel.create(order);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOrderRepository = async (id: string) => {
  try {
    return await OrderModel.deleteOne({ id });
  } catch (error) {
    throw new Error(error);
  }
};
