import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
 
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../store/reducer";
import InputField from "../atoms/InputField";
import { validateEmail, validatePasswordLength } from "../../services/validators/LoginRegistrationValitator";
 
export default function LoginFormik() {
  const errorMessage = useSelector((state) => state.user.error);
  const accessToken = useSelector((state) => state.user.accessToken);
  
  // const keyToRemove = 'accessToken';
  // localStorage.removeItem(keyToRemove);
  
  const navigate = useNavigate()
  

  const userToken = localStorage.getItem("accessToken")

  console.log(userToken)
  console.log(accessToken)

 
  useEffect(() => {
    if (userToken != null) {
      navigate('/');
      window.location.reload();
    }
  }, [accessToken])
 
  const dispatch = useDispatch();
 
  const handleSubmit = async (values) => {
 
    const { email, password, rememberMe } = values;
 
    await dispatch(loginUser({ email, password, rememberMe }));
    
    if (userToken != null) {
      navigate('/');

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
            validate={(value) => validatePasswordLength(value)}
          />
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
 
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