import { kafka } from "@libs/kafka";
import { createOrderRepository } from "@repositories/orders";
import { success } from "@serializer/erros/200";
import { badRequest } from "@serializer/erros/400";
import { CreateServiceOrderRequestBody } from "src/types/order/create";

const consumer = kafka.consumer({
  groupId: "createOrder",
});
const producer = kafka.producer();

export const createOrderService = async () => {
  let order: CreateServiceOrderRequestBody;
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "creatingOrder" });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          order = JSON.parse(String(message.value));
          const orderCreated = await createOrderRepository(order);
          await sendMessageToProducer(
            JSON.stringify(
              success({
                message: "Order created successfully",
                data: { id: orderCreated._id },
              })
            )
          );
        } catch (error) {
          console.error("CREATE Error processing message:", error);
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
    console.error("CREATE Error to create service order  =", err);
    throw new Error("Error to create service order = " + err.message);
  }
};

const sendMessageToProducer = async (message: string) => {
  console.log("MESSAGE TO CREATE ORDER = ", message);
  await producer.connect();
  await producer.send({
    topic: "createdOrder",
    messages: [
      {
        value: message,
      },
    ],
  });
  await producer.disconnect();
};
