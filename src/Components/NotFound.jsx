

const NotFound = () => {
    return (
        <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
        <h1 className="text-5xl font-bold text-orange-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 text-center px-6">
            The page youre looking for doesnt exist. It might have been removed or the URL might be incorrect.
        </p>
        <Link to="/" className="btn btn-primary hover:bg-blue-600 transition-colors duration-300">
            Go Back to Home
        </Link>
    </div>
    </div>
    );
};

export default NotFound;