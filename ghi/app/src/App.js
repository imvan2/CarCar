import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SalesRepForm from './SalesRepForm';
import SalesCustomerForm from './SalesCustomerForm';
import SaleRecordForm from './SaleRecordForm';
import SaleRecordList from './SaleRecordList';
import SalesRepRecordList from './SalesRepRecordList';
import ListManufacturers from './ListManufacturers';
import ListModels from './ListModels';
import CreateManufacturer from './CreateManufacturer';
import CreateModel from './CreateModel';
import ListAutomobiles from './ListAutomobiles';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="sales">
          <Route path="rep" element={<SalesRepForm />} />
          <Route path="customer" element={<SalesCustomerForm />} />
          <Route path="records/new" element={<SaleRecordForm />} />
          <Route path="records/list" element={<SaleRecordList />} />
          <Route path="records/rep/list" element={<SalesRepRecordList />} />
          </Route>
          <Route path="manufacturers">
          <Route path="list" element={<ListManufacturers />} />
          <Route path="new" element={<CreateManufacturer />} />
          </Route>
          <Route path="models">
          <Route path="list" element={<ListModels />} />
          <Route path="new" element={<CreateModel />} />
          </Route>
          <Route path="automobiles">
          <Route path="list" element={<ListAutomobiles />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
