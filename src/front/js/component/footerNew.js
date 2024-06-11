import React from "react";
import "/workspaces/JDW-fitness-final-project/src/front/styles/footerlanding.css"; // Archivo CSS para los estilos del footer

export const FooterDesign = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section quick-links">
          <h2 className="footer-heading fw-semibold">Quick Links</h2>
          <ul>
            <li><a href="#services">What We Offer</a></li>
            <li><a href="#why-choose-us">Why Choose Us</a></li>
            <li><a href="#offers">Our Special Functionalities</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h2 className="footer-heading fw-semibold">Contact Us</h2>
          <div className="contact-email">
            <label>Email:</label>
            <span style={{ marginLeft: '10px' }}>jdwCompany@gmail.com</span>
          </div>
          <div className="contact-phone">
            <label>Phone:</label>
            <span style={{ marginLeft: '10px' }}>+123 456 7890</span>
          </div>
          <div className="contact-address">
            <label>Address:</label>
            <span style={{ marginLeft: '10px' }}>2875 Beechwood Drive</span>
          </div>
        </div>
        <div className="footer-section social-media">
          <h2 className="footer-heading fw-semibold">Follow Us</h2>
          <ul className="social-icons d-flex justify-content-center">
            <li><a href="#"><i className="fab fa-facebook-f me-3"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter me-3"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram me-3"></i></a></li>
            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
        <div className="footer-section newsletter">
          <h2 className="footer-heading">Newsletter</h2>
          <p>Subscribe to our newsletter to get the latest updates.</p>
          <form className="d-flex align-items-center">
            <input className="email" type="email" placeholder="Enter your email" />
            <button className="btn light btn-secondary ms-1" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} JDW Fitness. All rights reserved.
        <br />
        Made with <span style={{ color: 'red' }}>❤️</span> by JorgeAJT, DaniWallaceDev, Walter10x, 2024
      </div>
    </footer>
  );
};