import { Box } from "@mui/system";
import React, { Component } from "react";
import Slider from "react-slick";
import { SkeletonProductItem } from "src/components/skeleton";
import { ShopProductCard } from "../@dashboard/e-commerce/shop";
// import { baseUrl } from "./config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function PAProductHomeSlider(props) {
    const { products } = props
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    return (
        <Slider {...settings}>
            {products.map((product, index) =>
                product ?
                    <ShopProductCard key={product.id} product={product} />
                    : <SkeletonProductItem key={index} />
            )}
        </Slider>
    )
}