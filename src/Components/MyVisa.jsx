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
            fetch(`http://localhost:5000/myVisas?email=${user.email}`)
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
                    fetch(`http://localhost:5000/visa/${id}`, {
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
        fetch(`http://localhost:5000/visa`, {
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
            <div className="min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-11/12 mx-auto">
                <h2 className="text-3xl font-bold mb-6">My Added Visas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visas.map((visa) => (
                        <div key={visa._id} className="border rounded-lg p-4 shadow-md">
                            <img
                                src={visa.countryImage}
                                alt={visa.country}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <p><strong>Country:</strong> {visa.countryName}</p>
                            <p><strong>Visa Type:</strong> {visa.visaType}</p>
                            <p><strong>Processing Time:</strong> {visa.processingTime}</p>
                            <p><strong>Fee:</strong> ${visa.fee}</p>
                            <p><strong>Validity:</strong> {visa.validity}</p>
                            <p><strong>Application Method:</strong> {visa.applicationMethod}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => {
                                        setSelectedVisa(visa);
                                        setShowModal(true);
                                    }}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(visa._id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
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

              <Footer></Footer>

        </>
    );
};

export default MyVisa;