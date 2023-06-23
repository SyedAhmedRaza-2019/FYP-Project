import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./hero.css"
const Hero = () => {
  const images = [
    { id: 1, src: '../../../../public/images/list/p-8.jpg', alt: 'Image 1' },
    { id: 2, src: '../../../../public/images/list/p-2.jpg', alt: 'Image 2' },
    { id: 3, src: '../../../../public/images/list/p-1.jpg', alt: 'Image 3' },
    { id: 4, src: '../../../../public/images/list/p-4.jpg', alt: 'Image 4' },
    { id: 5, src: '../../../../public/images/list/p-5.jpg', alt: 'Image 5' },
    { id: 6, src: '../../../../public/images/list/p-6.jpg', alt: 'Image 6' },
    
    { id: 8, src: '../../../../public/images/list/p-3.jpg', alt: 'Image 8' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2500,
  };

  return (
    <div className='max-w-full sl  overflow-hidden'>
   
    <div className='l'>
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.src} className='w-full' alt={image.alt} />
        </div>
      ))}
    </Slider></div>
</div>
  );
};

export default Hero;
