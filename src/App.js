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
          <Route path="/" exact key="root" element={<Comics />} />
          <Route path="/comic" exact key="test" element={<Comics />} />
          <Route path="/magazine" exact key="test" element={<Comics />} />
          <Route path="/digital-comic" exact key="test" element={<Comics />} />
        </Routes>
      </>
  );
}

export default App;
