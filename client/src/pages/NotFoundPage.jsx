/*import React from 'react'

export default function NotFoundPage() {
  return (
    <div>NotFoundPage</div>
  )
}
*/

import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";  // Import the Button component

const NotFoundPage = () => {
  return (
    //use a background picture



    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-black-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>

      {/* Use the Button component here */}
      <Button
        to="/"
        variant="green"  // You can customize the variant here
        size="medium"
        className="mt-6"  // You can also pass additional className for spacing or styling
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
