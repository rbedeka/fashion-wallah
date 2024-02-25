import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';

import slick from 'slick-carousel/slick/slick.css';
import slick_theme from 'slick-carousel/slick/slick-theme.css';
import Carousel from './Carousel.css';

export default function FadeCarousel({children}: {children: React.ReactNode}) {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index

  // Define settings for the carousel
  const settings = {
    arrows: false,
    fade: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    afterChange: (currentIndex: number) => setCurrentSlide(currentIndex), // Update state on slide change
  };

  useEffect(() => {
    const intervalId = setInterval(() => {}, 3000); // Adjust interval as needed

    return () => clearInterval(intervalId); // Clear timer/animation on component unmount
  }, []);

  return (
    <div className="carousel-container" style={{zIndex: 2}}>
      <Slider className="m-0" {...settings}>
        {children}
      </Slider>
    </div>
  );
}

export function links() {
  return [
    {rel: 'stylesheet', src: slick},
    {rel: 'stylesheet', src: slick_theme},
    {rel: 'stylesheet', src: Carousel},
  ];
}
