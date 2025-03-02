import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TopBar=({ setCategories })=> {
  const [categories, setLocalCategories] = useState([]);
  const navigate= useNavigate();
  const products = useSelector((state) => state.cart.cart);

  const getCategories = async () => {
    const response = await axios.get(
      "https://dummyjson.com/products/categories"
    );

   
    if (response.data?.length > 0) {
      const selectedCategories = response.data.slice(1, 7);
     
      setLocalCategories(selectedCategories);
      setCategories(selectedCategories);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-secondary border-bottom py-3  ">
      <Container fluid>
        <Navbar.Brand className="text-uppercase btn text-primary" onClick={()=>{navigate("/")}}>My Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="m-auto my-2 my-lg-0 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {categories.map((category) => (
              <Nav.Link
              className="text-primary" key={category.slug}               
               onClick={() => navigate(`/products-category/${category.slug}`)}
              >{category.name}</Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex gap-4">
            {/* <Button variant="outline-primary">Search</Button> */}
            <Button
              variant="outline-primary position-relative"
              onClick={() => navigate("cart")}
            >
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {products.length}
              </span>
              <i className="fa-solid fa-cart-shopping" alt="iocn"></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopBar;