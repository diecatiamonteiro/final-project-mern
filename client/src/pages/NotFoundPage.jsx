import React from "react";
import Button from "../components/Button";  // Import the Button component

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center bg-no-repeat" style={{ backgroundColor: "#f5f5f3", backgroundImage: "url('/404error.jpg')" }}>
      <div className="bg-white bg-opacity-75 p-6 rounded-lg max-w-md mx-auto" style={{ backgroundColor: "#f5f5f3" }}>
        <h1 className="text-6xl font-bold text-black">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-black">Oops! Page Not Found</h2>
        <p className="text-gray-900 mt-2">The page you’re looking for doesn’t exist.</p>

        {/* Add margin-top to the container holding the button */}
        <div className="mt-12">
          <Button
            to="/"
            variant="green"  // You can customize the variant here
            size="medium"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;