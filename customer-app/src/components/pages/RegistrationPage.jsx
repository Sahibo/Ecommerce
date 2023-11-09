import '../../global.css';
import './styles/pages.css';

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/reducer";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  
  // console.log(userState.message)
  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !emailRegex.test(value) ? "Invalid email address" : undefined;
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=-_'.!]).{6,40}$/;
    return !passwordRegex.test(value)
      ? "Password must be 6-40 characters and include 1 special symbol, 1 uppercase letter, and 1 number."
      : undefined;
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    dispatch(registerUser({ email, password }));

    if (userState.registrationStatus === "fulfilled") {
      resetForm();
    }
  };

  return (
    <div className="registration-container page-container">
      <Formik
        initialValues={{ email: "", password: "" }}
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

          <button type="submit" className="btn btn-primary">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
