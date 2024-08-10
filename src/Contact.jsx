import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Have questions? We'd love to hear from you!</p>
      <div className="contact-info">
        <div className="contact-item">
          <h2>Email</h2>
          <p>info@zaika.com</p>
        </div>
        <div className="contact-item">
          <h2>Phone</h2>
          <p>+1 234 567 890</p>
        </div>
        <div className="contact-item">
          <h2>Address</h2>
          <p>123 Food Street, Culinary City, 56789</p>
        </div>
      </div>
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" className="con-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
