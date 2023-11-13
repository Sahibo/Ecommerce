import React from "react";

import RegistrationFormik from "../molecules/RegistrationFormik";
import LoginFormik from "../molecules/LoginFormik";

import AuthFormHeader from "../molecules/AuthFormHeader";
 
export default function AuthForm () {
  
  return (
    <div className="authForm-container organism-container">
      <AuthFormHeader/>
      <LoginFormik/>
      {/* <RegistrationFormik/> */}
    </div>
  );
};

