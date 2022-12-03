import { server } from "./configs/server-config";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
