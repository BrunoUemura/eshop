import {
  orderCancelHandler,
  orderCreateHandler,
  orderUpdateHandler,
} from "./handlers/order-event-handler";
import {
  paymentCancelHandler,
  paymentDoneHandler,
} from "./handlers/payment-event-handler";

export class EventListener {
  async handleEvent(message: any) {
    if (message.topic === "order") {
      switch (message.payload.eventType) {
        case "order/create":
          await orderCreateHandler(message.payload.data);
          break;
        case "order/update":
          await orderUpdateHandler(message.payload.data);
          break;
        case "order/cancel":
          await orderCancelHandler(message.payload.data);
          break;
        default:
          console.log("No action required for event");
          break;
      }
    }

    if (message.topic === "payment") {
      switch (message.payload.eventType) {
        case "payment/done":
          await paymentDoneHandler(message.payload.data);
          break;
        case "payment/cancel":
          await paymentCancelHandler(message.payload.data);
          break;
        default:
          console.log("No action required for event");
          break;
      }
    }
  }
}
