import React from 'react';
import { useState, useEffect } from 'react';


function ListModels() {

  const [models, setModels] = useState([]);

  async function loadData() {
    const response = await fetch("http://localhost:8100/api/models/");

    if (response.ok) {
      let data = await response.json();
      setModels(data.models);
    }
    else {
      console.error("response not ok", response);
    }
  }

  useEffect(() => {loadData();}, [] )

  return (
    <div>
      <h1>Vehicle models</h1>
    <table className='table table-striped'>
      <thead>
      <tr>
        <th>Name</th>
        <th>Manufacturer</th>
        <th>Picture</th>
      </tr>
      </thead>
      <tbody>
				{models.map((model, i) => {
          return (
            <tr key={i}>
            <td> { model.name } </td>
            <td> { model.manufacturer.name } </td>
            <td> <img src={model.picture_url}/> </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}

export default ListModels;
