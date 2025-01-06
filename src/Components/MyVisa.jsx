import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";


const MyVisa = () => {
    const { user } = useContext(AuthContext);
    const [visas, setVisas] = useState([]);
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://visa-navigator-server.vercel.app/myVisas?email=${user.email}`)
                .then(res => res.json())
                .then(data => setVisas(data))
                .catch(error => console.error("Error fetching visas:", error));
        }
    }, [user]);


    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://visa-navigator-server.vercel.app/visa/${id}`, {
                        method: "DELETE",
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.deletedCount > 0) {
                                Swal.fire("Deleted!", "Visa has been deleted.", "success");
                                setVisas(visas.filter((visa) => visa._id !== id));
                            } else {
                                Swal.fire("Error!", "Failed to delete the visa.", "error");
                            }
                        })
                        .catch((error) => Swal.fire("Error!", "Something went wrong.", "error"));
                }
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`https://visa-navigator-server.vercel.app/visa`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedVisa),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Visa has been updated successfully.", "success");
                    setVisas(visas.map((visa) => (visa._id === selectedVisa._id ? selectedVisa : visa)));
                    setShowModal(false);
                } else {
                    Swal.fire("Error!", "Failed to update the visa.", "error");
                }
            })
            .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
    };


    return (
        <>

            <Navbar></Navbar>
            <div className="bg-gradient-to-r from-blue-100 to-orange-100 pt-24">
                <div className="min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-11/12 mx-auto p-3">
                    <h2 className="text-3xl font-bold mb-6">My Added Visas</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Header */}
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                                    <th>#</th>
                                    <th>Country</th>
                                    <th>Visa Type</th>
                                    <th>Processing Time</th>
                                    <th>Fee</th>
                                    <th>Validity</th>
                                    <th>Application Method</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {visas.map((visa, index) => (
                                    <tr key={visa._id} className="hover">
                                        <td>{index + 1}</td>
                                        <td className="flex flex-col items-center gap-2">
                                            <img
                                                src={visa.countryImage}
                                                alt={visa.countryName}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            {visa.countryName}
                                        </td>
                                        <td>{visa.visaType}</td>
                                        <td>{visa.processingTime}</td>
                                        <td>${visa.fee}</td>
                                        <td>{visa.validity}</td>
                                        <td>{visa.applicationMethod}</td>
                                        <td className="flex gap-2">
                                            {/* Update Button */}
                                            <button
                                                onClick={() => {
                                                    setSelectedVisa(visa);
                                                    setShowModal(true);
                                                }}
                                                className="btn btn-sm btn-info text-white"
                                            >
                                                Update
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(visa._id)}
                                                className="btn btn-sm btn-error text-white"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Update Modal */}
                    {showModal && selectedVisa && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-xl font-bold mb-4">Update Visa</h3>
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700">Country</label>
                                        <input
                                            type="text"
                                            value={selectedVisa.countryName}
                                            onChange={(e) => setSelectedVisa({ ...selectedVisa, countryName: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Visa Type</label>
                                        <input
                                            type="text"
                                            value={selectedVisa.visaType}
                                            onChange={(e) => setSelectedVisa({ ...selectedVisa, visaType: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Processing Time</label>
                                        <input
                                            type="text"
                                            value={selectedVisa.processingTime}
                                            onChange={(e) => setSelectedVisa({ ...selectedVisa, processingTime: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Fee</label>
                                        <input
                                            type="number"
                                            value={selectedVisa.fee}
                                            onChange={(e) => setSelectedVisa({ ...selectedVisa, fee: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer></Footer>

        </>
    );
};

export default MyVisa;