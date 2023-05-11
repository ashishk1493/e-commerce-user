import { Box } from '@mui/system';
import React, { Component, useRef } from 'react';
import Slider from 'react-slick';
import { SkeletonProductItem } from 'src/components/skeleton';
import { ShopProductCard } from '../@dashboard/e-commerce/shop';
// import { baseUrl } from "./config";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import { CarouselArrows } from 'src/components/carousel';

export default function PAProductHomeSlider({ products }) {
  const carouselRef = useRef(null);
  // const settings = {
  //   dots: true,
  //   infinite: products.length > 4,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 3,
  //   responsive: [
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 760,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 960,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         initialSlide: 3,
  //       },
  //     },
  //   ],
  // };

  const settings = {
    arrows: false,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0px',
    rtl: true,
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };
  return (
    // <Slider {...settings}>
    //   {products?.map((product, index) =>
    //     product ? <ShopProductCard key={product.id} product={product} /> : <SkeletonProductItem key={index} />
    //   )}
    // </Slider>
    <Box sx={{ position: 'relative' }}>
      <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
        <Slider ref={carouselRef} {...settings}>
          {products?.map((product, index) =>
            product ? <ShopProductCard key={product.id} product={product} /> : <SkeletonProductItem key={index} />
          )}
        </Slider>
      </CarouselArrows>
    </Box>
  );
}

PAProductHomeSlider.propTypes = {
  products: PropTypes.array,
};
