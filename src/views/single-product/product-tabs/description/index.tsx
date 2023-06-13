import React from "react";
import { IProduct } from "../../../../interfaces";
import HtmlParser from "react-html-parser";
interface IDescriptionProps {
  product: IProduct;
}
function Description({ product }: IDescriptionProps) {
  return (
    <div className="common-description">{HtmlParser(product.description)}</div>
  );
}

export default Description;
