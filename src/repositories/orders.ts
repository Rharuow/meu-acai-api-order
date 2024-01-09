import { CreateOrderRequest } from "@/protoBufferTypes/CreateOrderRequest";
import { GetOrderRequest } from "@/protoBufferTypes/GetOrderRequest";
import { OrderModel } from "@models/order";

export const createOrderRepository = async (order: CreateOrderRequest) => {
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

export const getOrderRepository = async (id: string) => {
  try {
    return await OrderModel.findById(id).exec();
  } catch (error) {
    throw new Error(error);
  }
};
