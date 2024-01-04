import { kafka } from "@libs/kafka";
import { deleteOrderRepository } from "@repositories/orders";
import { badRequest } from "@serializer/erros/400";
import { unprocessableEntity } from "@serializer/erros/422";

const consumer = kafka.consumer({
  groupId: "deleteOrderRequest",
  allowAutoTopicCreation: true,
});
const producer = kafka.producer({ allowAutoTopicCreation: true });

export const deleteOrderService = async () => {
  let orderId: string;
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "deleteServiceOrder" });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          if (!message.value)
            return await sendMessageToProducer(
              JSON.stringify(
                unprocessableEntity(
                  "Type error in message value to delete service order request"
                )
              )
            );
          orderId = String(message.value);
          await deleteOrderRepository(orderId);
          await sendMessageToProducer(JSON.stringify({ status: 204 }));
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
    console.error("Error to delete service order  =", err);
    throw new Error("Error to delete service order = " + err.message);
  }
};

const sendMessageToProducer = async (message: string) => {
  console.log("MESSAGE TO DELETE ORDER = ", message);
  await producer.connect();
  await producer.send({
    topic: "responseDeleteOrder",
    messages: [
      {
        value: message,
      },
    ],
  });
  await producer.disconnect();
};
