import React, { useRef, useState } from "react";
import styles from "./Products.module.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
// Redux
import { connect } from "react-redux";

import Product from "./Product/Product";
import Cart from "../Cart/Cart";


const Products = ({ products }) => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className={styles.products}>
      {Cart.totalPrice}
      <div>
     <strong>Welcome to koop {currentUser.email}!</strong> <br />
        </div><br />
      <button className={styles.btnlogout} onClick={handleLogout}>
              Log Out
            </button> <br />
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(Products);