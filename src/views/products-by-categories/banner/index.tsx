import React from "react";

import banner from "../../../assets/images/static/banner3.png";
import { ICategory } from "../../../interfaces";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../components/constants";
import { makeStyles } from "@mui/styles";

interface IBannerProps {
  category: ICategory;
}
function Banner({ category }: IBannerProps) {
  const classes = useStyles();
  return (
    <div className={`banner ${classes.container}`}>
      <ImageLoader src={app.FILE_URL + category.banner} alt="" />
    </div>
  );
}

export default Banner;

const useStyles = makeStyles((theme) => ({
  container: {
    "& span": {
      display: "block !important",
      width: "100% !important",
    },
  },
}));
