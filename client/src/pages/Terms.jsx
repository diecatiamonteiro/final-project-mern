import React from "react";

const Terms = () => {
  return (
    <section className="px-6 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">Terms and Conditions</h2>
        <p>
          By using this website, you agree to our terms and conditions. We
          reserve the right to modify or update these terms at any time.
        </p>
        <p>
          Use of this site is at your own risk, and we are not liable for any
          damages arising from its use. Please review our{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          for details on how we handle your data.
        </p>
      </div>
    </section>
  );
};

export default Terms;
