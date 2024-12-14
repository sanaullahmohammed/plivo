// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { ServiceStatus } from "../components/ServiceStatus";
import { IncidentTimeline } from "../components/IncidentTimeline";
import { useAuth } from "../contexts/AuthContext";
import { useStatusWebSocket } from "../hooks/useStatusWebSocket";
import axios from "axios";

export const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const { user } = useAuth();

  const { updateServiceStatus } = useStatusWebSocket({
    organizationId: user?.organizationId,
    onStatusUpdate: (data) => {
      setServices((prev) =>
        prev.map((service) =>
          service._id === data.serviceId
            ? { ...service, currentStatus: data.status }
            : service
        )
      );
    },
    onIncidentUpdate: (incident) => {
      setIncidents((prev) => {
        const index = prev.findIndex((i) => i._id === incident._id);
        if (index === -1) return [incident, ...prev];
        const newIncidents = [...prev];
        newIncidents[index] = incident;
        return newIncidents;
      });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, incidentsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/services`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/incidents`),
        ]);
        setServices(servicesRes.data);
        setIncidents(incidentsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Services Status</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceStatus
                key={service._id}
                service={service}
                onStatusChange={updateServiceStatus}
                isEditable={true}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Recent Incidents</h2>
          <IncidentTimeline incidents={incidents} />
        </section>
      </div>
    </div>
  );
};
