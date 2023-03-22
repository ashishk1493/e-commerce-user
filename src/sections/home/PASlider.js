import React, { Component } from "react";
import Slider from "react-slick";
// import { baseUrl } from "./config";

export default function PASlider() {
    const settings = {
        // dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false

    };
    return (
        <div>
            {/* <h2>Fade</h2> */}
            <Slider {...settings}>
                <div>
                    <img src={"/home/b1.jpg"} />
                </div>
                <div>
                    <img src={"/home/b2.jpg"} />
                </div>
                <div>
                    <img src={"/home/b3.jpg"} />
                </div>
                <div>
                    <img src={"/home/b4.jpg"} />
                </div>
            </Slider>
        </div>
    )
}