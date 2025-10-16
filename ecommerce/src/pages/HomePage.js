import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio,Rate,FloatButton  } from "antd";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import "../styles/Homepage.css";
//import ChatBot from 'react-simple-chatbot';
import NepaliDate from 'nepali-datetime';
// import { ThemeProvider } from 'styled-components';








const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);


  const fetchRecommendedProducts = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/recommended-products/${userId}`);
      const { success, products } = response.data;

      if (success) {
        setRecommendedProducts(products);
      }
    } catch (error) {
      console.error("Error fetching recommended products", error);
    }
  };

  useEffect(() => {
    // Fetch recommended products when the component mounts
    fetchRecommendedProducts();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // ... (rest of the component)



  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


const filterProducts = async () => {
  try {
    setLoading(true);

    const { data } = await axios.post("/api/v1/product/product-filters", {
      checked,
      radio,
    });

    setLoading(false);
    setProducts(data?.products);
  } catch (error) {
    console.error("Error filtering products", error);
    setLoading(false);
  }
};
 // Filter by category
 const handleFilter = (value, id) => {
  let all = [...checked];
  if (value) {
    all.push(id);
  } else {
    all = all.filter((c) => c !== id);
  }
  setChecked(all);
};

useEffect(() => {
  if (!checked.length || !radio.length) getAllProducts();
}, [checked.length, radio.length]);

useEffect(() => {
  if (checked.length || radio.length) filterProducts();
}, [checked, radio]);
// get filtered product


  //nepalidate
  const now = new NepaliDate();
  
  const nepdate = now.format('YYYY-MM-DD');



  return (
    <Layout title={"ALl Products - Best offers "}>
     <div id="carouselExampleDark" className="carousel carousel-dark slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={1} aria-label="Slide 2" />
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={2} aria-label="Slide 3" />
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval={10000}>
      <img src="https://i.pinimg.com/564x/f1/ca/4a/f1ca4a2b4143a4ce875b20261bc91a4c.jpg" className="d-block w-100" alt="" height={"500px"} />
      <div className="carousel-caption d-none d-md-block">
        <h5 style={{color: "white"}}>E-HomeStore</h5>
        <p style={{color: "white"}}>Customers Recommended Site for Buying Online Books</p>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval={2000}>
      <img src="https://i.pinimg.com/564x/5d/38/55/5d38553a3e5686bced58eaac57be1d39.jpg" className="d-block w-100" alt="..." height={"500px"}  />
      <div className="carousel-caption d-none d-md-block">
        <h5 style={{color: "white"}}>E-HomeStore</h5>
        <p style={{color: "white"}}>Best Online Platform - Buying & Selling Books {nepdate}</p>
      </div>
    </div>
   
    <div className="carousel-item">
      <img src="https://i.pinimg.com/564x/25/78/be/2578be9c03a43749f260b40626fd727b.jpg"
       className="d-block w-100" alt="..." height={"500px"}  />
      <div className="carousel-caption d-none d-md-block">
        <h5 style={{color: "white"}}>HomeStore</h5>
        <p style={{color: "black"}}>Delivers you with just one Click</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>
<marquee style={{ color: 'white', fontSize: '3em' , background: 'red' }}>Best Selling get 20% OFF on NEW Sign UP !! HURRY UP !!</marquee>

      <div className="container-fluid row mt-5">
        <div className="col-md-2 mt-5">
          <h4 className="text">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          
          {/* price filter */}
          <h4 className="text mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
         
        </div>
        <div className="col-md-9 offset-1">
          <h1 className="text-center mt-5">All Products <img src="/images/logo.png"/> </h1>
          <div className="d-flex flex-wrap   ">
            {products?.map((p) => (
              <div className="card m-2" onClick={() => navigate(`/product/${p.slug}`)} style={{ width: "rem"}} key={p._id}>
                <img
                style={{ width: "14rem", height: "200px" }}
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  
                />
                <div className="card-body shadow-lg "
                onClick={() => navigate(`/product/${p.slug}`)}
                >
                  <h5 className="card-title">{p.name}</h5>
                  {/* <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p> */}
                  <p className="card-text" style={{
                    color:"red",
                    fontStyle:"bold",
                    fontSize:"25px",
                    fontWeight: 900,
                    textAlign: "center",
                    fontFamily: "auto"
                    
                   
                
                }}> Rs.{p.price}/-
                 
                 
                  </p>
                 
                  <button
                  style={{    fontFamily: "serif",
                    background: "darkblue"}}
                    className="btn btn-primary  w-100" 
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
               
                 
                  
                </div>
              </div>
            ))}
          </div>
          {/* <FloatButton style={{
        left: 24 + 70 + 70,
      }}
      
      />
           */}

      

          {/* <FloatButton onClick={() => <ChatBot steps={steps}} /> />   */}
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;