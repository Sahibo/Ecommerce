import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Container } from './components/Container';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Container/>
      </BrowserRouter>
    </div>
  );
}

export default App;
