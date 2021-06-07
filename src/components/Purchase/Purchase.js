import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "./Purchase.module.css";

function Purchase() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/products");
    } catch {
      console.log(error);
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexbox}>
        <div className={styles.textcolumn}>
          <h2 className={styles.textcentre}>Confirm Order</h2>
          <div>
     <strong className={styles.textcentre3}>User email: {currentUser.email}</strong> <br />
        </div><br />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="CardDetails">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control className={styles.textcentre2} type="number" placeholder="Enter Card Details"  required></Form.Control>
            </Form.Group>
            <Form.Group id="address">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="text"
                className={styles.textcentre2}
                placeholder='Address'
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <button disabled={loading} className={styles.btnsubmit} type="submit">
              Purchase
            </button>
          </Form>
          {/* <div className="w-100 text-center mt-3">
            <Link to="/forgotpassword">Forgot the password?</Link>
          </div> */}
          <div className={styles.textcentre2}>
             <Link to="/cart">
             <button className={styles.btnlogout}>
              Back to Cart
            </button> <br />
            </Link>
          </div>

        </div>
        {/* <div className="imagecolumn animate__animated animate__fadeIn animate__delay-1s">
          <img src={loginpage} />
        </div> */}
      </div>
    </div>
    // <div>Hello</div>
  );
}

export default Purchase;
