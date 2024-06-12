import React from "react";
import "../../styles/testimonials.css";

import feedback1 from "/workspaces/JDW-fitness-final-project/src/front/img/feedback1.jpg";
import feedback2 from "/workspaces/JDW-fitness-final-project/src/front/img/feedback2.jpg";
import feedback3 from "/workspaces/JDW-fitness-final-project/src/front/img/feedback3.jpg";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-5 bg-trasparent">
      <div className="container">
        <h2 className="text-center mb-5 text-dark fw-bold">Testimonials</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card border-primary text-center">
              <img src={feedback1} className="card-img-top" alt="Testimonial 1" />
              <div className="card-body">
                <h5 className="card-title">Laura Brown</h5>
                <p className="card-text">After trying several options to continue progressing and improving physically, I must say I've finally found the solution, and it's called JDW Fitness.</p>
                <div className="text-center">
                  {[...Array(5)].map((star, i) => (
                    <span key={i} style={{ fontSize: "24px", color: "#A02CFA" }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-primary text-center">
              <img src={feedback2} className="card-img-top" alt="Testimonial 2" />
              <div className="card-body">
                <h5 className="card-title">Jane Doe</h5>
                <p className="card-text">As a client of various coaches I've found through JDW Fitness, I can say I'm very satisfied with my progress. Highly recommended!</p>
                <div className="text-center">
                  {[...Array(5)].map((star, i) => (
                    <span key={i} style={{ fontSize: "24px", color: "#A02CFA" }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-primary text-center">
              <img src={feedback3} className="card-img-top" alt="Testimonial 3" />
              <div className="card-body">
                <h5 className="card-title">John Smith</h5>
                <p className="card-text">The JDW Fitness team provided me with a great opportunity as a personal trainer. I highly recommend them.</p>
                <div className="text-center">
                  {[...Array(5)].map((star, i) => (
                    <span key={i} style={{ fontSize: "24px", color: "#A02CFA" }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};