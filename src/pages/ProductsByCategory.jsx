import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getProductsByCategory = async (categoryId) => {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${categoryId}`
    );
    if (response.data?.products.length > 0) {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    if (params.categoryId) {
      getProductsByCategory(params.categoryId);
    }
  }, [params]);

  return (
    <div className="container">
      {params?.categoryId ? (
        <h3 className="text-uppercase text-primary my-5">
          {params.categoryId} Products
        </h3>
      ) : null}
      {products.map((product) => (
        <div
          className="w-100 py-5 px-3 d-flex gap-2 border border-1 rounded-3 my-2"
          key={product.id}
        >
          <img
            src={product.thumbnail}
            alt=""
            style={{ height: "12rem" }}
            className="w-25"
          />
          <div className="d-flex justify-content-between align-items-start w-75">
            <div className="w-75">
              <h2>{product.title}</h2>
              <p className="text-secondary">{product.description}</p>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end w-25 h-100">
              <div>
                <h4>{product.price} $</h4>
                {product.availabilityStatus === "In Stock" ? (
                  <p className="text-success">in stock</p>
                ) : null}
              </div>
              <button className="btn btn-primary" onClick={() => navigate(`/product/${product.id}`)}>View Product</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductsByCategory;
