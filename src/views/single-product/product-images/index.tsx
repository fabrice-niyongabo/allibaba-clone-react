import React from "react";
import { Carousel } from "react-responsive-carousel";

import { IProduct } from "../../../interfaces";
import { app } from "../../../constants";
import { makeStyles } from "@mui/styles";
interface IProductImagesProps {
  product: IProduct;
}
function ProductImages(props: IProductImagesProps) {
  const classes = useStyles();
  return (
    <div>
      <Carousel infiniteLoop swipeable={true} dynamicHeight={true}>
        {props.product.images.map((item, position) => (
          <div key={position} className={classes.container}>
            <img src={app.FILE_URL + item.image} alt={props.product.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ProductImages;

const useStyles = makeStyles((theme) => ({
  container: {
    "& span": {
      display: "block !important",
    },
  },
}));
