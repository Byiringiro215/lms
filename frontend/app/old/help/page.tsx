"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const faqs = [
  {
    question: "How do I add a new book or member?",
    answer: "Go to the respective page and click the 'Add' button. Fill in the required details and submit the form.",
  },
  {
    question: "How can I update or delete a record?",
    answer: "Click the edit (pencil) or delete (trash) icon next to the record you want to modify.",
  },
  {
    question: "How do I check out a book?",
    answer: "Navigate to the Checkout page, click 'Add Borrow', and fill in the details for the member and book.",
  },
  {
    question: "Who can access the settings?",
    answer: "Only users with the appropriate permissions (e.g., admin or accountant) can access and modify settings.",
  },
  {
    question: "How do I contact support?",
    answer: "Use the contact form below to send us your question or feedback.",
  },
];

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "At least 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required").min(10, "At least 10 characters"),
});

const HelpPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mb-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Help & FAQ</h1>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b pb-2">
              <button
                className="w-full text-left flex justify-between items-center text-gray-800 font-medium text-base focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                {faq.question}
                <span className="ml-2 text-lg">{openIndex === idx ? "-" : "+"}</span>
              </button>
              {openIndex === idx && (
                <p className="mt-2 text-gray-600 text-sm transition-all duration-200">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="text-xl font-bold mb-4 text-center">Contact Support</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              type="text"
              className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              className="border border-gray-300 rounded p-2 text-sm w-full focus:border-gray-500 bg-white resize-none"
              {...register("message")}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all duration-200"
              disabled={submitted}
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpPage;
