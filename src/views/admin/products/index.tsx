import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { adminfetchAllShops } from "../../../actions/shops";
import axios from "axios";
import { RootState } from "../../../reducers";
import { app } from "../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../helpers";
import FullPageLoader from "../../../components/full-page-loader";
import { IProduct, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import Check from "./check";
import Details from "./details";

function Products() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(adminfetchAllShops());
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setIsSubmitting(true);
    axios
      .get(app.BACKEND_URL + "/products/admin", setHeaders(token))
      .then((res) => {
        setIsSubmitting(false);
        setProducts(res.data.products);
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };

  const handleChange = (req: {
    column: string;
    value: boolean;
    id: number;
  }) => {
    setIsSubmitting(true);
    axios
      .put(app.BACKEND_URL + "/products/toggle", { ...req }, setHeaders(token))
      .then((res) => {
        setIsSubmitting(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };
  return (
    <div>
      <FullPageLoader open={isSubmitting} />
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Products
        </CardTitle>
        <CardBody className="">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>New</th>
                  <th>Electronics</th>
                  <th>Top Rated</th>
                  <th>Beauty</th>
                  <th>sale</th>
                  <th>Best</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ borderTopWidth: 0 }}>
                {products.map((item, position) => (
                  <tr key={position}>
                    <td>
                      <img
                        src={app.FILE_URL + item.images[0]?.image}
                        alt=""
                        style={{ width: 80 }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <Check
                        callBack={handleChange}
                        pId={item.pId}
                        column="onNewArrivals"
                        defaultValue={item.onNewArrivals}
                      />
                    </td>
                    <td>
                      <Check
                        callBack={handleChange}
                        pId={item.pId}
                        column="onElectronics"
                        defaultValue={item.onElectronics}
                      />
                    </td>
                    <td>
                      <Check
                        callBack={handleChange}
                        pId={item.pId}
                        column="onTopRated"
                        defaultValue={item.onTopRated}
                      />
                    </td>
                    <td>
                      <Check
                        callBack={handleChange}
                        pId={item.pId}
                        column="onBeauty"
                        defaultValue={item.onBeauty}
                      />
                    </td>
                    <td>
                      <Check
                        callBack={handleChange}
                        pId={item.pId}
                        column="onSale"
                        defaultValue={item.onSale}
                      />
                    </td>
                    <td>
                      <Check
                        callBack={handleChange}
                        pId={item.pId}
                        column="onBestSelling"
                        defaultValue={item.onBestSelling}
                      />
                    </td>
                    <td>
                      <span
                        className="pointer"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowModal(true);
                        }}
                      >
                        Details
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <Details
        selectedItem={selectedItem}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
}

export default Products;
