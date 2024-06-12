import React from "react";
import "../../styles/testimonials.css";

import feedback1 from "/workspaces/JDW-fitness-final-project/src/front/img/feedback1.jpg";
import feedback2 from "/workspaces/JDW-fitness-final-project/src/front/img/feedback2.jpg";
import feedback3 from "/workspaces/JDW-fitness-final-project/src/front/img/feedback3.jpg";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-5 bg-trasparent">
      <div className="container">
        <h2 className="text-center mb-5 text-primary fw-bold">Testimonials</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card border-primary text-center">
              <img src={feedback1} className="card-img-top" alt="Testimonial 1" />
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor justo id diam tempor, vel aliquet."</p>
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
                <p className="card-text">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."</p>
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
                <h5 className="card-title">Alice Smith</h5>
                <p className="card-text">"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam."</p>
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