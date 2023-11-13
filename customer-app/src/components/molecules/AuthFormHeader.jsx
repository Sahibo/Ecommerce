import '../../global.css';
import './styles/molecules.css';

import Button from "../atoms/AuthFormHeaderButton"


export default function AuthFormHeader() {

  return (
    <div className="form-header-container">
      <Button text="Register" className="register-button-header button-header"/>
      <Button text="Login" className="login-button-header button-header"/>
    </div>
  );
};