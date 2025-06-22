"use client";

import { useEffect, useState } from "react";
import IncidentRow from "@/components/IncidentRow";
import AddIncidentForm from "@/components/AddIncidentForm";

type Incident = {
  id: number;
  service: string;
  message: string;
  severity: string | null;
  timestamp: string;
  sourceApp: string;
  tags: string | null;
};

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const handleAddIncident = async (data: Omit<Incident, "id" | "timestamp">) => {
    try {
      const response = await fetch("http://localhost:8080/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add incident");
      }

      const newIncident = await response.json();
      setIncidents((prev) => [...prev, newIncident]);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const handleDelete = (id: number) => {
    // Placeholder for delete until wired in
    setIncidents((prev) => prev.filter((incident) => incident.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-700 p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Incident Dashboard</h1>

      {/* Incident Form */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded mb-8">
        <h2 className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-4">
          Add Incident
        </h2>
        <AddIncidentForm onSubmit={handleAddIncident} />
      </div>

      {/* Incident Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          All Incidents
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Severity</th>
              <th className="p-2 border">Timestamp</th>
              <th className="p-2 border">Source App</th>
              <th className="p-2 border">Tags</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <IncidentRow
                key={incident.id}
                {...incident}
                severity={incident.severity ?? ""}
                tags={incident.tags ?? ""}
                onDelete={handleDelete}
              />

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
