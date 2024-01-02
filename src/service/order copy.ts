import { kafka } from "@libs/kafka";
import { isCreateServiceOrderRequestBody } from "@middlewares/order/verifyCreateObject";
import { badRequest } from "@serializer/erros/400";
import { CreateServiceOrderRequestBody } from "src/types/order/create";

const consumer = kafka.consumer({
  groupId: "createOrderRequest",
  allowAutoTopicCreation: true,
});

const producer = kafka.producer({ allowAutoTopicCreation: true });

export const createOrder = async () => {
  let order: CreateServiceOrderRequestBody;
  try {
    await consumer.connect();
    await producer.connect();

    await consumer.subscribe({ topic: "createServiceOrder" });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          console.log("topic =", topic);
          console.log("partition =", partition);
          order = JSON.parse(String(message.value));
          console.log("message =", order);
          if (!isCreateServiceOrderRequestBody(order))
            throw new Error(
              "Type error in message value to create service order request"
            );
        } catch (error) {
          console.error("Error processing message:", error);
          // Optionally handle the error, e.g., log it or take necessary actions
          throw new Error("Error processing message:" + error);
        }
      },
    });

    await producer.send({
      topic: "responseCreateOrder",
      messages: [
        {
          value: JSON.stringify(badRequest()),
        },
      ],
    });

    await producer.disconnect();
  } catch (err) {
    throw new Error("Error to create service order = " + err.message);
  }
};
