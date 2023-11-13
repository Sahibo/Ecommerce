import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { registerUser } from "../../store/reducer";
import InputField from "../atoms/InputField";
import { validateEmail, validatePassword } from '../../services/validators/LoginRegistrationValitator';


export default function RegistrationFormik () {
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
    <div className="registerForm-container molecule-container">
      <Formik initialValues={{ email: "", password: "" }}
         onSubmit={handleSubmit}>

        <Form className="common-form-container">

          <InputField
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            validate={(value) => validateEmail(value)}/>

          <InputField
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            validate={(value) => validatePassword(value)}/>


          <button type="submit" className="form-submit-button button">
            <span>Register</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
};
