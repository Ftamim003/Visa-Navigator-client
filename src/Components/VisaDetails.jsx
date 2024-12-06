import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const VisaDetails = () => {
    const singleVisaCard=useLoaderData();
    const {user}=useContext(AuthContext)

    const [showModal,setShowModal]=useState(false);

    const [formData,setFormData]=useState({
    email: user?.email, 
    firstName: "",
    lastName: "",
    appliedDate: new Date().toISOString().slice(0, 10), // Current date
    fee: singleVisaCard.fee,
    })


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Application submitted successfully!");
          setShowModal(false);
        } else {
          alert("Failed to submit the application.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };




    return (
        <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">{singleVisaCard.countryName} - Visa Details</h2>
        <img
          src={singleVisaCard.countryImage}
          alt={singleVisaCard.countryName}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p><strong>Visa Type:</strong> {singleVisaCard.visaType}</p>
        <p><strong>Processing Time:</strong> {singleVisaCard.processingTime}</p>
        <p><strong>Fee:</strong> ${singleVisaCard.fee}</p>
        <p><strong>Validity:</strong> {singleVisaCard.validity}</p>
        <p><strong>Application Method:</strong> {singleVisaCard.applicationMethod}</p>
        <p><strong>Description:</strong> {singleVisaCard.description}</p>
  
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Apply for the Visa
        </button>
  
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
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
    

export default VisaDetails;