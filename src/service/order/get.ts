import { GetOrderRequest } from "@/protoBufferTypes/GetOrderRequest";
import { GetOrderResponse } from "@/protoBufferTypes/GetOrderResponse";
import * as grpc from "@grpc/grpc-js";

import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { getOrderRepository } from "@repositories/orders";

export const getOrderService = async (
  call: ServerUnaryCall<GetOrderRequest, GetOrderResponse>,
  callback: sendUnaryData<GetOrderResponse>
) => {
  try {
    const order = await getOrderRepository(call.request.id);
    return callback(null, order);
  } catch (err) {
    console.error("GET Error to get service order =", err);
    const errorStatus = {
      code: grpc.status.INTERNAL,
      details: "Error to get service order: " + err.message,
    };
    callback(errorStatus, null);
  }
};
