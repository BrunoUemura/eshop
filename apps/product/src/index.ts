import { server } from "./configs/server-config";

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Product API listening on ${PORT}`);
});
