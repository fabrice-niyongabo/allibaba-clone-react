//@ts-nocheck
import React from "react";
import Carousel from "nuka-carousel";

function Categories() {
  return (
    <div className="product-categories-main-container">
      <Carousel
        autoplay={false}
        wrapAround={true}
        slidesToShow={6}
        adaptiveHeight={true}
        slidesToScroll={6}
        renderBottomCenterControls={() => <></>}
        renderCenterLeftControls={({ previousSlide }) => (
          <div className="carausel-custom-control" onClick={previousSlide}>
            <i className="bi bi-caret-left-fill"></i>
          </div>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <div className="carausel-custom-control" onClick={nextSlide}>
            <i className="bi bi-caret-right-fill"></i>
          </div>
        )}
      >
        <div className="category-item">All</div>
        <div className="category-item">Vehicle parts & Accessories</div>
        <div className="category-item">Tools & Hardware</div>
        <div className="category-item">Time Pieces, Jewley</div>
        <div className="category-item">All</div>
      </Carousel>
    </div>
  );
}

export default Categories;
