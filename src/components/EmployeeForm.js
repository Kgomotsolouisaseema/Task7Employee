import React from "react";
import { useState, useRef } from "react";
import "../styles/EmployeeForm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// import { saveDataToLocalStorage } from "../utils/localStorage";
import swal from "sweetalert";
import defaultImage from "../assests/user.png";

function EmployeeForm({ onUpdate }) {
  //INDIVIDUAL STATES FOR ALL FIELDS
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  

  //Function to handle form submission (add/update  employee)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !name ||
      !surname ||
      !idNumber ||
      !email ||
      !employeePosition ||
      !phoneNumber ||
      !image
    ) {
      // Notify the user about the missing fields
      swal("Please fill in all required fields, including the image!");
      return;
    }

    //convert the input valuesto uppercase
    const uppercaseName = name.toUpperCase();
    const uppercaseSurname = surname.toUpperCase();
    const uppercaseEmail = email.toUpperCase();
    const uppercaseEmployeePosition = employeePosition.toUpperCase();

    try {
      const newEmployee = {
        id: idNumber, //unique identifier
        name: uppercaseName,
        surname: uppercaseSurname,
        idNumber,
        email: uppercaseEmail,
        employeePosition: uppercaseEmployeePosition,
        phoneNumber,
        image,
      };
      console.log(newEmployee);
      //get employees from local storage
      const storedEmployees =
        JSON.parse(localStorage.getItem("Employees")) || [];
      //Update employee list with new employee
      const updatedEmployees = [...storedEmployees, newEmployee];
      //save updated employees list to loacl storage
      // saveDataToLocalStorage('Employees', updatedEmployees);
      localStorage.setItem("Employees", JSON.stringify(updatedEmployees));

      //Clear form fields after submission
      setName("");
      setSurname("");
      setIdNumber("");
      setEmail("");
      setEmployeePosition("");
      setPhoneNumber("");
      setImage("");
      setImagePreview("");

      // Notify success
      swal("'Employee added successfully!'");
      // setSuccessMessage('Employee added successfully!');
      // setErrorMessage('');/
      onUpdate && onUpdate(updatedEmployees);

      // Display a success notification
      swal("Employee added successfully");
    } catch (error) {
      // Handle errors
      // setSuccessMessage('');
      swal("Failed to add employee. Please try again.");
      console.error("Error adding employee:", error);
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="image" className="image-upload">
          <img
            src={image ? URL.createObjectURL(image) : defaultImage}
            alt="Selected"
            className="preview-image"
          />
          <input
            type="file" //type for adding images , the type attribute allows for that
            id="img"
            name="img"
            accept="image/*" //field to only accept images
            // required
            // value={image}
            ref={fileInputRef} //reference to the file input
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <span className="upload-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </label>

        <label htmlFor="name"> Employee Name</label>
        <input
          type="text"
          label="Name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="surname">Employee Surname:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          // onChange={handleInputChange}
        />
        <label htmlFor="idnumber">Employee ID Number :</label>
        <input
          type="text"
          id="Idnumber"
          name="Idnumber"
          required
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          // onChange={handleInputChange}
        />
        <label htmlFor="email">Employee Email :</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // onChange={handleInputChange}
        />
        <label htmlFor="position">Employee Positon :</label>
        <input
          type="text"
          id="position"
          name="position"
          required
          value={employeePosition}
          onChange={(e) => setEmployeePosition(e.target.value)}
          // onChange={handleInputChange}
        />

        <label htmlFor="phonenumber">Employee Phone Number:</label>
        <input
          type="tel"
          id="phonenumber"
          name="phonenumber"
          placeholder="071 459 8679"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          // onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
