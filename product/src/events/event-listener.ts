import {
  orderCancelHandler,
  orderCreateHandler,
} from "./handlers/order-event-handler";

export class EventListener {
  async handleEvent(message: any) {
    switch (message.payload.eventType) {
      case "order/create":
        await orderCreateHandler(message.payload.data);
        break;
      case "order/cancel":
        await orderCancelHandler(message.payload.data);
        break;
      default:
        console.log("No action required for event");
        break;
    }
  }
}
