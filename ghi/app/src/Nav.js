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
        </div>
      </div>
    </nav>
  )
}

export default Nav;
