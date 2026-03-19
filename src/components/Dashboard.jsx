
import { useEffect, useState, React } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import toast, {Toaster} from 'react-hot-toast';




function Dashboard() {

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const [employees, setEmployees] = useState([
    { first_name: '', last_name: '', email: '' },
  ]);
  const [editEmployee, setEditEmployee] = useState({ first_name: '', last_name: '', email: '' });

  const handleSearch = () => {
    const text = searchText.toLowerCase();

    const result = data.filter(emp => {
        return (
            (emp.id?.toString() || "").includes(text) ||
            (emp.first_name || "").toLowerCase().includes(text) ||
            (emp.last_name || "").toLowerCase().includes(text) ||
            (emp.email || "").toLowerCase().includes(text)
        );
    });

    console.log("Search Result:", result);

    setFilteredEmployees(result);
    setIsSearched(true);
};



  const startEdit = (emp) => {
    console.log(emp);
    setEmployees(emp.id);
    setEditEmployee({ ...emp });
  };

  const deleteEmployee = async (id) => {
    console.log("Deleting ID:", id);

    try {
      await fetch(`https://dotesthere.com/api/users/${id}`, {
        method: "DELETE"
      });

      toast.error("Employee Deleted Successfully 🗑️");
      console.log("Deleted from API ");

      setEmployees(employees.filter(emp => emp.id !== id));

    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200, },
    {
      field: 'action', headerName: 'Edit', width: 150, renderCell: (emp) => (
        <div>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-2' onClick={() => startEdit(emp)}><Link to={`/editemployee/${emp.id}`}>Edit</Link></button>
        </div>
      )
    },
    {
      field: 'action1', headerName: 'Delete', width: 150, renderCell: (emp) => (
        <div>
          <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-2' onClick={() => deleteEmployee(emp.id)}>Delete</button>
        </div>
      )
    },
  ];

  useEffect(() => {
    fetch('https://dotesthere.com/api/users')
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div>
      <Toaster /> 
      <div className='flex items-center gap-2 pt-6'>
        <h1 className=' ml-4 font-bold text-2xl'>Employee Details</h1>

        <div className="w-full max-w-lg px-3 justify-items-end ml-auto">
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-searchbar" type="text" placeholder="Search... about Employees" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-3' onClick={handleSearch}>Search</button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-4'><Link to="/addemployee"> + </Link></button>
      </div>
      <div>
        <Paper sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={isSearched ? filteredEmployees : data}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </div>
  )
}

export default Dashboard