import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function ListAutomobiles() {

    const [automobiles, setAutomobiles] = useState([]);

    async function fetchData() {

        const response4 = await fetch('http://localhost:8090/api/salerecords/');

        if (response4.ok) {
          const data = await response4.json();
          const records = data.sale_records;

          // step 2: creating an array with vins that were sold:
          const soldVins = [];
          records.map(record => {soldVins.push(record.sales_automobile)});


        const response = await fetch("http://localhost:8100/api/automobiles/");

        if (response.ok) {
            const data = await response.json();
            const unfiltered = data.autos;

            // step 4: filter autos based on presence of their vin in soldVins list:
            const autos = unfiltered.filter(auto => !soldVins.includes(auto.vin))

            setAutomobiles(autos);

        } else {
            console.log("Error fetching data.");
        };
      }
    }

    useEffect(() => { fetchData() }, []);

    return (
        <div>
            <h1>Automobiles</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map((automobile, i) => {
                        return (
                            <tr key={i}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button>
                <NavLink className="nav-link" to="/automobiles/new">Create New</NavLink>
            </button>
        </div>
    )
}
export default ListAutomobiles;
