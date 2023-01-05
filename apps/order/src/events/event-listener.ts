import {
  paymentCancelHandler,
  paymentDoneHandler,
} from "./handlers/payment-event-handler";
import { productUpdateHandler } from "./handlers/product-event-handler";

export class EventListener {
  async handleEvent(message: any) {
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

    if (message.topic === "product") {
      switch (message.payload.eventType) {
        // TODO: Add event handler for product/create
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
