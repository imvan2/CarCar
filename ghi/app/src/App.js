import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import TechnicianForm from './TechnicianForm'
import ServiceApptForm from './ServiceApptForm'
import ServiceList from './ServiceList';
import ServiceHistory from './ServiceHistory';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/services/new" element={<ServiceApptForm />} />
          <Route path="/services/" element={<ServiceList />} />
          <Route path="/services/search/" element={<ServiceHistory />} />
          <Route path="/automobiles/" element={<AutomobilesList />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
