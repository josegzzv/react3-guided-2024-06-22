import React from "react";
import { Col, Form, Container, Button, Row,ListGroup, Image } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  console.log(loggedInUser);

  const [username, setUserName] = React.useState(loggedInUser.username);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState(loggedInUser.email);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const handleUsernameChange = (e) => {
    setError("");
    setMessage("");
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setError("");
    setMessage("");
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setError("");
    setMessage("");
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setError("");
    setMessage("");
    setEmail(e.target.value);
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    
    if (password != confirmPassword) {
      setError("Passwords do not match");
    } else if (email === "") {
      setError("Email is required");
    } else {
      loggedInUser.password = password;
      loggedInUser.email = email;
      setMessage("User details are updated");
      let users = JSON.parse(localStorage.getItem("users"));
      users = users.filter((user) => user.username !== loggedInUser.username);
      users.push(loggedInUser);
      localStorage.setItem("users", JSON.stringify(users));
      const credentials = JSON.parse(localStorage.getItem("credentials"));
      credentials[loggedInUser.username] = password;
      localStorage.setItem("credentials", JSON.stringify(credentials));
    }
  };
  return (
    <>
      <Container>
        {error && <AlertMessage variant="danger" message={error} />}
        {message && <AlertMessage variant="success" message={message} />}
        <Form>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              disabled
              onChange={(e) => handleUsernameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="pasword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            onClick={(e) => updateUserHandler(e)}
          >
            Update Details
          </Button>
        </Form>
      </Container>

    </>
  );
};

export default UserProfilePage;
