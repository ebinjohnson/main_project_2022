import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Itemcard from "./itemcard";

import data from "./data";
import "./viewstyle.css";
const axios = require("axios");
const Home = () => {
  const [products, setProducts] = useState([]);
  async function getProducts() {
    let response = await axios.get("http://localhost:5000/getproducts");
    if (response.status === 200) {
      setProducts(response.data.products);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <div class="topnav">
        <a href="/userhome">Home</a>
        <input type="text" placeholder="Search.." />
        <button className="button">
          <i className="fa fa-search"></i>
        </button>
        <a href="/cart" className="cart">
          <i className="fa fa-opencart"></i>
        </a>
      </div>
      <h1 className="text-center mt-3">All Items</h1>
      <section className="cardss">
          {products &&
            products.length > 0 &&
            products.map((a) => {
              return (
                <Itemcard
                  // img={a.img}
                  title={a.productName}
                  desc={a.productDescription}
                  price={a.productPrice}
                  item={a._id}
                  quantity={a.productQuantity}
                />
              );
            })}
      </section>
    </div>
  );
};

export default Home;
