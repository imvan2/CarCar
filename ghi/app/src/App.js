import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import TechnicianForm from './TechnicianForm'
import ServiceApptForm from './ServiceApptForm'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/services/new" element={<ServiceApptForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
