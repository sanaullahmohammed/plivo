// frontend/src/components/IncidentTimeline.js
import React from "react";

export const IncidentTimeline = ({ incidents }) => {
  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <div key={incident.id} className="border-l-4 pl-4 py-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{incident.title}</h3>
              <p className="text-sm text-gray-600">{incident.description}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-sm ${
                incident.status === "resolved"
                  ? "bg-green-100 text-green-800"
                  : incident.status === "investigating"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {incident.status}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {incident.updates.map((update) => (
              <div key={update.id} className="text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>{update.status}</span>
                  <span>{new Date(update.createdAt).toLocaleString()}</span>
                </div>
                <p>{update.message}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
