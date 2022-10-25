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
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salesrep/" element={<SalesRepForm />} />
          <Route path="salescustomer/" element={<SalesCustomerForm />} />
          <Route path="salerecords/" element={<SaleRecordForm />} />
          <Route path="salerecordslist/" element={<SaleRecordList />} />
          <Route path="salesreprecordslist/" element={<SalesRepRecordList />} />
          <Route path="manufacturerslist/" element={<ListManufacturers />} />
          <Route path="manufacturers/new/" element={<CreateManufacturer />} />
          <Route path="modelslist/" element={<ListModels />} />
          <Route path="models/new/" element={<CreateModel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
