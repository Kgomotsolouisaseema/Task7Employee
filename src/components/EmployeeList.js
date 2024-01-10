import React, { useEffect, useState } from "react";
import '../styles/EmployeeList.css';

import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../utils/localStorage";
import swal from "sweetalert";

function EmployeeList({setAllEmployees}) {
  //Use state for storing employee data
  const [employees, setEmployees] = useState([]);

//  useEffect(()=>{
//   console.log("employee ", employees)
//  },[employees])

  //use Effect to load data from local  storage
  useEffect(() => {
    const storedEmployees = getDataFromLocalStorage("Employees");
    console.log(storedEmployees)
    if (storedEmployees) {
      setEmployees(storedEmployees);
      setAllEmployees(storedEmployees)
    }
    //Load data from local storage
  }, []);


  //function to handle employee deletion
  const deleteEmployee = (id) => {
    console.log("Delete employee btn clicked ");
    const updatedEmployees = employees.filter(
      (employee) => employee.id !==id
    );
    setEmployees(updatedEmployees);
    saveDataToLocalStorage("Employees", updatedEmployees);
    //Delete employee from local storage
    swal("Employee succefully deleted" , id)
  };

  return (
    <div className="container">
      <h2> Employee List  </h2>

      <ol style={{padding:0,textAlign: "justify" }}>
      {employees.map((employee) => (
        <li key={employee.id} className="employee-item">
          <div className='displaybox' >
          <span className="employee-name"> Employee Name :{" "}{employee.name} </span><br/>
          <span className="employee-name"> Employee Name :{" "}{employee.surname} </span><br/>
          <span className="employee-position"> Position :{" "} {employee.employeePosition}</span>
      
          <button className="deletebtn" onClick={() => deleteEmployee(employee.id)}>Delete</button>


          </div>
         
        </li>

        ))}

      </ol>
      
     
    </div>
  
  );
}

export default EmployeeList;
