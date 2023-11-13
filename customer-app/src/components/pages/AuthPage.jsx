import "../../global.css";
import "./styles/pages.css";

import React from "react";
import { loginUser } from "../../store/reducer";

import AuthForm from "../organisms/AuthForm";
 

export default function AuthPage() {
  
  return (
    <div className="login-register-container page-container">
      <AuthForm
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={loginUser}
        buttonText="Login"/>
    </div>
  );
}

