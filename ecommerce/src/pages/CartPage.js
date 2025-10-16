import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [quantities, setQuantities] = useState({});

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.selectedQuantity;
      });
      return total.toLocaleString("en-Nepal", {
        style: "currency",
        currency: "NPR",
      });
    } catch (error) {
      console.log(error);
    }
  };

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
  
  
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
 
const handlePayment = async () => {
  try {
    if (auth?.user?.role === 'admin') {
      // Display a message or take appropriate action for admins
      toast.error("Admins cannot make payments.");
      return;
    }

    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const { data } = await axios.post("/api/v1/product/braintree/payment", {
      nonce,
      cart: cart.map(item => ({ ...item, quantity: quantities[item._id] || 1 })),
    });
    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboard/user/orders");
    toast.success("Payment Completed Successfully ");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
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
                  <p>Price: Rs.{(p.price * p.selectedQuantity).toLocaleString("en-Nepal", { style: "currency", currency: "NPR" })}</p>

               <p>Quantity: {p.selectedQuantity}</p>

                 
                    
                 
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
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  {auth?.user?.role !== "admin" && (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  // Changes made: Render the "Update Address" button only for non-admin users
                  auth?.user?.role !== "admin" && (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  )
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                {auth?.user?.role !== 1 && ( 
                  <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                    
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
              </>
           )}
           </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
