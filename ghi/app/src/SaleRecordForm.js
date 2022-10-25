import React from "react";

class SaleRecordForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      price: '',
      salesReps: [],
      salesCustomers: [],
      automobiles: []};
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSalesRepChange = this.handleSalesRepChange.bind(this);
    this.handleSalesCustomerChange = this.handleSalesCustomerChange.bind(this);
    this.handleAutoChange = this.handleAutoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePriceChange(event) {
    const value = event.target.value;
    this.setState({price: value})
  }

  handleSalesRepChange(event) {
    const value = event.target.value;
    this.setState({salesRep: value})
  }

  handleSalesCustomerChange(event) {
    const value = event.target.value;
    this.setState({salesCustomer: value})
  }

  handleAutoChange(event) {
    const value = event.target.value;
    this.setState({automobile: value})
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    data.sales_price = data.price;
    data.sales_automobile = data.automobile;
    data.sales_rep = data.salesRep;
    data.sales_customer = data.salesCustomer;
    delete data.price;
    delete data.automobile;
    delete data.salesRep;
    delete data.salesCustomer;
    delete data.salesReps;
    delete data.salesCustomers;
    delete data.automobiles;
    console.log("Submit data: ", data);

    const postUrl = 'http://localhost:8090/api/salerecords/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(postUrl, fetchConfig);
    if (response.ok) {
      const newSale = await response.json();
      console.log("New Sale: ", newSale);
    }

    const cleared = {
      price: '',
      salesRep: '',
      salesCustomer: '',
      automobile: '',
    };

    this.setState(cleared);

  }


// to select the automobiles
async componentDidMount() {
// to select the sale records to filter any sold cars:
// step 1: select all sold cars from sales records
const urlRecords = 'http://localhost:8090/api/salerecords/';

const response4 = await fetch(urlRecords);

if (response4.ok) {
  const data = await response4.json();
  const records = data.sale_records;

  // step 2: creating an array with vins that were sold:
  const soldVins = [];
  records.map(record => {soldVins.push(record.sales_automobile)});

  // step 3: fetching autos data for all autos:
  const url = 'http://localhost:8100/api/automobiles/';

  const response1 = await fetch(url);

  if (response1.ok) {
    const data = await response1.json();
    const unfiltered = data.autos;
    // step 4: filter autos based on presence of their vin in soldVins list:
    const autos = unfiltered.filter(auto => !soldVins.includes(auto.vin))

    this.setState({automobiles: autos});

  }
}


//  to select the sales reps
  const urlRep = 'http://localhost:8090/api/salesreps/';

  const response2 = await fetch(urlRep);

  if (response2.ok) {
    const data = await response2.json();

    this.setState({salesReps: data.sales_reps});

  }

//  to select the sales customers
  const urlCustomer = 'http://localhost:8090/api/salescustomers/';

  const response3 = await fetch(urlCustomer);

  if (response3.ok) {
    const data = await response3.json();

    this.setState({salesCustomers: data.sales_customers});

  }
}


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sale record</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input onChange={this.handlePriceChange} placeholder="price" value={this.state.price} required type="number" id="price" name="price" className="form-control"/>
                <label htmlFor="price">price</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleAutoChange} required id="automobile" name="automobile" className="form-select">
                  <option value="">Choose a automobile</option>
                  {this.state.automobiles.map(automobile => {
                    return (
                      <option key={automobile.vin} value={automobile.vin}>
                        {automobile.vin}
                      </option>
                    );
                  })}
                </select>
                </div>
                <div className="mb-3">
                <select onChange={this.handleSalesRepChange} required id="salesReps" name="salesReps" className="form-select">
                  <option value="">Choose a sales rep</option>
                  {this.state.salesReps.map(salesRep => {
                    return (
                      <option key={salesRep.employee_id} value={salesRep.employee_id}>
                        {salesRep.name}
                      </option>
                    );
                  })}
                </select>
                </div>
                <div className="mb-3">
                <select onChange={this.handleSalesCustomerChange} required id="salesCustomers" name="salesCustomers" className="form-select">
                  <option value="">Choose a sales customer</option>
                  {this.state.salesCustomers.map(salesCustomer => {
                    return (
                      <option key={salesCustomer.phone_number} value={salesCustomer.phone_number}>
                        {salesCustomer.name}
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

export default SaleRecordForm;
