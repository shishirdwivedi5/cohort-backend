const app = require("./src/app");
const { createServer } = require("http");

const { Server } = require("socket.io");
const Aimain = require("./src/services/ai.service");
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const history = [];

io.on("connection", async (socket) => {
  console.log(socket.id);
  console.log("user CONNECTED ");

  socket.on("listen", async (data) => {
    console.log(data);

    history.push({
      role: "user",
      parts: [{ text: data }],
    });

    const aiRes = await Aimain(history);
    socket.emit("listen", aiRes);

    history.push({
      role: "model",
      parts: [{ text: aiRes }],
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected ");
  });
});

httpServer.listen(3000, () => {
  console.log("srever is running port :  3000");
});
