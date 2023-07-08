import { useEffect } from "react";
import { IProduct } from "../../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { fetchShippingEstimations } from "../../../actions/shippingEstimations";

interface Iprops {
  product: IProduct | undefined;
}
function ShippingEstimations({ product }: Iprops) {
  const dispatch = useDispatch();
  const { isLoading, estimaitons, supplierId } = useSelector(
    (state: RootState) => state.estimations
  );
  const { shops } = useSelector((state: RootState) => state.shops);
  useEffect(() => {
    const shop = shops.find((item) => item.shopId === product?.shopId);
    if (shop) {
      dispatch(fetchShippingEstimations(shop.userId));
    }
  }, [product, shops]);
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3>Shipping Estimations</h3>
      <Accordion>
        <AccordionSummary
          expandIcon={<i className="bi bi-chevron-down" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<i className="bi bi-chevron-down" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ShippingEstimations;
