import React, { useState } from "react";
import logo from "./assets/slack.png";
import "./Slider.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ImageSlider: React.FC = () => {
  const images = [
    logo,
    logo,
    logo,
    // Add as many image URLs as you want
  ];

  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className="slider1">
      <div className="slider">
        <button className="left-arrow" onClick={prevSlide}>
        <FaArrowLeft />
        </button>
        <button className="right-arrow" onClick={nextSlide}>
       <FaArrowRight />
        </button>
        {images.map((image, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && <img src={image} alt="image slider" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
