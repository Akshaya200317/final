import React from "react";
import '../Styles/Contact.css';
import Navbar from "../Components/Navbar";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    formData.append("access_key", "def92fa4-d28b-484c-8c16-682c9a45ad4c"); // Add your actual Web3Forms access key

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData // Send formData directly
      });

      const result = await res.json();

      if (result.success) {
        alert("Message sent successfully!");
      } else {
        alert("Message failed to send. Please try again.");
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while sending your message. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h2 className="contact-heading">Contact Us:</h2>
        <p className="contact-instructions">Kindly contact us using the form below:</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="contact-label">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="contact-input"
            />
          </div>
          <div>
            <label htmlFor="email" className="contact-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="contact-input"
            />
          </div>
          <div>
            <label htmlFor="message" className="contact-label">Message</label>
            <textarea
              name="message"
              id="message"
              required
              className="contact-textarea"
            ></textarea>
          </div>
          <button
            type="submit"
            className="contact-button"
          >
            Submit Form
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
