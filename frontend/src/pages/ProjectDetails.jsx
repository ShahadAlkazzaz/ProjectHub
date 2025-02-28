import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5016/api/Projects/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Projektet kunde inte hämtas.");
        }
        return response.json();
      })
      .then(data => {
        setProject({
          ...data,
          startDate: data.startDate ? data.startDate.split("T")[0] : "",
          endDate: data.endDate ? data.endDate.split("T")[0] : "",
        });

        if (data.customer) {
          setCustomer(data.customer);
        } else {
          fetch(`http://localhost:5016/api/Customers/${data.customerId}`)
            .then(res => res.json())
            .then(customerData => setCustomer(customerData))
            .catch(() => setCustomer(null));
        }

        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        const response = await fetch(`http://localhost:5016/api/Projects/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error("Fel vid uppdatering.");
        }

        setSuccess("✅ Projektet har uppdaterats!");

        setTimeout(() => {
            navigate("/projects", { state: { updatedProjectId: id } });
        }, 1000); // Navigera tillbaka efter 1 sekund

    } catch (error) {
        setError("❌ Något gick fel. Försök igen.");
    }
};


  const handleDelete = async () => {
    setError(null);

    try {
      const response = await fetch(`http://localhost:5016/api/Projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Fel vid borttagning.");
      }

      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    } catch (error) {
      setError("❌ Något gick fel. Försök igen.");
    }
  };

  if (loading) return <p className="text-center text-dark-gray">Laddar...</p>;
  if (!project) return <p className="text-center text-red-500">Projektet hittades inte.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-beige pt-24">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-dark-gray mb-6">Redigera projekt</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleUpdate} className="space-y-6">
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

          <div>
            <label className="block text-dark-gray font-semibold mb-1">Kund</label>
            <input
              type="text"
              value={customer ? customer.name : "Okänd kund"}
              disabled
              className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md"
            />
          </div>

          <button type="submit" className="w-full bg-soft-green hover:bg-dark-gray text-white font-semibold py-3 rounded-md transition duration-300">
            Spara ändringar
          </button>
        </form>

        {/* Visar uppdateringsmeddelande */}
        {success && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center">
            <p>{success}</p>
            <button
  onClick={() => navigate("/projects", { state: { updatedProjectId: id } })}
  className="mt-3 bg-dark-gray text-white py-2 px-4 rounded-md hover:bg-soft-green transition duration-300"
>
  Visa projekt
</button>

            {/* <button
              onClick={() => navigate(`/projects?id=${id}`)}
              className="mt-3 bg-dark-gray text-white py-2 px-4 rounded-md hover:bg-soft-green transition duration-300"
            >
              Visa projekt
            </button> */}
          </div>
        )}

        {deleteConfirm ? (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md text-center">
            <p>⚠️ Är du säker på att du vill radera projektet?</p>
            <div className="flex justify-center gap-4 mt-3">
              <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                Ja, ta bort
              </button>
              <button onClick={() => setDeleteConfirm(false)} className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300">
                Avbryt
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setDeleteConfirm(true)} className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition duration-300">
            Ta bort projekt
          </button>
        )}

        <button onClick={() => navigate("/projects")} className="mt-4 w-full bg-gray-400 hover:bg-gray-600 text-white font-semibold py-3 rounded-md transition duration-300">
          Tillbaka
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
