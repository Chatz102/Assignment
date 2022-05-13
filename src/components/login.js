import React from "react";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({setRegState}) => {
  const mounted = useRef(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  /*Processes Form*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
      if (mounted.current === null) return;
    } catch {
      setError("Failed to Login!");
    }
    setLoading(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setRegState(true);
      navigate("/register");
    } catch {
      setError("Failed to go to registration page!");
    }
    setLoading(false);
  };

  return (
    <Container id="login-container" ref={mounted} className="d-grid h-100">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form id="sign-in" className="w-100" onSubmit={handleSubmit}>
        <Card id="card" className="mb-3 shadow">
          <Card.Body>
            <h4 id="title" className="text-center">
              Sign In
            </h4>
            <Form.Group
              as={Row}
              className="mb-3 mt-2"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={4}>
                Email
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  placeholder="Jasonx@ghii.org"
                  autoComplete="username"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={4}>
                Password
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
            <div className="w-100 text-center">
              <Button
                id="btn"
                type="submit"
                disabled={loading}
                className="w-50 mt-3"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </Card.Body>
          <div className="w-100 text-center">
            <Button disabled={loading} id="reg" onClick={handleRegister} className="w-50 text-black">
              Need account? click here to register
            </Button>
          </div>
          <p className="mt-3 text-muted text-center">&copy; 2022-2023</p>
        </Card>
      </Form>
    </Container>
  );
};

export default Login;
