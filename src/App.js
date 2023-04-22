import logo from './logo.svg';
import './App.css';
import {Routes, Link, Route} from "react-router-dom";
import Comics from './pages/Comics/Comics';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Comics />} />
          <Route path="/:category" exact element={<Comics />} />
        </Routes>
      </>
  );
}

export default App;
