import React from 'react';
import { useState, useEffect } from 'react';


function SalesRepRecordList() {

  const [saleRecords, setRecords] = useState([]);
  const [saleRep, setRep] = useState([]);
  const [option, setOption] = useState([]);
  const [repsRecords, setRepsRecords] = useState([]);

  async function loadRep() {

    const response2 = await fetch("http://localhost:8090/api/salesreps/");

    if (response2.ok) {
      let data2 = await response2.json();
      setRep(data2.sales_reps);
    }
    else {
      console.error("reps response not ok", response2);
    }
  }
  // getting the employee id value from the dropdown menu
  // and using it to send it to the records list and filter it
  function handleChange(event) {
    setOption(event.target.value)
    const value = event.target.value;
    loadRecords(value);

  }

  async function loadRecords(id) {
    const response1 = await fetch("http://localhost:8090/api/salerecords/");

    if (response1.ok) {
      let data1 = await response1.json();
      setRecords(data1.sale_records);
      const records = data1.sale_records;
      // creating temporary list to push filtered record list to
      // and then assign the setRepsRecords list to this temp value
      const temp = [];
      // looping through the record data pulled to only keep the records
      // for the sales rep id employee
      for (let record of records) {
        if (record.sales_rep_id === id) {
          temp.push(record);
        }
      }
      setRepsRecords(temp);
    }
    else {
      console.error("records response not ok", response1);
    }
  }

  // Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

  useEffect(() => {loadRep();}, [] )

  return (
    <div>
    <h1>Sales person history</h1>
      <div className="form-floating mb-3">
        <div className="mb-3">
        <select onChange={handleChange} required name="salesRep" className="form-select">
        <option value="">Choose a sales rep</option>
      {saleRep.map((rep, i) => {
        return (
          <option key={i} value={rep.employee_id}>
            {rep.name}
          </option>
        );
      })}
    </select>
    </div>
    </div>
    <table className='table table-striped'>
      <thead>
      <tr>
        <th>Sale rep name</th>
        <th>Sale customer name</th>
        <th>Auto VIN</th>
        <th>Sale price</th>
      </tr>
      </thead>
      <tbody>
				{repsRecords.map((record, i) => {
          return (
            <tr key={i}>
            <td> { record.sales_rep_name } </td>
            <td> { record.sales_customer } </td>
            <td> { record.sales_automobile } </td>
            <td> { formatter.format(record.sales_price) } </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}


export default SalesRepRecordList;
