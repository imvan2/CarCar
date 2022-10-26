import React from "react";

class CreateModel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      picture: '',
      manufacturers: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({name: value})
  }

  handlePictureChange(event) {
    const value = event.target.value;
    this.setState({picture: value})
  }

  handleManufacturerChange(event) {
    const value = event.target.value;
    this.setState({manufacturer: value})
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    data.picture_url = data.picture;
    delete data.picture;
    data.manufacturer_id = data.manufacturer;
    delete data.manufacturer;
    delete data.manufacturers;
    console.log('DATA: ', data);

    const postUrl = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(postUrl, fetchConfig);
    if (response.ok) {
      const newModel = await response.json();
      console.log("New Model: ", newModel);
    }

    const cleared = {
      name: '',
      picture: '',
      manufacturer: '',
    };

    this.setState(cleared);

  }

// to select the manufacturers
async componentDidMount() {
  // step 1: select all sold cars from sales records
  const urlRecords = 'http://localhost:8100/api/manufacturers/';

  const response = await fetch(urlRecords);

  if (response.ok) {
    const data = await response.json();
    console.log("DATA: ", data);

    this.setState({manufacturers: data.manufacturers});

    }
  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new model</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" value={this.state.name} required type="text" name="name" className="form-control"/>
                <label htmlFor="name">Model name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePictureChange} placeholder="Picture" value={this.state.picture} required type="url" name="picture" className="form-control"/>
                <label htmlFor="picture">Picture url</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleManufacturerChange} required name="manufacturer" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    );
                  })}
                </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        </div>

    );
  }
}

export default CreateModel;
