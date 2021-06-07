import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "./Signin.module.css";

function Signin() {
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
          <h2 className={styles.textcentre}>Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control className={styles.textcentre2} type="email" placeholder="Email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                className={styles.textcentre2}
                placeholder='Password'
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <button disabled={loading} className={styles.btnsubmit} type="submit">
              Sign In
            </button>
          </Form>
          {/* <div className="w-100 text-center mt-3">
            <Link to="/forgotpassword">Forgot the password?</Link>
          </div> */}
          <div className={styles.textcentre2}>
            Don't have an account? <Link to="/signup">SignUp</Link>
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

export default Signin;
