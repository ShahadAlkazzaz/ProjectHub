import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-white text-center py-4">
      <p className="text-sm">© {new Date().getFullYear()} ProjectHub. Alla rättigheter förbehållna.</p>
    </footer>
  );
};

export default Footer;
