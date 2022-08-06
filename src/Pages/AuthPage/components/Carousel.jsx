import React, { useEffect } from "react";
import assets from "Assets";

function Carousel() {
  let slideIndex = 1;
  useEffect(() => {
    showSlide(slideIndex);
  }, []);

  // change slide with the dots
  function currentSlide(n) {
    showSlide((slideIndex = n));
  }

  function showSlide(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    // hide all slides
    for (i = 0; i < slides.length; i++) {
      slides[i].classList.add("hidden");
    }

    // remove active status from all dots
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("bg-blue-600");
      dots[i].classList.add("bg-white");
    }

    // show the active slide
    slides[slideIndex - 1].classList.remove("hidden");

    // highlight the active dot
    dots[slideIndex - 1].classList.remove("bg-white");
    dots[slideIndex - 1].classList.add("bg-blue-600");
  }

  return (
    <div>
      <div className="relative w-[600px] mx-auto">
        <div className="slide flex flex-col items-center">
          <assets.loginScreenAnalysis />
          <div className="mt-2 font-bold text-3xl">
            Data driven dashboard solution
          </div>
        </div>
        <div className="slide flex flex-col items-center">
          <assets.loginScreenAccessible />
          <div className="mt-2 font-bold text-3xl">
            Accessible from everywhere
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-5 mt-2">
        <div
          className="dot w-4 h-4 rounded-full bg-blue-600  cursor-pointer"
          onClick={() => currentSlide(1)}
        ></div>
        <div
          className="dot w-4 h-4 rounded-full bg-white cursor-pointer"
          onClick={() => currentSlide(2)}
        ></div>
      </div>
    </div>
  );
}

export default Carousel;
