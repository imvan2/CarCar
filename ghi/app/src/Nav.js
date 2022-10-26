import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="navbar-brand" to="/technicians/new">Technicians</NavLink>
        <NavLink className="navbar-brand" to="/services/new">Create a new service appt</NavLink>
        <NavLink className="navbar-brand" to="/services/">Services</NavLink>
        <NavLink className="navbar-brand" to="/services/search/">Search Service History</NavLink>
        <NavLink className="navbar-brand" to="/automobiles/">Automobiles</NavLink>
        <NavLink className="navbar-brand" to="/automobiles/new">Create a new car</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="navbar-brand" to="/">CarCar</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="manufacturers/list/">Manufacturers List</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="manufacturers/new/">Create Manufacturer</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="models/list/">Models List</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="models/new/">Create Model</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="automobiles/list/">List Automobiles</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales/rep/">Create Sales Rep</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales/customer/">Create Sales Customer</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales/records/new/">Create Sale Record</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales/records/list/">Sale Records List</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales/records/rep/list/">Sales Rep Records List</NavLink>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
