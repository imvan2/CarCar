import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function AutomobilesList(props) {

    const [automobiles, setAutomobiles] = useState([]);

    async function fetchData() {
        const response = await fetch("http://localhost:8100/api/automobiles/");

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setAutomobiles(data.autos);
        } else {
            console.log("Error fetching data.");
        };
    }

    useEffect(() => { fetchData() }, []);

    return (
        <div>
            <h1>Vehicle Models</h1>
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
export default AutomobilesList;