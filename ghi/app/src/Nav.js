import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" htmltabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header bg-success text-white">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body bg-success">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item dropdown ">
                <NavLink className=" text-right nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sales
                </NavLink>
                <ul className="dropdown-menu bg-success text-dark ms-2">
                  <li><NavLink className="nav-link ms-3" to="sales/records/list/">Sale Records List</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="sales/records/rep/list/">Sales Rep Records List</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="sales/rep/">Create Sales Rep</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="sales/customer/">Create Sales Customer</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="sales/records/new/">Create Sale Record</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </NavLink>
                <ul className="dropdown-menu bg-success text-dark ms-2">
                  <li><NavLink className="nav-link ms-3" to="/services/">Services List</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="/services/search/">Search Service History</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="/technicians/new">Create technician</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="/services/new">Create service</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Inventory
                </NavLink>
                <ul className="dropdown-menu bg-success text-dark ms-2">
                  <li><NavLink className="nav-link ms-3" to="manufacturers/list/">Manufacturers List</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="models/list/">Models List</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="automobiles/list/">Automobiles List</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="manufacturers/new/">Create Manufacturer</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="models/new/">Create Model</NavLink></li>
                  <li><NavLink className="nav-link ms-3" to="/automobiles/new">Create a new car</NavLink></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
