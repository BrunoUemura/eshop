import { server } from "./configs/server-config";

const PORT = process.env.PORT || 5002;

server.listen(PORT, () => {
  console.log(`Order API listening on ${PORT}`);
});
