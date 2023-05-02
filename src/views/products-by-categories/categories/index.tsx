//@ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { RootState } from "../../../reducers";
import { ICategory } from "../../../interfaces";
import { useNavigate } from "react-router-dom";

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

interface ICategoriesProps {
  category: ICategory;
  subCategoryId: any;
}
function Categories({ category, subCategoryId }: ICategoriesProps) {
  const navigate = useNavigate();
  // const { categories } = useSelector((state: RootState) => state.categories);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    // infinite: true,
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
        <div
          className={`category-item ${
            subCategoryId === undefined || subCategoryId === "all"
              ? "active"
              : ""
          }`}
          style={{ width: 100 }}
          onClick={() => navigate("/category/" + category.id + "/all")}
        >
          <div>All</div>
        </div>
        {category.subCategories.map((item, index) => (
          <div
            key={index}
            className={`category-item ${
              Number(subCategoryId) === item.id ? "active" : ""
            }`}
            onClick={() => navigate("/category/" + category.id + "/" + item.id)}
          >
            <div>{item.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Categories;
