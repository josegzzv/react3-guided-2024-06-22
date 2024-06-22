import React, { useEffect } from "react";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { credentials } from "../credentials";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = ({ history }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleUsernameChange = (event) => {
    setError("");
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setError("");
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    if (username === "" || password === "") {
      setError("Username and password are required");
    } else {
      const creds = JSON.parse(localStorage.getItem("credentials"));
      if (!creds) {
        setError("Not able to perform sign in operation");
      } else if (creds[username] && creds[username] === password) {
        setError("");
        setSuccess("Successfully logged in");

        const userObject = JSON.parse(localStorage.getItem("users")).filter(
          (user) => user.username === username
        )[0];
        localStorage.setItem("loggedInUser", JSON.stringify(userObject));
        window.location.replace("/");
      } else {
        setError("Username or password is incorrect");
      }
    }
  };

  return (
    <>
      {error && <AlertMessage variant="danger" message={error} />}
      {success && <AlertMessage variant="success" message={success} />}
      <FormGroup className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="txt"
          id="username"
          placeholder="Username"
          onChange={handleUsernameChange}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
        className="mb-3"
      >
        Login
      </Button>
      <Row>
        <Col className="mb-3">
          Don't have an account? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
