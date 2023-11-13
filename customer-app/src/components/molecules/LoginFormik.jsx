import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";


import { loginUser } from "../../store/reducer";
import InputField from "../atoms/InputField";
import { validateEmail, validatePassword} from "../../services/validators/LoginRegistrationValitator";

export default function LoginFormik() {
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
    <div className="loginForm-container molecule-container">
      <Formik initialValues={{ email: "", password: "" }}
         onSubmit={handleSubmit}>

        <Form className="common-form-container">
          <InputField
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            validate={(value) => validateEmail(value)}
          />

          <InputField
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            validate={(value) => validatePassword(value)}
          />

          <div className="form-checkBox">
            <label>
              <Field type="checkbox" name="rememberMe" />
              Remember Me
            </label>
          </div>

          <button type="submit" className="form-submit-button button">
            <span>Login</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}
