import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="navbar-brand" to="manufacturerslist/">Manufacturers List</NavLink>
        <NavLink className="navbar-brand" to="manufacturers/new/">Create Manufacturer</NavLink>
        <NavLink className="navbar-brand" to="modelslist/">Models List</NavLink>
        <NavLink className="navbar-brand" to="models/new/">Create Model</NavLink>
        <NavLink className="navbar-brand" to="salesrep/">Sales Rep</NavLink>
        <NavLink className="navbar-brand" to="salescustomer/">Sales Customer</NavLink>
        <NavLink className="navbar-brand" to="salerecords/">Sale Records</NavLink>
        <NavLink className="navbar-brand" to="salerecordslist/">Sale Records List</NavLink>
        <NavLink className="navbar-brand" to="salesreprecordslist/">Sales Rep Records List</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
