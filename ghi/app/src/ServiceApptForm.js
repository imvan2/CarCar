import React from "react";

class ServiceForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            vin: "",
            owner: "",
            appointment_time: "",
            technicians: [],
            service_reason: "",
            if_finished: false,
        }

        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleServiceReasonChange = this.handleServiceReasonChange.bind(this);
        this.handleAppointmentTimeChange = this.handleAppointmentTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleVinChange
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }

    // handleOwnerChange
    handleOwnerChange(event) {
        const value = event.target.value;
        this.setState({ owner: value });
    }

    // handleAppointmentDateChange
    handleAppointmentTimeChange(event) {
        const value = event.target.value;
        this.setState({ appointment_time: value })
    }

    // handleTechnicianChange
    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({ technician: value });

    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log("data:", data)
            this.setState({ technicians: data.technicians });
            console.log(this.state.technicians);
        }
    }

    // handleServiceReasonChange
    handleServiceReasonChange(event) {
        const value = event.target.value;
        this.setState({ service_reason: value });
    }

    // handleSubmit
    async handleSubmit(event) {
        event.preventDefault();

        const data = { ...this.state };
        delete data.technicians;

        const serviceUrl = "http://localhost:8080/api/services/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        };

        const response = await fetch(serviceUrl, fetchConfig);
        if (response.ok) {
            const newService = await response.json();
            console.log(newService)
        }

        const cleared = {
            vin: "",
            owner: "",
            appointment_time: "",
            technicians: "",
            service_reason: "",
            if_finished: "",
        }

        this.setState(cleared);
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new service appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleVinChange} placeholder="vin" value={this.state.vin} required type="text" name="vin" id="nvin" className="form-control" />
                                <label htmlFor="vin">Vin Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleOwnerChange} placeholder="owner" value={this.state.owner} required type="text" name="owner" id="owner" className="form-control" />
                                <label htmlFor="owner">Owner</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleAppointmentTimeChange} placeholder="time" value={this.state.appointment_time} required type="datetime-local" name="time" id="time" className="form-control" />
                                <label htmlFor="time">Appointment Time</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleTechnicianChange} required name="technicians" id="technicians" className="form-select">
                                    <option value="">Choose a technician</option>
                                    {this.state.technicians.map(tech => {
                                        return (
                                            <option key={tech.employee_number} value={tech.employee_number}>{tech.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleServiceReasonChange} placeholder="service_reason" value={this.state.service_reason} required type="text" name="service_reason" id="service_reason" className="form-control" />
                                <label htmlFor="service_reason">Reason for service</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceForm;