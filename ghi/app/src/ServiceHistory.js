import React from "react";

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchInput: "",
            filteredList: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange = (event) => {
        const value = event.target.value;
        this.setState({ searchInput: value });
    };


    async handleSubmit(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/api/services/");

        if (response.ok) {
            const data = await response.json();
            // for (let service of data.services) {
            //     console.log(service["vin"] === this.state.searchInput);
            // }
            const filteredList = data.services.filter(
                service => service["vin"] === this.state.searchInput);
            // service => unfilteredList.includes(this.state.searchInput));
            console.log(filteredList);
            this.setState({ filteredList: filteredList });
            // console.log(this.state.filteredList);
        } else {
            console.log("Error fetching data.");
        };
    }


    render() {
        return (
            <div>
                <input type="text" placeholder="Search VIN here" onChange={this.handleSearchChange} value={this.state.searchInput} />
                <button onClick={this.handleSubmit}>Search</button>
                <h1>Service Appointments</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer name</th>
                            <th>Date</th>
                            <th>Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredList.map((service, i) => {
                            return (
                                <tr key={i}>
                                    <td>{service.vin}</td>
                                    <td>{service.owner}</td>
                                    <td>{service.appointment_time}</td>
                                    <td>{service.technicians.name}</td>
                                    <td>{service.service_reason}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ServiceHistory;