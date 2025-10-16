import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values, setAuth, sortResults] = useSearch(); // Use the context

  useEffect(() => {
    // Sort the results using the quicksort algorithm
    sortResults();
  }, [values.results]); // Trigger sorting when results change

  useEffect(() => {
    // Filter the products based on the search query
    const query = searchQuery.toLowerCase();
    const filtered =
      query === ""
        ? values.results // Display all products if search query is empty
        : values.results.filter(
            (product) =>
              product.name.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query)
          );
    setFilteredProducts(filtered);
  }, [searchQuery, values.results]);

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1 style={{ padding: "25px" }}>Search Results</h1>
          <h6>
            {filteredProducts.length < 1
              ? "No Products Found"
              : `Found ${filteredProducts.length} Products`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {filteredProducts.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="btn btn-primary ms-1"
                  >
                    More Details
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

export default Search;
