import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { RootState } from "../../../reducers";
import axios from "axios";
import { app } from "../../../components/constants";
import {
  currencyFormatter,
  errorHandler,
  setHeaders,
} from "../../../components/helpers";
import FullPageLoader from "../../../components/full-page-loader";
import { IProduct, PRICE_TYPE_ENUM } from "../../../interfaces";
import { fetchCategories } from "../../../actions/categories";
import Edit from "./edit";
import Confirmation from "../../../components/controllers/confirmation";

function Products() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [isLoading, setIsloading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

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

  const handleDelete = () => {};

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
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE &&
                        currencyFormatter(item.singlePrice)}{" "}
                      RWF
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
                      <span className="text-danger pointer">Delete</span>
                      &nbsp;|&nbsp;
                      <span className="pointer">
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
    </div>
  );
}

export default Products;
