import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const AdminCart = () => {
  const [quantities, setQuantities] = useState({});
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Functions for handling quantity changes and removing items
  const increaseQuantity = (pid) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [pid]: (prevQuantities[pid] || 0) + 1,
    }));
  };
      
  const decreaseQuantity = (pid) => {
    setQuantities((prevQuantities) => {
      const updatedQuantity = Math.max((prevQuantities[pid] || 0) - 1, 0);
      return {
        ...prevQuantities,
        [pid]: updatedQuantity,
      };
    });
  };

  const removeCartItem = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-5">
            <h1 className="text-center bg-light p-2 mb-1 m-5">
              {`Hello, ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${
                    cart.length
                  } items in your cart ${auth?.token ? "" : "please login to checkout"}`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"200px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <p>Quantity: {quantities[p._id] || 1}</p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => increaseQuantity(p._id)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm mx-2"
                    onClick={() => decreaseQuantity(p._id)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
     
        </div>
      </div>
    </Layout>
  );
};

export default AdminCart;
