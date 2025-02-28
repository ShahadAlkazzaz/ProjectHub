import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [highlightedProjectId, setHighlightedProjectId] = useState(null);
    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:5016/api/Projects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP-fel! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const projectsArray = data.$values || data;
                setProjects(projectsArray);
                setLoading(false);

                // Hantera markering av både nytt och uppdaterat projekt
                const newProjectId = location.state?.newProjectId;
                const updatedProjectId = location.state?.updatedProjectId;

                if (newProjectId || updatedProjectId) {
                    const highlightedId = newProjectId || updatedProjectId;
                    setHighlightedProjectId(highlightedId);

                    setTimeout(() => {
                        const element = document.getElementById(`project-${highlightedId}`);
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth", block: "center" });

                            setTimeout(() => setHighlightedProjectId(null), 3000);
                        }
                    }, 500);
                }
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setError(error.message);
                setLoading(false);
            });

        // Hämta kunder separat
        fetch("http://localhost:5016/api/Customers")
            .then((response) => response.json())
            .then((data) => {
                const customerMap = {};
                (data.$values || data).forEach((customer) => {
                    customerMap[customer.id] = customer.name;
                });
                setCustomers(customerMap);
            })
            .catch((error) => console.error("Error fetching customers:", error));
    }, [location.state]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Ej påbörjad":
                return "bg-red-200 text-red-700";
            case "Pågående":
                return "bg-yellow-200 text-yellow-700";
            case "Avslutad":
                return "bg-green-200 text-green-700";
            default:
                return "bg-gray-200 text-gray-700";
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 pt-24">
            <h1 className="text-4xl font-bold text-dark-gray text-center mt-6 mb-6">
                Projekt-lista
            </h1>

            {loading && <p className="text-center text-dark-gray">Laddar projekt...</p>}
            {error && <p className="text-center text-red-500">Fel: {error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            id={`project-${project.id}`}
                            className={`bg-white shadow-lg rounded-lg p-6 border transition-all duration-500 ${
                                project.id === highlightedProjectId
                                    ? "border-4 border-green-500"
                                    : "border-soft-green"
                            }`}
                        >
                            <h3 className="text-xl font-extrabold text-center text-dark-gray mb-2 uppercase">
                                {project.name}
                            </h3>

                            <p className="text-dark-gray">
                                <strong>Projektledare:</strong> {project.projectManager || "Ej angiven"}
                            </p>

                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-dark-gray font-semibold">Status:</p>
                                <span
                                    className={`inline-block px-3 py-1 rounded-md font-semibold ${getStatusColor(
                                        project.status
                                    )}`}
                                >
                                    {project.status}
                                </span>
                            </div>

                            <p className="text-dark-gray mt-2">
                                <strong>Startdatum:</strong>{" "}
                                {new Date(project.startDate).toLocaleDateString()}
                            </p>
                            <p className="text-dark-gray">
                                <strong>Slutdatum:</strong>{" "}
                                {new Date(project.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-dark-gray">
                                <strong>Pris:</strong> {project.totalPrice} SEK
                            </p>
                            <p className="text-dark-gray">
                                <strong>Kund:</strong> {customers[project.customerId] || "Okänd kund"}
                            </p>

                            <div className="mt-4 flex justify-end">
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="bg-soft-green text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-dark-gray transition duration-300"
                                >
                                    Uppdatera
                                </Link>
                            </div>
                        </div>
                    ))
                ) : !loading ? (
                    <p className="text-center text-dark-gray">Inga projekt hittades</p>
                ) : null}
            </div>

            <div className="mt-6 text-center">
                <Link
                    to="/projects/select-customer"
                    className="bg-dark-gray text-white font-bold px-5 py-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                >
                    Skapa nytt projekt
                </Link>
            </div>
        </div>
    );
};

export default Projects;
