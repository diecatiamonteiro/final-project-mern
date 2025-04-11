import React, { useState } from "react";
import Button from "../components/Button";
const Contact = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/mvgkvyby", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      setSuccess(true);
      form.reset();
    } else {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-12 px-6 md:px-12 mb-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <p className="text-gray-600 mb-8">
          We’d love to hear from you! Fill out the form below or reach out
          directly.
        </p>

        {success ? (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded-xl p-4 mb-8">
            ✅ Thank you! Your message has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green"
              ></textarea>
            </div>

            <Button
              type="submit"
              className="w-full     bg-green hover:bg-greenHover text-offwhite 
"
            >
              Send Message
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
