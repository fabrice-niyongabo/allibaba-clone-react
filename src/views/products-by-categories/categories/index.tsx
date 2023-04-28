//@ts-nocheck
import React from "react";
import Slider from "react-slick";

function CustomPrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: "orange",
        margin: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Prev
    </div>
  );
}

function CustomNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: "orange",
        margin: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Next
    </div>
  );
}

function Categories() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    infinite: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="product-categories-main-container">
      <Slider {...settings}>
        <div className="category-item" style={{ width: 100 }}>
          <div>All</div>
        </div>
        <div className="category-item">
          <div>Vehicle parts & Accessories</div>
        </div>
        <div className="category-item">
          <div>Tools & Hardware</div>
        </div>
        <div className="category-item">
          <div>Time Pieces, Jewley</div>
        </div>
        <div className="category-item">
          <div>Tools & Hardware</div>
        </div>
        <div className="category-item">
          <div>Tools & Hardware</div>
        </div>
        <div className="category-item">
          <div>Time Pieces, Jewley</div>
        </div>
        <div className="category-item">
          <div>All</div>
        </div>
        <div className="category-item">
          <div>Time Pieces, Jewley</div>
        </div>
        <div className="category-item">
          <div>Time Pieces, Jewley</div>
        </div>
      </Slider>
    </div>
  );
}

export default Categories;
