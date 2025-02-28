import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [newCustomer, setNewCustomer] = useState({ name: "" });

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5016/api/Customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) throw new Error("Kunde inte skapa kund.");

      const createdCustomer = await response.json();

      console.log("Ny kund skapad med ID:", createdCustomer.id);

      // ✅ Navigera till "Skapa projekt" och skicka kundens ID
      navigate("/projects/create", { state: { customerId: createdCustomer.id } });

    } catch (error) {
      console.error("Fel vid kundskapande:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-beige pt-24">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-dark-gray mb-4">Skapa ny kund</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-dark-gray font-semibold mb-1">Kundnamn</label>
            <input
              type="text"
              name="name"
              value={newCustomer.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button type="submit" className="w-full bg-soft-green text-white font-semibold py-2 rounded-md">
            Skapa kund
          </button>
        </form>

        <button
          onClick={() => navigate("/projects/create")}
          className="mt-4 w-full bg-gray-400 text-white font-semibold py-2 rounded-md"
        >
          Tillbaka till Skapa Projekt
        </button>
      </div>
    </div>
  );
};

export default CreateCustomer;
