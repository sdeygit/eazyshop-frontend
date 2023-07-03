import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/productCard";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const Products = ({}) => {
    const {keyword} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage
        // filteredProductsCount,
      } = useSelector((state) => state.products);

    //   const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
      setCurrentPage(e);
    };

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
        dispatch(getProduct(keyword,currentPage));
    }, [dispatch, keyword, currentPage, alert, error]);
  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <Fragment>
           <MetaData title="PRODUCTS -- EAZYSHOP" />
            <h2 className="productsHeading">Products</h2>
            <div className="products">
                {products &&
                products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          
          {resultPerPage < productsCount && (
            <div className="paginationBox">
            <Pagination 
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
          )}
        </Fragment>)}
    </Fragment>
  )
}

export default Products
