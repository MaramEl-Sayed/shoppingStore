import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addTodCart } from "../Redux/slices/cart.slice";
import axios from "axios";
import { Container, Card, Button, ListGroup } from "react-bootstrap";

const ProductDetails = () => {
    const [product,setProduct]=useState([]);
    const { productId }=useParams();
    const dispatch = useDispatch();

    const getProductDetails=async ()=>{
        const response =await axios.get(`https://dummyjson.com/products/${productId}`)
        console.log(response);
       
            setProduct(response.data)
        
    }
    useEffect(()=>{
        if (productId){
        getProductDetails();}
    },[productId])
  const addToProductToCart = (product) => {
      dispatch(addTodCart(product))
    };
   
  return (
    <Container className="d-flex justify-content-center mt-5 ">
      <Card className="w-100 align-items-center" >
        <Card.Img variant="top" src={product.thumbnail} alt={product.title} 
        className="w-25 "/>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <ListGroup className="list-group-flush ">
            <ListGroup.Item><strong>Brand:</strong> {product.brand}</ListGroup.Item>
            <ListGroup.Item><strong>Category:</strong> {product.category}</ListGroup.Item>
            <ListGroup.Item><strong>Price:</strong> ${product.price}</ListGroup.Item>
            <ListGroup.Item><strong>Discount:</strong> {product.discountPercentage}%</ListGroup.Item>
            <ListGroup.Item><strong>Stock:</strong> {product.stock} units</ListGroup.Item>
            <ListGroup.Item><strong>Availability:</strong> {product.availabilityStatus}</ListGroup.Item>
            <ListGroup.Item><strong>Shipping:</strong> {product.shippingInformation}</ListGroup.Item>
            <ListGroup.Item><strong>Warranty:</strong> {product.warrantyInformation}</ListGroup.Item>
            <ListGroup.Item><strong>Return Policy:</strong> {product.returnPolicy}</ListGroup.Item>
            <ListGroup.Item><strong>Rating:</strong> {product.rating} ⭐</ListGroup.Item>
          </ListGroup>
         
          <Button variant="primary" className="w-100 mt-3" onClick={() => addToProductToCart(product)}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails
