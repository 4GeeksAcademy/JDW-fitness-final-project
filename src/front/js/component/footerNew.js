import React from "react";
import "/workspaces/JDW-fitness-final-project/src/front/styles/footerlanding.css"; // Archivo CSS para los estilos del footer

export const FooterDesign = () => {
  return (
    <footer className="footer footer-landing">
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
          <div>
            <p className="text-dark fw-bold">JorjeAJT</p>
          </div>
          <ul className="social-icons d-flex justify-content-center">
            <li><a href="https://github.com/JorgeAJT/"><i class="fa-brands fa-github me-3"></i></a></li>
            <li><a href="https://www.linkedin.com/in/jorgeajt/"><i className="fab fa-linkedin-in me-3"></i></a></li>
          </ul>
          <div>
            <p className="text-dark fw-bold">DaniWallaceDev</p>
          </div>
          <ul className="social-icons d-flex justify-content-center">
            <li><a href="https://github.com/DaniWallaceDev/"><i class="fa-brands fa-github me-3"></i></a></li>
            <li><a href="https://www.linkedin.com/in/daniwallacedev/"><i className="fab fa-linkedin-in me-3"></i></a></li>
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
      <p>
        Copyright © Made with ❤️ by
        <a href="https://github.com/JorgeAJT" className="text-light text-decoration-none"> JorgeAJT</a> &
        <a href="https://github.com/DaniWallaceDev" className="text-light text-decoration-none"> DaniWallaceDev</a>, 2024
        </p>
      </div>
    </footer>
  );
};