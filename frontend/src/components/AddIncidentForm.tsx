"use client";

import { useState } from "react";

type AddIncidentFormProps = {
  onSubmit: (data: {
    service: string;
    message: string;
    severity: string | null;
    sourceApp: string;
    tags: string | null;
  }) => void;
};

export default function AddIncidentForm({ onSubmit }: AddIncidentFormProps) {
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [sourceApp, setSourceApp] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      service,
      message,
      severity: severity || null,
      sourceApp,
      tags: tags || null,
    });

    // Optional: clear the form after submission
    setService("");
    setMessage("");
    setSeverity("");
    setSourceApp("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
      <input
        className="border p-2 rounded text-gray-200"
        type="text"
        placeholder="Service"
        value={service}
        onChange={(e) => setService(e.target.value)}
      />
      <input
        className="border p-2 rounded text-gray-200"
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        className="border p-2 rounded text-gray-200"
        type="text"
        placeholder="Severity"
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
      />
      <input
        className="border p-2 rounded text-gray-200"
        type="text"
        placeholder="Source App"
        value={sourceApp}
        onChange={(e) => setSourceApp(e.target.value)}
      />
      <input
        className="border p-2 rounded text-gray-200 col-span-2"
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        type="submit"
        className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 shadow-lg hover:shadow-xl transition-shadow"
      >
        Submit
      </button>
    </form>
  );
}
