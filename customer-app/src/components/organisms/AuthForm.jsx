import React, { useState } from "react";
import RegistrationFormik from "../molecules/RegistrationFormik";
import LoginFormik from "../molecules/LoginFormik";
import AuthFormHeader from "../molecules/AuthFormHeader";

export default function AuthForm() {
  const [currentForm, setCurrentForm] = useState("Register");

  const handleButtonClick = (buttonText) => {
    setCurrentForm(buttonText);
  };

  return (
    <div className="authForm-container organism-container">
      <AuthFormHeader onButtonClick={handleButtonClick} />
      {currentForm === "Login" ? <LoginFormik /> : <RegistrationFormik />}
    </div>
  );
};
