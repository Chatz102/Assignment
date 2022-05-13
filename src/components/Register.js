import React from "react";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Form,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = ({setRegState}) => {
  const mounted = useRef(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  /*Processes Form*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await register(email, password);
      alert("User Registered Sucessfully")
      setRegState(false);
      if (mounted.current === null) return;
    } catch {
      setError("Refresh Page");
    }
    navigate("/login");
    setLoading(false);
  };

  return (
    <Container id="main-container" ref={mounted} className="d-grid h-100">
      <Form id="register-in" className="w-100" onSubmit={handleSubmit}>
        {error && <Alert className="text-center" variant="danger">{error}</Alert>}
        <Card id="card" className="mb-3 shadow">
          <Card.Body>
            <h4 id="title" className="text-center">
              Registration Form
            </h4>
            <Form.Group className="mb-3 mt-2" controlId="formHorizontalEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                autoComplete="username"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHorizontalPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="w-100 text-center">
              <Button
                id="btn"
                type="submit"
                disabled={loading}
                className="w-50 mt-3"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </div>
          </Card.Body>
          <p className="mt-3 text-muted text-center">&copy; 2022-2023</p>
        </Card>
      </Form>
    </Container>
  );
};

export default Register;
