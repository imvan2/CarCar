import React from 'react';
import { useState, useEffect } from 'react';


function SaleRecordList() {

  const [saleRecords, setRecords] = useState([]);

  async function loadRecords() {
    const response = await fetch("http://localhost:8090/api/salerecords/");

    if (response.ok) {
      let data = await response.json();
      setRecords(data.sale_records);
    }
    else {
      console.error("response not ok", response);
    }
  }

  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => { loadRecords(); }, [])

  return (
    <div>
      <h1>Sale records</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sales rep name</th>
            <th>Employee id</th>
            <th>Sales customer name</th>
            <th>Auto VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {saleRecords.map((record, i) => {
            return (
              <tr key={i}>
                <td> {record.sales_rep_name} </td>
                <td> {record.sales_rep_id} </td>
                <td> {record.sales_customer} </td>
                <td> {record.sales_automobile} </td>
                <td> {formatter.format(record.sales_price)} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SaleRecordList;
