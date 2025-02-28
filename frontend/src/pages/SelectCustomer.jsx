import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectCustomer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [creatingNewCustomer, setCreatingNewCustomer] = useState(false);

  // Hämta befintliga kunder från API
  useEffect(() => {
    fetch("http://localhost:5016/api/Customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.$values || data))
      .catch((error) => console.error("Kunde inte hämta kunder", error));
  }, []);

  // Hantera val av kund från dropdown
  const handleCustomerSelect = (e) => {
    setSelectedCustomerId(e.target.value);
    setCreatingNewCustomer(false); // Om man väljer från listan, stäng "Skapa ny kund"
  };

  //  Skapa en ny kund
  const handleCreateCustomer = async () => {
    if (!newCustomerName) return;

    try {
      const response = await fetch("http://localhost:5016/api/Customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCustomerName }),
      });

      if (!response.ok) throw new Error("Kunde inte skapa kund.");

      const createdCustomer = await response.json();

      console.log("Ny kund skapad med ID:", createdCustomer.id);

      // Navigera direkt till "Skapa projekt" med kundens ID
      navigate("/projects/create", { state: { customerId: createdCustomer.id } });

    } catch (error) {
      console.error("Fel vid kundskapande:", error);
    }
  };

  // Gå vidare till "Skapa projekt" med vald kund
  const handleContinue = () => {
    if (!selectedCustomerId) return;
    navigate("/projects/create", { state: { customerId: selectedCustomerId } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-beige pt-24">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-dark-gray mb-4">Välj en kund</h1>

        {/* Dropdown för att välja kund */}
        <div className="mb-4">
          <label className="block text-dark-gray font-semibold mb-1">Välj befintlig kund</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={selectedCustomerId}
            onChange={handleCustomerSelect}
          >
            <option value="">-- Välj en kund --</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Knapp för att fortsätta med vald kund */}
        <button
          onClick={handleContinue}
          disabled={!selectedCustomerId}
          className="w-full bg-soft-green text-white font-semibold py-2 rounded-md mb-4 disabled:opacity-50"
        >
          Fortsätt till Skapa projekt
        </button>

        {/* Skapa ny kund */}
        <div>
          <button
            onClick={() => setCreatingNewCustomer(true)}
            className="text-blue-500 underline mb-2"
          >
            Skapa ny kund
          </button>

          {creatingNewCustomer && (
            <div className="mt-4">
              <label className="block text-dark-gray font-semibold mb-1">Ny kundnamn</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
              />
              <button
                onClick={handleCreateCustomer}
                className="mt-2 w-full bg-soft-green text-white font-semibold py-2 rounded-md"
              >
                Skapa kund och fortsätt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCustomer;
