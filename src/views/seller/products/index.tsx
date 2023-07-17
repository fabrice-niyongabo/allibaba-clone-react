import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { RootState } from "../../../reducers";
import axios from "axios";
import { app } from "../../../constants";
import {
  currencyFormatter,
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../helpers";
import FullPageLoader from "../../../components/full-page-loader";
import {
  IProduct,
  PRICE_TYPE_ENUM,
  TOAST_MESSAGE_TYPES,
} from "../../../interfaces";
import { fetchCategories } from "../../../actions/categories";
import Edit from "./edit";
import Confirmation from "../../../controllers/confirmation";
import Images from "./images";
import Prices from "./prices";

function Products() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [isLoading, setIsloading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const [viewImages, setViewImages] = useState(false);
  const [shopPrices, setShowPrices] = useState(false);

  //
  const [showEdit, setShowEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | undefined>(
    undefined
  );
  //

  const getCategoryName = (id: number) => {
    const cat = categories.find((item) => item.id === id);
    if (cat) {
      return cat.name;
    }
    return "-";
  };

  const getSubCategoryName = (id: number, subcatId: number) => {
    const cat = categories.find((item) => item.id === id);
    if (cat) {
      const subCat = cat.subCategories.find((item) => item.id === subcatId);
      if (subCat) {
        return subCat.name;
      }
    }
    return "-";
  };

  useEffect(() => {
    fetchProducts();
    dispatch(fetchCategories());
  }, []);

  const fetchProducts = () => {
    setIsloading(true);
    axios
      .get(app.BACKEND_URL + "/products/mine", setHeaders(token))
      .then((res) => {
        setIsloading(false);
        setProducts(res.data.products);
      })
      .catch((error) => {
        setIsloading(false);
        errorHandler(error);
      });
  };

  const fetchProductsSilent = () => {
    axios
      .get(app.BACKEND_URL + "/products/mine", setHeaders(token))
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const handleDelete = async () => {
    setIsloading(true);
    try {
      setIsloading(false);
      const res = await axios.delete(
        app.BACKEND_URL + "/products/" + selectedItem?.pId,
        setHeaders(token)
      );
      toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      setProducts(products.filter((item) => item.pId !== selectedItem?.pId));
      setSelectedItem(undefined);
      setIsloading(false);
    } catch (error) {
      errorHandler(error);
      setIsloading(false);
    }
  };
  return (
    <div>
      <FullPageLoader open={isLoading} />
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          My Products
        </CardTitle>
        <CardBody>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </thead>
              <tbody style={{ borderTopWidth: 0 }}>
                {products.map((item, position) => (
                  <tr key={position}>
                    <td>{item.pId}</td>
                    <td>{item.name}</td>
                    <td>{getCategoryName(item.categoryId)}</td>
                    <td>
                      {getSubCategoryName(item.categoryId, item.subCategoryId)}
                    </td>
                    <td>
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE && (
                        <>{currencyFormatter(item.singlePrice)} </>
                      )}
                      {item.priceType === PRICE_TYPE_ENUM.MANY && (
                        <span
                          className="pointer text-primary"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowPrices(true);
                          }}
                        >
                          View Prices
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        className="text-primary pointer"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowEdit(true);
                        }}
                      >
                        Edit
                      </span>
                      &nbsp;|&nbsp;
                      <span
                        className="text-danger pointer"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowAlert(true);
                        }}
                      >
                        Delete
                      </span>
                      &nbsp;|&nbsp;
                      <span
                        className="pointer"
                        onClick={() => {
                          setSelectedItem(item);
                          setViewImages(true);
                        }}
                      >
                        Images({item.images.length})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
        title="Do you want to delete this product?"
      />
      <Edit
        selectedItem={selectedItem}
        showModal={showEdit}
        setShowModal={setShowEdit}
        fetchData={fetchProducts}
      />
      <Images
        selectedItem={selectedItem}
        showModal={viewImages}
        setShowModal={setViewImages}
        fetchData={fetchProductsSilent}
        allProducts={products}
      />
      <Prices
        selectedItem={selectedItem}
        showModal={shopPrices}
        setShowModal={setShowPrices}
        fetchData={fetchProductsSilent}
        allProducts={products}
      />
    </div>
  );
}

export default Products;
