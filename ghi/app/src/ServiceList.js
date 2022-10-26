import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function ServiceList(props) {

    const [services, setService] = useState([]);

    async function fetchData() {
        const response = await fetch("http://localhost:8080/api/services/");

        if (response.ok) {
            const data = await response.json();
            const filteredList = data.services.filter(
                service => service["if_finished"] === false);
            setService(filteredList);
        } else {
            console.log("Error fetching data.");
        };
    }

    useEffect(() => { fetchData() }, []);

    const removeData = (id) => {
        fetch(`http://localhost:8080/api/services/${id}`,
            { method: "DELETE" })
            .then(() => fetchData());
    };

    const changeStatus = (id) => {
        const data = { if_finished: true };

        fetch(`http://localhost:8080/api/services/${id}/`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then(() => fetchData());
    };

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer name</th>
                        <th>VIP</th>
                        <th>Date & Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, i) => {
                        return (
                            <tr key={i}>
                                <td>{service.vin}</td>
                                <td>{service.owner}</td>
                                <td>{String(service.is_vip)}</td>
                                <td>{service.appointment_time}</td>
                                <td>{service.technician.name}</td>
                                <td>{service.service_reason}</td>
                                <td><button onClick={() => removeData(service.id)}>Cancel</button></td>
                                <td><button onClick={() => changeStatus(service.id)}>Finish</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button>
                <NavLink className="nav-link" to="/services/new">Create a new service</NavLink>
            </button>
        </div>
    )
}
export default ServiceList;