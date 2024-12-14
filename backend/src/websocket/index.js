// backend/src/websocket/index.js
const { Server } = require("socket.io");

class WebSocketManager {
  constructor(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("join-organization", (organizationId) => {
        socket.join(`org-${organizationId}`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  emitStatusUpdate(organizationId, serviceId, status) {
    this.io.to(`org-${organizationId}`).emit("status-update", {
      serviceId,
      status,
      timestamp: new Date(),
    });
  }

  emitIncidentUpdate(organizationId, incident) {
    this.io.to(`org-${organizationId}`).emit("incident-update", incident);
  }
}

module.exports = WebSocketManager;
