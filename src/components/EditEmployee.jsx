import { React, useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function EditEmployee() {
    const [emailError, setEmailError] = useState("");
    const { id } = useParams();
    const [employees, setEmployees] = useState([
        { first_name: '', last_name: '', email: '' },
    ]);
    const [editingId, setEditingId] = useState(null);
    const [editEmployee, setEditEmployee] = useState({ first_name: '', last_name: '', email: '' });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    useEffect(() => {
        fetch(`https://dotesthere.com/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                // adjust according to API response
                setEditEmployee({
                    first_name: data.data.first_name || '',
                    last_name: data.data.last_name || '',
                    email: data.data.email || ''
                });
            })
            .catch(err => console.error(err));
    }, [id]);

    const saveEdit = async () => {

        try {
            console.log(id);
        const save = await fetch(`https://dotesthere.com/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name: editEmployee.first_name,
                    last_name: editEmployee.last_name,
                    email: editEmployee.email
                })
            });

            toast.success("Employee Updated Successfully ✅");

            if (save.status == 200 || 201) {
                console.log("save.status:", save.status,await save.json());
                console.log("API CALLED");
            }
            else if(save.status == 400 || 404 || 401) {
                console.error("Error updating employee");
            }

            setEmployees(employees.map(emp =>
                emp.id === editingId
                    ? { ...emp, ...editEmployee }
                    : emp
            ));

        } catch (error) {
            console.error(error);
        }
    };

   
    return (
        <div>
            <Toaster />
            <div className='flex justify-center mt-10'>
                <div className='w-full max-w-lg'>
                    <h2 className='text-3xl font-bold mb-6 text-center'>Edit Employee</h2>
                    <form className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    First Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" value={editEmployee.first_name} onChange={(e) => setEditEmployee({ ...editEmployee, first_name: e.target.value })} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Last Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" value={editEmployee.last_name} onChange={(e) => setEditEmployee({ ...editEmployee, last_name: e.target.value })} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                    Email
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="jane.doe@example.com" value={editEmployee.email} onChange={(e) => {
                                    setEditEmployee({ ...editEmployee, email: e.target.value });
                                    if (!validateEmail(e.target.value)) {
                                        setEmailError("Please enter a valid email address");
                                    } else {
                                        setEmailError("");
                                    }
                                }} />
                                {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                            </div>
                        </div>
                        <button type="submit" disabled={!validateEmail(editEmployee.email)} onClick={saveEdit} className={`${
    validateEmail(editEmployee.email) ? "bg-blue-500 text-white" : "bg-gray-400 cursor-not-allowed"}bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline`}><Link to="/editemployee/:id">Update</Link></button>
                        <button type="submit" disabled={!validateEmail(editEmployee.email)} onClick={saveEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-8  rounded focus:outline-none focus:shadow-outline"><Link to="/">Cancel</Link></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditEmployee