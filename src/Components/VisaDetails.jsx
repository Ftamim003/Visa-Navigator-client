import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";

const VisaDetails = () => {
    const singleVisaCard = useLoaderData();
    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        email: user?.email,
        firstName: "",
        lastName: "",
        appliedDate: new Date().toISOString().slice(0, 10), // Current date
        fee: singleVisaCard.fee,
        countryName: singleVisaCard.countryName,
        countryImage: singleVisaCard.countryImage,
        visaType: singleVisaCard.visaType,
        processingTime: singleVisaCard.processingTime,
        validity: singleVisaCard.validity,
        applicationMethod: singleVisaCard.applicationMethod
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://visa-navigator-server.vercel.app/apply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted",
                        text: "Your visa application was submitted successfully!",
                        confirmButtonColor: "#3085d6",
                    });
                    setShowModal(false);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Submission Failed",
                        text: "Something went wrong. Please try again later.",
                        confirmButtonColor: "#d33",
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An unexpected error occurred.",
                    confirmButtonColor: "#d33",
                });
                console.error("Error:", error);
            });
    };




    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-full mx-auto bg-gradient-to-r from-blue-100 to-orange-100 p-8 shadow-lg">
                {/* Title */}
                <h2 className="text-4xl font-bold text-blue-700 mb-6 text-center">
                    {singleVisaCard.countryName} - Visa Details
                </h2>

                {/* Country Image */}
                <div className="w-11/12 mx-auto p-6 bg-gradient-to-r from-blue-100 to-orange-100 rounded-lg shadow-lg">
                    {/* Image Section */}
                    <div className="flex flex-col items-center">
                        <img
                            src={singleVisaCard.countryImage}
                            alt={singleVisaCard.countryName}
                            className="w-full md:w-3/5 h-64 object-cover rounded-lg shadow-md mb-6"
                        />
                    </div>

                    {/* Visa Details Section */}
                    <div className="mx-auto w-full md:w-3/5">
                        <div className="grid md:grid-cols-2 gap-y-4 text-lg">
                            <p>
                                <strong className="text-blue-800">Visa Type:</strong> {singleVisaCard.visaType}
                            </p>
                            <p>
                                <strong className="text-blue-800">Processing Time:</strong> {singleVisaCard.processingTime}
                            </p>
                            <p>
                                <strong className="text-blue-800">Fee:</strong> ${singleVisaCard.fee}
                            </p>
                            <p>
                                <strong className="text-blue-800">Validity:</strong> {singleVisaCard.validity}
                            </p>
                            <p>
                                <strong className="text-blue-800">Application Method:</strong> {singleVisaCard.applicationMethod}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 mx-auto w-full md:w-3/5">
                    <h3 className="text-2xl font-semibold text-blue-900 ">Description:</h3>
                    <p className="text-gray-700 py-1">
                        {singleVisaCard.description}
                    </p>
                </div>

                </div>

                

                {/* Apply Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
                    >
                        Apply for the Visa
                    </button>
                </div>
                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-xl font-bold mb-4">Apply for Visa</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        readOnly
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Applied Date</label>
                                    <input
                                        type="text"
                                        name="appliedDate"
                                        value={formData.appliedDate}
                                        readOnly
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Fee</label>
                                    <input
                                        type="text"
                                        name="fee"
                                        value={formData.fee}
                                        readOnly
                                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
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
                                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg "
                                    >
                                        Apply
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


export default VisaDetails;