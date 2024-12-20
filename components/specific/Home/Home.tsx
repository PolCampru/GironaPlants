"use client";
import { InputText } from "@/components/ui/Form/InputText/InputText";
import React from "react";

const Home = () => {
  const handleChange = () => {
    console.log("Checkbox changed");
  };
  return (
    <div>
      <h1>Welcome to Girona Plants</h1>
      <p>Your one-stop shop for all your plant needs!</p>
      <InputText label="Surname" value="" name="surname" />
    </div>
  );
};

export default Home;
