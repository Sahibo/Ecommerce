import "../../global.css";
import "./styles/pages.css";
import React from "react";

import AuthForm from "../organisms/AuthForm";
 

export default function AuthPage() {
  
  return (
    <div className="login-register-container page-container">
      <AuthForm/>
    </div>
  );
}

