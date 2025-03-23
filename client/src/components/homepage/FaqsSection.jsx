import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import homepageFAQs from "../../assets/homepage/homepage-faqs.jpg";

export default function FaqsSection() {
  const [openIndex, setOpenIndex] = useState(null); // null = closed, index = open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // If the currently open question (openIndex) is the same as the question I just clicked (index), then close it (set to null), otherwise open it (set to index).
  // E.g. 2 === 2 is true, so it becomes null (closes)
  // E.g. 2 === 4 is false, so it becomes 4 (opens Question 4)

  const faqs = [
    {
      question: "What is The Greenroom?",
      answer:
        "The Greenroom is a platform connecting artists and small venues in Germany for performances, jam sessions, and gigs. We provide a space where musicians, comedians, poets, and other performers can showcase their work and find performance opportunities, while venues can discover new talent and manage their bookings efficiently.",
    },
    {
      question: "How do I get started as an artist?",
      answer:
        "Register as an artist, verify your email, and create your profile by uploading media, photos, and setting your availability. You can then browse venues, request bookings on available dates, and manage your gigs through your personal dashboard.",
    },
    {
      question: "How do I get started as a venue?",
      answer:
        "Register as a venue owner, verify your email, and create your venue profile by uploading photos, setting your availability, and defining your revenue split. You can then browse artists, request bookings, and manage your calendar through your dashboard.",
    },
    {
      question: "How does the booking process work?",
      answer:
        "Either an artist or venue can initiate a booking by selecting an available date on the other party's calendar. The booking remains pending until accepted. Once accepted, it moves to 'My Gigs' in both users' dashboards, and contact information becomes available.",
    },
    {
      question: "What happens if a booking is declined or cancelled?",
      answer:
        "If a booking is declined or cancelled, both parties receive an email notification. The booking disappears from dashboards and cancelled dates become available again in the calendar.",
    },
    {
      question: "Is there a fee to use The Greenroom?",
      answer:
        "The Greenroom is currently free to use for both artists and venues. We focus on creating valuable connections between performers and performance spaces throughout Germany.",
    },
    {
      question: "Can I browse without creating an account?",
      answer:
        "Yes! Guest users can browse artists and venues, view profiles, and see available dates. However, to make or receive bookings, you'll need to create an account.",
    },
    {
      question: "How do revenue splits work?",
      answer:
        "Venues define their revenue split policy on their profile (e.g., 80/20, meaning 80% of the revenue goes to the artist and 20% to the venue). Artists can see this information before requesting a booking to ensure the arrangement works for them.",
    },
  ];

  return (
    <section className="py-24 my-24 px-6 relative full-width-section">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${homepageFAQs})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: "0.8",
          zIndex: "-1",
          filter: "grayscale(100%)",
        }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-offwhite">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-offwhite"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-base md:text-lg">{faq.question}</span>
                <span className="text-green">
                  {openIndex === index ? (
                    <FiChevronUp size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </span>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-500 ease-cubic-bezier ${
                  openIndex === index
                    ? "max-h-[1000px] opacity-100 pb-6 scale-100"
                    : "max-h-0 opacity-0 pb-0 scale-95"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <p className="text-base lg:text-lg">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
