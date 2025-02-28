import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Om användaren kommer från "Välj kund", fyll i kund-ID automatiskt
  const [project, setProject] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "Ej påbörjad",
    customerId: location.state?.customerId || "", // Fyll i kund-ID automatiskt om det finns
    projectManager: "",
    service: "",
    totalPrice: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newProjectId, setNewProjectId] = useState(null);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!project.name || !project.startDate || !project.customerId || !project.projectManager || !project.service || !project.totalPrice) {
      setError("Alla fält måste fyllas i!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5016/api/Projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...project,
          customerId: parseInt(project.customerId), // Se till att det är ett nummer
          totalPrice: parseFloat(project.totalPrice),
        }),
      });

      if (!response.ok) {
        throw new Error(`Fel vid skapande: ${response.status}`);
      }

      const createdProject = await response.json();

      setSuccess(`Projektet "${createdProject.name}" har skapats!`);
      setNewProjectId(createdProject.id);

      setProject({
        name: "",
        startDate: "",
        endDate: "",
        status: "Ej påbörjad",
        customerId: "",
        projectManager: "",
        service: "",
        totalPrice: "",
      });

    } catch (error) {
      console.error("Error:", error);
      setError("Något gick fel. Försök igen.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-beige pt-24">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-dark-gray mb-6">Skapa nytt projekt</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: "name", label: "Projekt namn", type: "text" },
            { name: "startDate", label: "Startdatum", type: "date" },
            { name: "endDate", label: "Slutdatum", type: "date" },
            { name: "projectManager", label: "Projektledare", type: "text" },
            { name: "service", label: "Tjänst", type: "text" },
            { name: "totalPrice", label: "Pris (SEK)", type: "number" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-dark-gray font-semibold mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={project[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-gray"
              />
            </div>
          ))}

          {/* Kund-ID fylls i automatiskt om det finns */}
          <div>
            <label className="block text-dark-gray font-semibold mb-1">Kund-ID</label>
            <input
              type="number"
              name="customerId"
              value={project.customerId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-gray"
            />
          </div>

          <div>
            <label className="block text-dark-gray font-semibold mb-1">Status</label>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-gray"
            >
              <option value="Ej påbörjad">Ej påbörjad</option>
              <option value="Pågående">Pågående</option>
              <option value="Avslutad">Avslutad</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-soft-green hover:bg-dark-gray text-white font-semibold py-3 rounded-md transition duration-300">
            Skapa projekt
          </button>
        </form>

        {success && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
            <p>{success}</p>
            {newProjectId && (
              <button
                onClick={() => navigate(`/projects`, { state: { newProjectId } })}
                className="mt-3 bg-dark-gray text-white py-2 px-4 rounded-md hover:bg-soft-green transition duration-300"
              >
                Visa projekt
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
