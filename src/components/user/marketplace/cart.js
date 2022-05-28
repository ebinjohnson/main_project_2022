import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import "./cartstyle.css";

const axios = require("axios");
const Cart = () => {
  var carttotal = 0;
  let userId = window.localStorage.getItem("id");
  const [cartitems, setCartitems] = useState([]);
  async function getcartitems() {
    const data = {
      userId: userId,
    };
    let response = await axios.post("http://localhost:5000/getcartitems", data);
    if (response.status === 200) {
      setCartitems(response.data.cart);
    }
  }
  async function addquantity(id, cquantity) {
    const data = {
      cartId: id,
      quantity: cquantity,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/addquantity",
        data
      );
      if (response.status === 200) {
        window.location.reload(false);
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log("Error");
    }
  }
  async function removequantity(id, cquantity) {
    const data = {
      cartId: id,
      quantity: cquantity,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/removequantity",
        data
      );
      if (response.status === 200) {
        window.location.reload(false);
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log("Error");
    }
  }
  async function removefromcart(id) {
    const data = {
      cartId: id,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/removefromcart",
        data
      );
      if (response.status === 200) {
        alert("Item Removed");
        window.location.reload(false);
      } else {
        console.log("Failed");
      }
    } catch (e) {
      console.log("Error");
    }
  }
  useEffect(() => {
    getcartitems();
  }, []);
  return (
    <div>
      <div class="topnav">
        <a href="/userhome">Home</a>
        <a href="/viewproducts">View Products</a>
      </div>
      <div className="cart-body1">
        <div className="Cart-Container1">
          <div className="Header1">
            <h3 className="Heading1">Shopping Cart</h3>
            <h5 className="Action1">Remove all</h5>
          </div>
          {cartitems &&
            cartitems.length > 0 &&
            cartitems.map((a) => {
              return (
                <div className="Cart-Items1">
                  <div className="image-box1">
                    <img
                      src="https://cdn.pixabay.com/photo/2020/02/12/05/13/dog-cartoon-4841702__480.jpg"
                      style={{ height: "100px" }}
                    />
                  </div>
                  <div className="about1">
                    <h1 className="title1">{a.productId.productName}</h1>
                    <h3 className="subtitle2">
                      Price: INR {a.productId.productPrice}
                    </h3>
                    <h3 className="subtitle1">
                      {a.productId.productDescription}
                    </h3>
                  </div>
                  <div className="counter1">
                    <div
                      className="btn1"
                      onClick={() => {
                        if (a.quantity == a.productId.productQuantity) {
                          alert("Maximum Quantity Reached");
                        } else {
                          addquantity(a._id, a.quantity);
                        }
                      }}
                    >
                      +
                    </div>
                    <div className="count1">{a.quantity}</div>
                    <div
                      className="btn1"
                      onClick={() => {
                        if (a.quantity == 1) {
                          removefromcart(a._id);
                        } else {
                          removequantity(a._id, a.quantity);
                        }
                      }}
                    >
                      -
                    </div>
                  </div>
                  <div className="prices1">
                    <div
                      className="amount1"
                      onLoad={
                        (carttotal =
                          carttotal + a.quantity * a.productId.productPrice)
                      }
                    >
                      {a.productId.productPrice * a.quantity}
                    </div>

                    <div className="remove1">
                      <u
                        onClick={() => {
                          removefromcart(a._id);
                        }}
                      >
                        Remove
                      </u>
                    </div>
                  </div>
                </div>
              );
            })}
          <hr />
          <div className="checkout1">
            <div className="total1">
              <div>
                <div className="Subtotal1">Sub-Total</div>
                <div className="items1"></div>
              </div>
              <div className="total-amount1">{carttotal}</div>
            </div>
            <button className="button1">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
