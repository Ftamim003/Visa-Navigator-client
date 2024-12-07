import { Link, useLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";
import { useState } from "react";


const AllVisas = () => {
    const allVisaData = useLoaderData();
    const [filteredVisas, setFilteredVisas] = useState(allVisaData);
    const [selectedVisaType, setSelectedVisaType] = useState("All");


 
    const handleFilterChange = (event) => {
        const visaType = event.target.value;
        setSelectedVisaType(visaType);

        if (visaType === "All") {
            setFilteredVisas(allVisaData); 
        } else {
            const filtered = allVisaData.filter((visa) => visa.visaType === visaType);
            setFilteredVisas(filtered);
        }
    };


    const visaTypes = ["All", ...new Set(allVisaData.map((visa) => visa.visaType))];

    return (
       <>
       <Navbar></Navbar>
       <div className="min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-11/12 mx-auto">
            <div className="p-8 bg-gray-100">
                <h2 className="text-3xl font-bold text-center mb-6">All Visas</h2>
                <div className="mb-6 flex justify-center">
                        <select
                            className="select select-bordered w-full max-w-xs"
                            value={selectedVisaType}
                            onChange={handleFilterChange}
                        >
                            {visaTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredVisas.map((visa) => (
                        <div
                            key={visa._id}
                            className="border p-4 rounded-lg bg-white shadow-md hover:shadow-lg"
                        >
                            <img
                                src={visa.countryImage}
                                alt={visa.countryName}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{visa.countryName}</h3>
                            <p className="text-gray-600">Visa Type: {visa.visaType}</p>
                            <p className="text-gray-600">Processing Time: {visa.processingTime}</p>
                            <p className="text-gray-600">Fee: ${visa.fee}</p>
                            <p className="text-gray-600">Validity: {visa.validity}</p>
                            <p className="text-gray-600">Application Method: {visa.applicationMethod}</p>
                            <Link to={`/visaDetails/${visa._id}`}>
                            <button
                                
                                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                See Details
                            </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>



        </div>
       
       </>
    );
};

export default AllVisas;