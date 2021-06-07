import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "./Signup.module.css";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/products");
    } catch {
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <div className={styles.container}>
      <div className={styles.flexbox}>
        <div className={styles.textcolumn}>
          <h2 className={styles.textcentre}>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control placeholder='Email' type="email" className={styles.textcentre2} ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                placeholder='Password'
                className={styles.textcentre2}
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirmation">
              {/* <Form.Label>Confirm Password</Form.Label> */}
              <Form.Control
                type="password"
                placeholder='Confirm Password'
                className={styles.textcentre2}
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <button disabled={loading} className={styles.btnsubmit} type="submit">
              Sign Up
            </button>
          </Form>
          <div className={styles.textcentre2}>
            Already have an account? <Link to="/">SignIn</Link>
          </div>
        </div>
        {/* <div className="imagecolumn animate__animated animate__fadeIn animate__delay-1s">
          <img src={signuppage} />
        </div> */}
      </div>
    </div>
  );
}

export default Signup;
