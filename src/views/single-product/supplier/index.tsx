import React from "react";

import { IProduct, Ishop } from "../../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { useNavigate } from "react-router-dom";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../constants";

interface ISupplierProps {
  product: IProduct;
}
function Supplier(props: ISupplierProps) {
  const navigate = useNavigate();
  const { shops } = useSelector((state: RootState) => state.shops);
  const [shop, setShop] = React.useState<Ishop | undefined>(undefined);

  React.useEffect(() => {
    let sub = true;
    if (sub) {
      const shp = shops.find((item) => item.shopId === props.product.shopId);
      if (shp) setShop(shp);
    }
    return () => {
      sub = false;
    };
  }, [props.product, shops]);
  return (
    <>
      {shop && (
        <>
          <div className="supplier-banner">
            <ImageLoader src={app.FILE_URL + shop?.shopBanner} />
            <div className="supplier-profile">
              <ImageLoader src={app.FILE_URL + shop?.shopImage} />
            </div>
          </div>
          <p>
            For more detailed information including pricing, customization, and
            shipping on {shop?.phone1}
          </p>
          <a href={`tel:${shop?.phone1}`}>
            <button className="contact-btn">
              <i className="bi bi-telephone-fill"></i> Cantact Supplier
            </button>
          </a>
          <button
            className="contact-btn mt-3"
            onClick={() => navigate("/shops/" + shop?.shopId)}
          >
            View more from this supplier
          </button>
        </>
      )}
    </>
  );
}

export default Supplier;
