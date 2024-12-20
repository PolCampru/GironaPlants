"use client";
import Checkbox from "@/components/ui/CheckBox/CheckBox";
import React from "react";

const Home = () => {
  const handleChange = () => {
    console.log("Checkbox changed");
  };
  return (
    <div>
      <h1>Welcome to Girona Plants</h1>
      <p>Your one-stop shop for all your plant needs!</p>
      <Checkbox
        checked={true}
        onChange={() => handleChange()}
        label="Container"
        error={true}
      ></Checkbox>
    </div>
  );
};

export default Home;
