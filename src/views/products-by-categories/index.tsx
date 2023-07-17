import { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Banner from "./banner";
import Categories from "./categories";
import "../../assets/scss/productsByCategories.scss";
import Products from "./products";
import { useParams } from "react-router-dom";
import { ICategory } from "../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import FullPageLoader from "../../components/full-page-loader";

function ProductsByCategories() {
  const { categories, isLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const [category, setCategory] = useState<ICategory | undefined>(undefined);
  const { categoryId, subCategoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      const cat = categories.find((item) => item.id === Number(categoryId));
      setCategory(cat);
    } else {
      setCategory(undefined);
    }
  }, [categories, categoryId]);
  return (
    <>
      <FullPageLoader open={isLoading && categories.length === 0} />
      <Header />
      <div className="product-by-category-main-container">
        {category === undefined ? (
          <div className="afriseller-container mt-5" style={{ height: "70vh" }}>
            <div className="bg-white p-5">
              <div className="alert alert-danger">
                No data found for this link.
              </div>
            </div>
          </div>
        ) : (
          <>
            <Banner category={category} />
            <div className="afriseller-container">
              <Categories category={category} subCategoryId={subCategoryId} />
              <Products category={category} subCategoryId={subCategoryId} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductsByCategories;
