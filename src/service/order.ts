import { kafka } from "@libs/kafka";
import { isCreateServiceOrderRequestBody } from "@middlewares/order/verifyCreateObject";
import { CreateServiceOrderRequestBody } from "src/types/order/create";

const consumer = kafka.consumer({
  groupId: "create-order-request-service-consumer",
});

export const createOrder = async () => {
  let order: CreateServiceOrderRequestBody;
  try {
    await consumer.connect();
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
  } catch (err) {
    throw new Error("Error to create service order = " + err.message);
  }
};
