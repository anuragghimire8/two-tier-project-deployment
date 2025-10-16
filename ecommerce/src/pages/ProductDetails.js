import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { Rate,Button, Modal  } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { GiBookshelf } from 'react-icons/gi';
import Barcode from 'react-barcode';

const ProductDetails = () => {


  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1); // Introduce quantity state
  const [quantities, setQuantities] = useState({});

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    // Initialize quantities based on the existing items in the cart
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item._id] = (initialQuantities[item._id] || 0) + 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);





  return (
    <Layout>
      <div className="row container mt-5">
        <div className="col-md-6 mt-5">
          
          
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{width:260}}
            height="300"
           width= "200"
          />
        </div>
        <div className="col-md-6 mt-5">
          <h1 className="text-center">Product Details</h1>
          <h3>Name : {product.name}</h3>
          <h6>Description : {product.description}</h6>
       
     

      

          <h6 style={{color: "darkred",
    background: "blanchedalmond",
    fontFamily: 'Poppins',
    
    }}  >Price : Rs.{product.price}/-</h6>
  
  
          <h6>Category : {product?.category?.name}</h6>

          {/* Quantity Selection */}
          <div className="d-flex align-items-center">
            <p className="me-2">Quantity:</p>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
  
          {/* ADD TO CART button */}
          <button
            className="btn btn-danger ms-1"
            onClick={() => {
              if (quantity === 0) {
                toast.error("Invalid Quantity");
                return;
              }

              if (product.quantity < quantity) {
                toast.error("Not enough items available");
                return;
              }

              const updatedCart = [...cart];
              const existingItemIndex = updatedCart.findIndex(
                (item) => item._id === product._id
              );

              if (existingItemIndex !== -1) {
                // If the item is already in the cart, update the selected quantity
                const newQuantity = quantities[product._id] ? quantities[product._id] + quantity : quantity;
                if (newQuantity <= product.quantity) {
                  updatedCart[existingItemIndex].selectedQuantity = newQuantity;
                } else {
                  toast.error("Not enough items available");
                  return;
                }
              } else {
                // If the item is not in the cart, add it
                if (quantity <= product.quantity) {
                  updatedCart.push({ ...product, selectedQuantity: quantity });
                } else {
                  toast.error("Not enough items available");
                  return;
                }
              }

              setCart(updatedCart);
              setQuantities((prevQuantities) => {
                const updatedQuantities = { ...prevQuantities };
                updatedQuantities[product._id] = (updatedQuantities[product._id] || 0) + quantity;
                return updatedQuantities;
              });

              localStorage.setItem("cart", JSON.stringify(updatedCart));
              toast.success("Item Added to cart");
            }}
            disabled={quantity === 0 || product.quantity < quantity}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h3 style={{color:"rebeccapurple"}}>Recommended Products<GiBookshelf></GiBookshelf></h3>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found- <img src="/images/read.png" style={{width : 62 , height : 64}}/></p>
          
        )}
        {/* <marquee> */}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" onClick={() => navigate(`/product/${p.slug}`)} style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
                style={{
                 
                  
                  height: "200px",
                  width: "18rem"
                }}

              />
              <div className="card-body shadow-lg" onClick={() => navigate(`/product/${p.slug}`)}>
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text" style={{display:"none"}}>{p.description.substring(0, 30)}...</p>
                <p className="card-text" style={{fontWeight: 900,
               fontFamily: "auto",
               marginLeft: 20,
    
            fontSize: 20,
           display: "list-item"}}> Rs.{p.price}/-</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
               
              </div>
            </div>
          ))}
        </div>
        {/* </marquee> */}
      </div>
    </Layout>
  );
};

export default ProductDetails;