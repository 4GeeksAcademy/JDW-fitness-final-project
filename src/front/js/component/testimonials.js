import React, { useState, useEffect } from "react";
import feedback1 from "../../img/feedback1.jpg";
import feedback2 from "../../img/feedback2.jpg";
import feedback3 from "../../img/feedback3.jpg";

const feedbackData = [
  {
    img: feedback1,
    title: "Laura Brown",
    text: "After trying several options to continue progressing and improving physically, I must say I've finally found the solution, and it's called JDW Fitness.",
    stars: 5,
  },
  {
    img: feedback2,
    title: "Jane Doe",
    text: "As a client of various coaches I've found through JDW Fitness, I can say I'm very satisfied with my progress. Highly recommended!",
    stars: 5,
  },
  {
    img: feedback3,
    title: "John Smith",
    text: "The JDW Fitness team provided me with a great opportunity as a personal trainer. I highly recommend them.",
    stars: 5,
  },
];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length);
  };

  const getVisibleFeedback = () => {
    const visibleFeedback = [];
    for (let i = 0; i < 3; i++) {
      visibleFeedback.push(feedbackData[(index + i) % feedbackData.length]);
    }
    return visibleFeedback;
  };

  const visibleFeedback = getVisibleFeedback();

  return (
    <section id="testimonials" className="bg-transparent">
      <div className="container-fluid">
        <h2 className="text-center mb-5 text-dark fw-bold">Testimonials</h2>
        <div id="carouselExampleIndicators" className="carousel slide bg-transparent" data-bs-ride="carousel">
          <div className="carousel-inner bg-transparent">
            <div className="carousel-item active bg-transparent">
              <div className="row bg-transparent">
                {visibleFeedback.map((feedback, i) => (
                  <div className="col-md-4 mb-4 bg-transparent" key={i}>
                    <div className="card border-primary text-center h-100 bg-transparent">
                      <div style={{overflow: "hidden" }}>
                        <img
                          src={feedback.img}
                          className="card-img-top h-100"
                          alt={`Testimonial ${i}`}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{feedback.title}</h5>
                        <p className="card-text">{feedback.text}</p>
                        <div className="">
                          {[...Array(feedback.stars)].map((star, j) => (
                            <span key={j} style={{ fontSize: "24px", color: "#A02CFA" }}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" onClick={prevSlide}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" onClick={nextSlide}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>
  );
};
