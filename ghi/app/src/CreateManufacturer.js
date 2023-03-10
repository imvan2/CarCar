import React from "react";

class CreateManufacturer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({name: value})
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    console.log('DATA: ', data);

    const postUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(postUrl, fetchConfig);
    if (response.ok) {
      const newManu = await response.json();
      console.log("New Manufacturer: ", newManu);
    }

    const cleared = {
      name: '',
    };

    this.setState(cleared);

  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new manufacturer</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" value={this.state.name} required type="text" id="name" name="name" className="form-control"/>
                <label htmlFor="name">Manufacturer name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        </div>

    );
  }
}

export default CreateManufacturer;
