import { kafka } from "@libs/kafka";
import { isCreateServiceOrderRequestBody } from "@middlewares/order/verifyCreateObject";
import { createOrderRepository } from "@repositories/orders";
import { success } from "@serializer/erros/200";
import { badRequest } from "@serializer/erros/400";
import { unprocessableEntity } from "@serializer/erros/422";
import { CreateServiceOrderRequestBody } from "src/types/order/create";

const consumer = kafka.consumer({
  groupId: "createOrderRequest",
  allowAutoTopicCreation: true,
});
const producer = kafka.producer({ allowAutoTopicCreation: true });

export const createOrderService = async () => {
  let order: CreateServiceOrderRequestBody;
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "createServiceOrder" });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          order = JSON.parse(String(message.value));
          if (!isCreateServiceOrderRequestBody(order))
            return await sendMessageToProducer(
              JSON.stringify(
                unprocessableEntity(
                  "Type error in message value to create service order request"
                )
              )
            );
          await createOrderRepository(order);
          await sendMessageToProducer(
            JSON.stringify(success("Order created successfully"))
          );
        } catch (error) {
          console.error("Error processing message:", error);
          await sendMessageToProducer(
            JSON.stringify(
              badRequest("Error processing message" + error.message)
            )
          );
          // Optionally handle the error, e.g., log it or take necessary actions
        }
      },
    });
  } catch (err) {
    console.error("Error to create service order  =", err);
    throw new Error("Error to create service order = " + err.message);
  }
};

const sendMessageToProducer = async (message: string) => {
  console.log("MESSAGE = ", message);
  await producer.connect();
  await producer.send({
    topic: "responseCreateOrder",
    messages: [
      {
        value: message,
      },
    ],
  });
  await producer.disconnect();
};
