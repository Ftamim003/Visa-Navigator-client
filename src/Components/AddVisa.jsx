

import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import { AuthContext } from '../Provider/AuthProvider';
import Footer from './Footer/Footer';

const AddVisa = () => {

  const {user}=useContext(AuthContext);
  
  // Handle form submission
  const handleAddVisa = (event) => {
    event.preventDefault(); // Prevent default form submission

    const email=user.email;
    const form = event.target;
    const countryImage = form.countryImage.value;
    const countryName = form.countryName.value;
    const visaType = form.visaType.value;
    const processingTime = form.processingTime.value;
    const requiredDocuments = Array.from(form.requiredDocuments)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    const description = form.description.value;
    const ageRestriction = form.ageRestriction.value;
    const fee = form.fee.value;
    const validity = form.validity.value;
    const applicationMethod = form.applicationMethod.value;

    // Create a new visa object
    const newVisa = {
      countryImage,
      countryName,
      visaType,
      processingTime,
      requiredDocuments,
      description,
      ageRestriction,
      fee,
      validity,
      applicationMethod,
      email
    };

    // Send the data to the backend (MongoDB)
    fetch('http://localhost:5000/visa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVisa),
    })
    .then(res => res.json())
    .then(data => {
      if (data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Visa added successfully.',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
        
        form.reset(); 
      }
    })
    .catch(err => {
      console.error('Error:', err);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue adding the visa.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    });
  };

  return (
    <>
    <div><Navbar></Navbar></div>
    <div className="bg-[#F4F3F0] p-10 min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-11/12 mx-auto">
      
      <h2 className="text-3xl font-bold mb-5">Add Visa</h2>

      <form onSubmit={handleAddVisa}>
        {/* Country Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Country Image URL</label>
          <input
            type="text"
            name="countryImage"
            className="input input-bordered w-full"
            placeholder="Enter country image URL"
            required
          />
        </div>

        {/* Country Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Country Name</label>
          <input
            type="text"
            name="countryName"
            className="input input-bordered w-full"
            placeholder="Country Name"
            required
          />
        </div>

        {/* Visa Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Visa Type</label>
          <select
            name="visaType"
            className="select select-bordered w-full"
            required
          >
            <option value="Tourist visa">Tourist visa</option>
            <option value="Student visa">Student visa</option>
            <option value="Official visa">Official visa</option>
          </select>
        </div>

        {/* Processing Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Processing Time</label>
          <input
            type="text"
            name="processingTime"
            className="input input-bordered w-full"
            placeholder="Processing Time"
            required
          />
        </div>

        {/* Required Documents */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Required Documents</label>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Valid passport"
              /> Valid passport
            </label>
            <label>
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Visa application form"
              /> Visa application form
            </label>
            <label>
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Recent passport-sized photograph"
              /> Recent passport-sized photograph
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            required
          ></textarea>
        </div>

        {/* Age Restriction */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Age Restriction</label>
          <input
            type="number"
            name="ageRestriction"
            className="input input-bordered w-full"
            placeholder="Age Restriction"
            required
          />
        </div>

        {/* Fee */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Fee</label>
          <input
            type="number"
            name="fee"
            className="input input-bordered w-full"
            placeholder="Fee"
            required
          />
        </div>

        {/* Validity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Validity</label>
          <input
            type="text"
            name="validity"
            className="input input-bordered w-full"
            placeholder="Validity"
            required
          />
        </div>

        {/* Application Method */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Application Method</label>
          <input
            type="text"
            name="applicationMethod"
            className="input input-bordered w-full"
            placeholder="Application Method"
            required
          />
        </div>

        <input
          type="submit"
          value="Add Visa"
          className="btn btn-block mt-4"
        />
      </form>
    </div>

    <Footer></Footer>
    </>
  );
};

export default AddVisa;
