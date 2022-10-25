import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SalesRepForm from './SalesRepForm';
import SalesCustomerForm from './SalesCustomerForm';
import SaleRecordForm from './SaleRecordForm';
import SaleRecordList from './SaleRecordList';
import SalesRepRecordList from './SalesRepRecordList';
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
