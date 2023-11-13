import '../../global.css';
import './styles/atoms.css';

export default function AuthFormHeaderButton({text}) {
  
  return (
    <div className="form-header-button-container">
      <span>{text}</span>
    </div>
  );
};