import { useState, useEffect } from "react";
import { IProduct } from "../../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { fetchShippingEstimations } from "../../../actions/shippingEstimations";
import Skeleton from "@mui/material/Skeleton";
import { currencyFormatter } from "../../../helpers";

interface Iprops {
  product: IProduct | undefined;
}
function ShippingEstimations({ product }: Iprops) {
  const dispatch = useDispatch();
  const [productSupplierId, setProductSupplierId] = useState<number>(0);
  const { isLoading, estimaitons, supplierId } = useSelector(
    (state: RootState) => state.estimations
  );
  const { shops } = useSelector((state: RootState) => state.shops);
  useEffect(() => {
    const shop = shops.find((item) => item.shopId === product?.shopId);
    if (shop) {
      setProductSupplierId(shop.userId);
      dispatch(fetchShippingEstimations(shop.userId));
    }
  }, [product, shops]);
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3>Shipping Estimations</h3>
      {isLoading && supplierId !== productSupplierId ? (
        <div>
          <Skeleton animation="wave" height={30} />
          <Skeleton animation="wave" height={30} />
          <Skeleton animation="wave" height={30} />
          <Skeleton animation="wave" height={30} />
          <Skeleton animation="wave" height={30} />
          <Skeleton animation="wave" height={30} />
        </div>
      ) : (
        <>
          {estimaitons.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<i className="bi bi-chevron-down" />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography>{item.toCountry}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <b>
                    From {item.fromCountry} to {item.toCountry}
                  </b>
                  <p className="m-0">
                    <small>
                      {item.currency}
                      {currencyFormatter(item.minAmount)} - {item.currency}
                      {currencyFormatter(item.maxAmount)}
                    </small>
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          {estimaitons.length === 0 && !isLoading && (
            <div className="alert alert-danger">
              No estimations found from this supplier
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShippingEstimations;
