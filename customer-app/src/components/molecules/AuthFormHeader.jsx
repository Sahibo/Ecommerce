import React, { useState } from "react";
import AuthFormHeaderButton from "../atoms/AuthFormHeaderButton";

export default function AuthFormHeader({ onButtonClick }) {

  const [selectedButton, setSelectedButton] = useState("Register");

  const handleButtonClick = (buttonText) => {
    onButtonClick(buttonText);
    setSelectedButton(buttonText);
  };

  return (
    <div className="form-header-container">
      <AuthFormHeaderButton
        text="Register"
        isSelected={selectedButton === "Register"}
        onClick={() => handleButtonClick("Register")}
      />

      <AuthFormHeaderButton
        text="Login"
        isSelected={selectedButton === "Login"}
        onClick={() => handleButtonClick("Login")}
      />
    </div>
  );
};
