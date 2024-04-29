import React from "react";

import "./reviews.scss";

export default function Reviews(props) {
  const { reviews } = props;

  return (
    <div className="carusel-sidebar">
      <div
        id="carouselSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div key="active" className="carousel-item active">
            <p className="about">
              Kimozdulnátok a hétvégén?! Próbáld ki te is valamelyik gyerekbarát
              helyet!
            </p>
          </div>
          {reviews.map((review) => (
            <div key={review._id} className="carousel-item">
              <p>"{review.review}"</p>
              <p>
                <strong>{review.username}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
