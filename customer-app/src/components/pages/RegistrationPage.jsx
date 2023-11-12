import '../../global.css';
import './styles/pages.css';

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/reducer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateEmail, validatePassword } from '../../services/validators/LoginRegistrationValitator';

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    dispatch(registerUser({ email, password }));

    if (userState.registrationStatus === "fulfilled") {
      resetForm();
    }
  };

  return (
    <div className="login-register-container page-container">
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
