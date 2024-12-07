import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import Swal from "sweetalert2";
import Navbar from "./Navbar";

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/apply?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setApplications(data);
                    setIsLoading(false);
                })
                .catch((error) => console.error("Error fetching applications:", error));
        }
    }, [user]);



    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/apply/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Canceled!", "Your application has been canceled.", "success");
                            setApplications(applications.filter((app) => app._id !== id));
                        } else {
                            Swal.fire("Failed!", "Failed to cancel the application.", "error");
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting application:", error);
                        Swal.fire("Error!", "Something went wrong.", "error");
                    });
            }
        });
    };

    return (
        <>

             <Navbar></Navbar>
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">My Visa Applications</h2>
                {applications.length === 0 ? (
                    <p>No visa applications found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                className="border p-4 rounded-lg shadow-md bg-white"
                            >
                                <img
                                    src={app.countryImage}
                                    alt={app.countryName}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{app.countryName}</h3>
                                <p>
                                    <strong>Visa Type:</strong> {app.visaType}
                                </p>
                                <p>
                                    <strong>Processing Time:</strong> {app.processingTime}
                                </p>
                                <p>
                                    <strong>Fee:</strong> ${app.fee}
                                </p>
                                <p>
                                    <strong>Validity:</strong> {app.validity}
                                </p>
                                <p>
                                    <strong>Application Method:</strong> {app.applicationMethod}
                                </p>
                                <p>
                                    <strong>Applied Date:</strong> {app.appliedDate}
                                </p>
                                <p>
                                    <strong>Applicant:</strong> {app.firstName} {app.lastName}
                                </p>
                                <p>
                                    <strong>Email:</strong> {app.email}
                                </p>
                                <button
                                    onClick={() => handleCancel(app._id)}
                                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
                                >
                                    Cancel
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </>
    );
};

export default MyApplications;