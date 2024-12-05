import { useLoaderData } from "react-router-dom";

const Home = () => {
    const visaData=useLoaderData()
    return (
        <div>
           
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



            <div className="p-8 bg-gray-100">
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
            {/* <button
              onClick={() => handleSeeDetails(visa._id)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              See Details
            </button> */}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        {/* <button
          onClick={handleSeeAllVisas}
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
        >
          See All Visas
        </button> */}
      </div>
    </div>



          </div>
    );
};

export default Home;