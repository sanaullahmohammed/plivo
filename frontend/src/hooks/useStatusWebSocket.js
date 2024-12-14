// frontend/src/hooks/useStatusWebSocket.js
import { useEffect, useCallback } from "react";
import io from "socket.io-client";

export const useStatusWebSocket = ({
  organizationId,
  onStatusUpdate,
  onIncidentUpdate,
}) => {
  const connectWebSocket = useCallback(() => {
    const socket = io(process.env.REACT_APP_WS_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socket.emit("join-organization", organizationId);

    socket.on("status-update", ({ serviceId, status }) => {
      onStatusUpdate?.(serviceId, status);
    });

    socket.on("incident-update", (incident) => {
      onIncidentUpdate?.(incident);
    });

    return socket;
  }, [organizationId, onStatusUpdate, onIncidentUpdate]);

  useEffect(() => {
    const socket = connectWebSocket();

    return () => {
      socket.disconnect();
    };
  }, [connectWebSocket]);
};
