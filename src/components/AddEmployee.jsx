
import { useEffect, useState, React } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function AddEmployee() {
    const [emailError, setEmailError] = useState("");
    const [data, setData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ first_name: '', last_name: '', email: '' });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    const addEmployee = async () => {
        if (newEmployee.first_name && newEmployee.last_name && newEmployee.email) {
            try {
                const response = await fetch("https://dotesthere.com/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        first_name: newEmployee.first_name,
                        last_name: newEmployee.last_name,
                        email: newEmployee.email
                    })
                });

                const data = await response.json();
                console.log("API Response:", data);

                toast.success("Employee Added Successfully ✅");
                // Update UI after API success
                setEmployees([...employees, { ...newEmployee, id: data.id || Date.now() }]);

                // Clear form
                setNewEmployee({ first_name: '', last_name: '', email: '' });

            } catch (error) {
                console.error("Error:", error);
            }
        }
    };


    useEffect(() => {
        fetch('https://dotesthere.com/api/users')
            .then(response => response.json())
            .then(res => setEmployees(res.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div>
            <Toaster />
            {/* Add Employee Form */}
            <div className='flex justify-center mt-10'>
                <div className='w-full max-w-lg'>
                    <h2 className='text-3xl font-bold mb-6 text-center'>Add Employee</h2>
                    <form className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    First Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" value={newEmployee.first_name} onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Last Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" value={newEmployee.last_name} onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                    Email
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="jane.doe@example.com" value={newEmployee.email} onChange={(e) => {
                                    setNewEmployee({ ...newEmployee, email: e.target.value });
                                    if (!validateEmail(e.target.value)) {
                                        setEmailError("Please enter a valid email address");
                                    } else {
                                        setEmailError("");
                                    }
                                }} />
                                {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                            </div>
                        </div>
                        <div className="flex items-center justify-center pt-5">
                            <button className={`${validateEmail(newEmployee.email) ? "bg-blue-500 text-white" : "bg-gray-400 cursor-not-allowed"} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer}`} type="button" disabled={!validateEmail(newEmployee.email)} onClick={addEmployee} >
                               <Link to="/">Add Employee</Link>
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold ml-8 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="button" onClick={addEmployee} >
                                <Link to="/">Back</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default AddEmployee