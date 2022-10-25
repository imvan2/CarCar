import React from "react";

class SalesCustomerForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      phoneNumber: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({name: value})
  }

  handleAddressChange(event) {
    const value = event.target.value;
    this.setState({address: value})
  }

  handlePhoneChange(event) {
    const value = event.target.value;
    this.setState({phoneNumber: value})
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    data.phone_number = data.phoneNumber;
    delete data.phoneNumber;
    console.log('DATA: ', data);

    const postUrl = 'http://localhost:8090/api/salescustomers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(postUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      console.log("New Sales Customer: ", newCustomer);
    }

    const cleared = {
      name: '',
      address: '',
      phoneNumber:'',
    };

    this.setState(cleared);

  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sales customer</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" value={this.state.name} required type="text" id="name" name="name" className="form-control"/>
                <label htmlFor="name">Sales Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleAddressChange} placeholder="Address" value={this.state.address} required type="text" id="address" name="address" className="form-control"/>
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePhoneChange} placeholder="phoneNumber" value={this.state.phoneNumber} required type="number" id="phoneNumber" name="phoneNumber" className="form-control"/>
                <label htmlFor="phoneNumber">Phone number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        </div>

    );
  }
}

export default SalesCustomerForm;
