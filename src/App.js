
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeSeach from './components/EmployeeSeach';

import EmployeeSearch from './components/EmployeeSeach';
import React, { useState } from 'react';

function App() {
  

  const [allEmployees, setAllEmployees] = useState([ ]);

  const handleUpdate = (updatedEmployees)=>{
    setAllEmployees(updatedEmployees);
  };

  const handleSearch = (filteredEmployees)=>{
    setAllEmployees(filteredEmployees)
  }
  


  return (
    <div className="App">
     <EmployeeForm onUpdate={handleUpdate}/>
     <EmployeeList setAllEmployees={setAllEmployees}/>
     <EmployeeSearch employees={allEmployees} onSearch={handleSearch} />
    

    </div>
  );
}

export default App;
  