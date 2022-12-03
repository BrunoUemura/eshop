import { server } from "./configs/server-config";

const PORT = process.env.PORT || 5003;

server.listen(PORT, () => {
  console.log(`Payment API listening on ${PORT}`);
});
