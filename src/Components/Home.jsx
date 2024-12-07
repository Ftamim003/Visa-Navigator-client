import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter';


const Home = () => {
    const visaData = useLoaderData();
    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <>
            <Navbar></Navbar>
            <div  className="relative  overflow-hidden min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-11/12 mx-auto ">

            
                <div>


                    {/* Dark/Light Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="fixed top-4 right-20 p-3 rounded-full bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                    >
                        {isDarkMode ? '🌙' : '🌞'}
                    </button>
                    <section className="text-center mt-10">
                        <h2 className="text-3xl font-bold mb-4">
                            <Typewriter
                                words={['Welcome to Visa Navigator!', 'Apply for your visa easily.', 'Track your visa status in one click.']}
                                loop={true}
                                cursor
                                cursorStyle='_'
                                typeSpeed={100}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </h2>




                        {/* Lottie Animation Section */}
                        
                    </section>
                    <section className="slider">
                        <div className="carousel w-full">
                            <div id="slide1" className="carousel-item relative w-full">
                                <img
                                    src="https://i.ibb.co.com/vh8CGtQ/abcb1d54-240e-4c5b-bbb1-0e62c7ef678e.jpg"
                                    className="w-full md:h-[400px] mx-auto rounded-md" />
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a href="#slide4" className="btn btn-circle">❮</a>
                                    <a href="#slide2" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            <div id="slide2" className="carousel-item relative w-full">
                                <img
                                    src="https://i.ibb.co.com/GHHndtX/1580739565729.jpg"
                                    className="w-full md:h-[400px] mx-auto rounded-md" />
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a href="#slide1" className="btn btn-circle">❮</a>
                                    <a href="#slide3" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            <div id="slide3" className="carousel-item relative w-full">
                                <img
                                    src="https://i.ibb.co.com/QJjZwBj/d6ccd21b-0fbe-49fd-b967-bcefbca40717.jpg"
                                    className="w-full md:h-[400px] mx-auto rounded-md" />
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a href="#slide2" className="btn btn-circle">❮</a>
                                    <a href="#slide4" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                            <div id="slide4" className="carousel-item relative w-full">
                                <img
                                    src="https://i.ibb.co.com/R2fQ8W2/occasionaly-japanese.jpg"
                                    className="w-full md:h-[400px] mx-auto rounded-md" />
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a href="#slide3" className="btn btn-circle">❮</a>
                                    <a href="#slide1" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                        </div>
                    </section>



                    <div className="p-8 bg-gray-100 my-5 rounded-lg">
                        <h2 className="text-3xl font-bold text-center mb-6">Latest Visas</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visaData.map((visa) => (
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
                        <div className="text-center mt-8">
                            <button
                                onClick={() => navigate("/allVisa")}
                                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                            >
                                See All Visas
                            </button>
                        </div>
                    </div>



                </div>






                {/* section1 */}

                <div className="p-8 bg-blue-100 w-11/12 mx-auto my-5 rounded-lg">
                    <h2 className="text-3xl font-bold text-center mb-6">Top Visa Destinations</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                            <img
                                src="https://i.ibb.co.com/w0Vd4cj/images-1.jpg"
                                alt="USA"
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                                <h3 className="text-2xl font-semibold">United States</h3>
                                <p className="mt-2">Popular for Study & Work Visas</p>
                            </div>
                        </div>
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                            <img
                                src="https://i.ibb.co.com/3NmntNg/download-1.jpg"
                                alt="Canada"
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                                <h3 className="text-2xl font-semibold">Canada</h3>
                                <p className="mt-2">Known for Immigration Opportunities</p>
                            </div>
                        </div>
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                            <img
                                src="https://i.ibb.co.com/HV02QYz/360-F-254425270-4947-IJ0-J2a-YNb-X1-ORvc-Ku-Xtr-Hl0-KLWa-F.jpg"
                                alt="Australia"
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                                <h3 className="text-2xl font-semibold">Australia</h3>
                                <p className="mt-2">Popular for Work & Tourist Visas</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* section2 */}

                <div className="p-8 bg-gray-100 w-11/12 mx-auto my-5 rounded-lg">
                    <h2 className="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <p className="italic text-gray-600">
                                "This platform made my visa application process so easy! Highly recommended."
                            </p>
                            <div className="mt-4 flex items-center">
                                <img
                                    src="https://i.ibb.co.com/Jp8qyKY/istockphoto-1437816897-612x612.jpg"
                                    alt="User 1"
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div>
                                    <h4 className="font-semibold">Maria Doe</h4>
                                    <p className="text-sm text-gray-500">Student Visa Applicant</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <p className="italic text-gray-600">
                                "Great experience! I could track every step of my application."
                            </p>
                            <div className="mt-4 flex items-center">
                                <img
                                    src="https://i.ibb.co.com/Mh56dkB/smile-profile-face-male-preview.jpg"
                                    alt="User 2"
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div>
                                    <h4 className="font-semibold">Jane Smith</h4>
                                    <p className="text-sm text-gray-500">Tourist Visa Applicant</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <p className="italic text-gray-600">
                                "Fast, reliable, and user-friendly. Got my visa without any hassle!"
                            </p>
                            <div className="mt-4 flex items-center">
                                <img
                                    src="https://i.ibb.co.com/GsGX9s3/istockphoto-536843252-612x612.jpg"
                                    alt="User 3"
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div>
                                    <h4 className="font-semibold">Alex Johnson</h4>
                                    <p className="text-sm text-gray-500">Work Visa Applicant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Home;