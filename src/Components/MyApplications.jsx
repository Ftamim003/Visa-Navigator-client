import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState("");

    // Fetch all applications for the current user
    useEffect(() => {
        if (user?.email) {
            fetch(`https://visa-navigator-server.vercel.app/apply?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setApplications(data);
                    setIsLoading(false);
                })
                .catch((error) => console.error("Error fetching applications:", error));
        }
    }, [user]);

    // Fetch filtered applications for the current user based on the search query
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://visa-navigator-server.vercel.app/country?email=${user.email}&search=${search}`);
                const data = await response.json();
                setApplications(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching applications:", error);
                setApplications([]);
            }
        };

        fetchData();
    }, [search, user.email]);

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
                fetch(`https://visa-navigator-server.vercel.app/apply/${id}`, {
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
            <Navbar />
            <div className="bg-gradient-to-r from-blue-100 to-orange-100 pt-24">
                <div className="min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-11/12 mx-auto">
                    <h2 className="text-3xl font-bold mt-1 mb-6">My Visa Applications</h2>

                    {/* Search Input Field */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by country name"
                            className="border p-2 rounded-lg w-full md:w-1/2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {Array.isArray(applications) && applications.length === 0 ? (
                        <p>No visa applications found.</p>
                    ) : (
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
                                        <th>Applied Date</th>
                                        <th>Applicant</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {applications.map((app, index) => (
                                        <tr key={app._id} className="hover">
                                            <td>{index + 1}</td>
                                            <td className="flex flex-col items-center gap-2">
                                                <img
                                                    src={app.countryImage}
                                                    alt={app.countryName}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                {app.countryName}
                                            </td>
                                            <td>{app.visaType}</td>
                                            <td>{app.processingTime}</td>
                                            <td>${app.fee}</td>
                                            <td>{app.validity}</td>
                                            <td>{app.applicationMethod}</td>
                                            <td>{app.appliedDate}</td>
                                            <td>
                                                {app.firstName} {app.lastName}
                                            </td>
                                            <td>{app.email}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleCancel(app._id)}
                                                    className="btn btn-sm btn-error text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyApplications;
