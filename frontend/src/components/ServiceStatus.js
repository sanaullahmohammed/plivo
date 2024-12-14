// frontend/src/components/ServiceStatus.js
import React from "react";

const statusColors = {
  operational: "bg-green-500",
  degraded: "bg-yellow-500",
  partial_outage: "bg-orange-500",
  major_outage: "bg-red-500",
};

export const ServiceStatus = ({
  service,
  onStatusChange,
  isEditable = false,
}) => {
  const handleStatusChange = (status) => {
    onStatusChange?.(service.id, status);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{service.name}</h3>
          <p className="text-sm text-gray-500">{service.type}</p>
        </div>
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              statusColors[service.currentStatus]
            }`}
          />
          <span className="ml-2 text-sm capitalize">
            {service.currentStatus.replace("_", " ")}
          </span>
        </div>
      </div>

      {isEditable && (
        <div className="mt-4 flex gap-2">
          {Object.keys(statusColors).map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded text-sm ${
                service.currentStatus === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handleStatusChange(status)}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
