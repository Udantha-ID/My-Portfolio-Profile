import React, { useState } from "react";
import { BallCanvas } from "./canvas";
import { technologies } from "../constants";
// import "./style.css"; // Assuming you have an external style.css file for styling

const Tech = () => {
  const [isHovered, setIsHovered] = useState(false); // State to control hover

  const handleMouseEnter = () => {
    setIsHovered(true); // Pause the slider when hovering
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Resume the slider when mouse leaves
  };

  return (
    <div
      className="slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`

/* Slider container styling */
.slider {
  width: calc(100% - 260px); /* 100% width minus the combined margins (130px on each side) */
  height: 360px; /* Set fixed height */
  overflow: hidden;
  display: flex;
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
  position: relative;
  margin-left: 130px;
  top: 90px; /* Adjust the vertical position */
}



/* Wrapper for the list of items */
.slider .list {
  display: flex;
  animation: autoMove 20s linear infinite; /* Continuous scrolling */
  transition: transform 0.3s ease-in-out; /* Smooth transition on pause/resume */
}

/* Individual item styling */
.slider .list .item {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  animation: fadeIn 20s linear infinite; /* Fade-in effect for each item */
}

/* Animation for continuous movement */
@keyframes autoMove {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-200px * 8)); /* Adjust based on item width and item count */
  }
}

/* Fade-in effect for each item */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  5%,
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Pause the animation when hovered */
.slider .list.paused {
  animation-play-state: paused; /* Pause the slider animation */
}

/* No color change effect on hover */
.slider .item:hover {
  filter: none; /* Disable any grayscale effect */
}

      `}</style>
      <div className={`list ${isHovered ? "paused" : ""}`}>
        {technologies.map((technology, index) => (
          <div
            className="item"
            key={technology.name}
            style={{
              animationDelay: `${(index * 2) / 10}s`, // Adjust delay for sequential animation
            }}
          >
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tech;
