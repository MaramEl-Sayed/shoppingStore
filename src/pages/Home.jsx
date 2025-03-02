import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { addTodCart } from "../Redux/slices/cart.slice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { selectedCategories } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    if (selectedCategories.length === 0) return;
    try {
      const requests = selectedCategories.map((category) =>
        axios.get(`https://dummyjson.com/products/category/${category.slug}`)
      );
      const responses = await Promise.all(requests);
      const allProducts = responses.flatMap((res) => res.data.products);
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [selectedCategories]);

  const addToProductToCart = (product) => {
    dispatch(addTodCart(product));
  };
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <h3 className="text-primary text-uppercase mb-5">All Products</h3>
          {products.map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-12 my-2" key={product.id}>
              <Card className="h-100">
                {" "}
                {/* Use h-100 to ensure cards take full height */}
                <Card.Img variant="top" src={product.thumbnail} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="fs-6 text-secondary">
                    {product.description}
                  </Card.Text>
                  <div className="d-flex justify-content-center align-items-center mt-auto">
                    <Button
                      variant="primary"
                      onClick={() => addToProductToCart(product)}
                      className="me-2"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Product
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
