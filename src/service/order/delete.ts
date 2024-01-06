import { kafka } from "@libs/kafka";
import { deleteOrderRepository } from "@repositories/orders";
import { badRequest } from "@serializer/erros/400";
import { unprocessableEntity } from "@serializer/erros/422";

const consumer = kafka.consumer({
  groupId: "deleteOrder",
});
const producer = kafka.producer();

export const deleteOrderService = async () => {
  let orderId: string;
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "deletingOrder" });
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
          console.log("DELETE MESSAGE CONUSME = ", String(message.value));
          orderId = String(message.value);
          await deleteOrderRepository(orderId);
          return await sendMessageToProducer(JSON.stringify({ status: 204 }));
        } catch (error) {
          console.error("DELETE Error processing message:", error);
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
    console.error("DELETE Error to delete service order  =", err);
    throw new Error("Error to delete service order = " + err.message);
  }
};

const sendMessageToProducer = async (message: string) => {
  console.log("MESSAGE TO DELETE ORDER = ", message);
  await producer.connect();
  await producer.send({
    topic: "deletedOrder",
    messages: [
      {
        value: message,
      },
    ],
  });
  return await producer.disconnect();
};
