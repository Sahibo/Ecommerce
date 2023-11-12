import '../../global.css';
import './styles/pages.css';
 
import { loginUser } from "../../store/reducer";
import { validateEmail, validatePassword } from '../../services/validators/LoginRegistrationValitator';

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function LoginPage() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user); 
 
  const handleSubmit = async (values, { resetForm }) => {
    const { email, password, rememberMe } = values;
    dispatch(loginUser({ email, password, rememberMe }));
 
    if (userState.loginStatus === "fulfilled") {
      resetForm();
    }
  };
 
  return (
    <div className="login-register-container page-container">
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="@example.com"
              validate={validateEmail}
            />
            <ErrorMessage name="email" component="span" className="text-danger" />
          </div>
 
          <div className="form-group">
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              validate={validatePassword}
            />
            <ErrorMessage name="password" component="span" className="text-danger" />
          </div>
 
          <div className="form-group">
            <label>
              <Field type="checkbox" name="rememberMe" />
              Remember Me
            </label>
          </div>
 
          <button type="submit" className="btn btn-primary">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
 