import React from "react";
import Home from "./home";
import Cart from "./cart";
import Sidenav from "./sidenav";
import { CartProvider } from "react-use-cart";

function Viewproducts() {
  return (
    <>
      <Sidenav></Sidenav>
      <Home />
    </>
  );
}

export default Viewproducts;
