import Contact from "@/components/specific/Contact/Contact";
import PhoneAndEmail from "@/components/specific/Contact/PhoneAndEmail/PhoneAndEmail";
import React from "react";

export const metadata = {
  title: "GironaPlants Contact",
  description: "Bienvenido a la página de contacto",
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
      <PhoneAndEmail />
    </main>
  );
};

export default ContactPage;
