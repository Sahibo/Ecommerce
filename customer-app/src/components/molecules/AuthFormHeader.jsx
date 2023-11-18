import React from "react";
import AuthFormHeaderButton from "../atoms/AuthFormHeaderButton";

export default function AuthFormHeader({ onButtonClick }) {
  return (
    <div className="form-header-container">
      <AuthFormHeaderButton
        text="Register"
        onClick={onButtonClick}
      />

      <AuthFormHeaderButton
        text="Login"
        onClick={onButtonClick}
      />
    </div>
  );
};
