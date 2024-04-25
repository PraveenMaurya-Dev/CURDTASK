import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [refreshIndicator, setRefreshIndicator] = useState(false);

console.log("data", data)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getAllUser'); 
      console.log("response", response.data.data)
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
      setRefreshIndicator(prevState => !prevState);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.delete('http://localhost:3000/api/deleteUserById', 
      { data: { id: selectedRecords } }); 
      setSelectedRecords([]); 
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  

  const handleCheckboxChange = (e, recordId) => {
    if (e.target.checked) {
      setSelectedRecords([...selectedRecords, recordId]);
    } else {
      setSelectedRecords(selectedRecords.filter(id => id !== recordId));
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData();
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>DOB</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id}>
              <td>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, record._id)}
              />
              </td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.dob}</td>
              <td>{record.gender}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={handleDeleteSelected}>Delete Selected</button>

    </div>
  );
}

export default App;