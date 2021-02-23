import React from "react";
import {Carousel} from "react-bootstrap";
import {toAbsoluteUrl} from "./../helpers";

export function CFCarousel() {
    return (
        <div className="could-fix-carousel">
            <h2>Trusted and Tested Recommendations</h2>
            <p>Potentially save 1000’s of $ in one click</p>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={toAbsoluteUrl("/media/recommendations-1.png")}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={toAbsoluteUrl("/media/recommendations-1.png")}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={toAbsoluteUrl("/media/recommendations-1.png")}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <p className="compact-footer">&#169; 2021 cloudfix</p>
        </div>
    );
}
