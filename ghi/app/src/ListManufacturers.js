import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';


function ListManufacturers() {

  const [manus, setManus] = useState([]);

  async function loadData() {
    const response = await fetch("http://localhost:8100/api/manufacturers/");

    if (response.ok) {
      let data = await response.json();
      setManus(data.manufacturers);
    }
    else {
      console.error("response not ok", response);
    }
  }

  useEffect(() => {loadData();}, [] )

  return (
    <div>
      <h1>Manufacturers</h1>
    <table className='table table-striped'>
      <thead>
      <tr>
        <th>Manufacturers</th>
      </tr>
      </thead>
      <tbody>
				{manus.map((manu, i) => {
          return (
            <tr key={i}>
            <td> { manu.name } </td>
            </tr>
          )
        })}
      </tbody>
    </table>
                <button>
                <NavLink className="nav-link" to="/manufacturers/new">Create New</NavLink>
            </button>
            </div>
  )
}

export default ListManufacturers;
