import React, { useEffect, useState } from "react";
import "../styles/EmployeeSearch.css";
import swal from "sweetalert";

function EmployeeSeach({ employees }) {
  console.log("employees", employees);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  //states for updating empoyees details
  const [updatedName, setUpdatedName] = useState("");
  const [updatedSurname, setUpdatedSurname] = useState("");
  const [updatedPosition, setUpdatedPosition] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});
  const [updatedEmployee, setUpdatedEmployee] = useState({});


  useEffect(() => {
    console.log("Recieved employees:", employees);
    // setSelectedEmployee(employees);
  }, [employees]);

  const handleSearch = () => {
    //Does employees have data it in before we filter by id
    // if (!Array.isArray(employees)){
    //   return;
    // }
    const filteredEmployees = employees.filter((employees) =>
      employees.idNumber.includes(searchQuery)
    );
    // onSearch && onSearch(filteredEmployees);
    setSelectedEmployee(filteredEmployees);
  };

  //handle employee search
  const handleEmployeeSelect = (employee) => {
    console.log("handle employee select btn clicked ");
    setSelectedEmployee(employee);
    setEditedEmployee({ ...employee });
    setisEditing(true); //open edit input
  };

  const handleUpdate = async (id, employees) => {
    
    try {
      let people = localStorage.getItem("Employees");
      console.log("update btn clicked");
      //get existing items from local storage first

      //parse the current data or initialize a new array
      people = people ? JSON.parse(people) : [];

      // Create an object for the updated employee
      let  updatedEmployee = {
        id: id, 
        name: updatedName, 
        surname: updatedSurname, 
        employeePosition: updatedPosition, 
       
      };

      //find the item by ID AND UPDATE IT
      const updatedPeople = people.map((person) => {
        if (person.id === id) {
          // return { ...person, ...updatedEmployee };
          const updatedPerson = {...person , ...employees}
          setUpdatedEmployee(updatedPerson)
          return updatedPerson;
        }
        return person;
      });
      // update the local storage with the modified data
      localStorage.setItem("Employees", JSON.stringify(updatedPeople));
    } catch (error) {
      console.error("Error updating employee", error);
      swal("Error Updating Employee");
    }
  };

  //handle input field change
  const handleInputChange = () => {
    console.log("handle input change btn clicked");
  };

  return (
    <div className="container">
      <h2> Employee Search </h2>

      <input
        type="text"
        placeholder="Search by ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/*Display selected employee details for update/delete*/}
      <ol className="list" style={{ padding: 0, textAlign: "justify" }}>
        {selectedEmployee &&
          Array.isArray(selectedEmployee) &&
          selectedEmployee.map((employees) => (
            <li key={employees.id} className="employee-item">
              <div className="displaybox">
                <span className="employee-name">
                  {" "}
                  Employee Name : {employees.name}{" "}
                </span>
                <br />
                <span className="employee-name">
                  {" "}
                  Employee Surname : {employees.surname}{" "}
                </span>
                <br />
                <span className="employee-name">
                  {" "}
                  Employee Name : {employees.idNumber}{" "}
                </span>
                <br />
                <span className="employee-name">
                  {" "}
                  Employee Name : {employees.employeePosition}{" "}
                </span>
                <br />
              </div>
              <button
                className="editbtn"
                onClick={(employee) => handleEmployeeSelect(employee)}
              >
                EDIT
              </button>
            </li>
          ))}
      </ol>

      {/*Editing UI */}
      {isEditing && (
        <div>
          <h3>Editing Employee Details </h3>
          <input
            type="text"
            name="name"
            placeholder="NAME"
            value={editedEmployee.name}
            // onChange={handleInputChange}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="text"
            name="surname"
            placeholder="SURNAME"
            value={editedEmployee.surname}
            // onChange={handleInputChange}
            onChange={(e) => setUpdatedSurname(e.target.value)}
          />
          <input
            type="text"
            name="position"
            placeholder="POSITION"
            value={editedEmployee.employeePosition}
            // onChange={handleInputChange}
            onChange={(e) => setUpdatedPosition(e.target.value)}
          />

          <button onClick={() => handleUpdate(selectedEmployee.id , updatedEmployee )}>
            UPDATE
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeSeach;
