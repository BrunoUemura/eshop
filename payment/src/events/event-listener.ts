import {
  orderCancelHandler,
  orderCreateHandler,
  orderUpdateHandler,
} from "./handlers/order-event-handler";
import { productUpdateHandler } from "./handlers/product-event-handler";

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

    if (message.topic === "product") {
      switch (message.payload.eventType) {
        case "product/update":
          await productUpdateHandler(message.payload.data);
          break;
        default:
          console.log("No action required for event");
          break;
      }
    }
  }
}
