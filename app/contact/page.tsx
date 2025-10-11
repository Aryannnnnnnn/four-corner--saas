"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [agreeToContact, setAgreeToContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToContact) {
      toast.error("Please agree to be contacted before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Add your form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setAgreeToContact(false);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Get In Touch */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6">
                Get In Touch
              </h1>
              <p className="text-base sm:text-lg text-white leading-relaxed">
                Have questions or want to learn more about Four Corner Properties?
                Our team is here to assist you. Whether you're buying, selling, or
                simply exploring, contact us today for expert guidance and
                personalized service.
              </p>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-8">
                Let's get in touch
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-transparent text-gray-900 placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Checkbox Agreement */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreeToContact"
                    checked={agreeToContact}
                    onChange={(e) => setAgreeToContact(e.target.checked)}
                    className="mt-1 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                  />
                  <label
                    htmlFor="agreeToContact"
                    className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                  >
                    Yes, I would like more information from Four Corner Properties.
                    Please use and/or share my information with a{" "}
                    <span className="italic">Four Corner Properties</span> agent to
                    contact me about my real estate needs.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !agreeToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium text-sm tracking-wide uppercase hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
