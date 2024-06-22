import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const navigate = useNavigate()
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleSignOut = (event) => {
    localStorage.removeItem("loggedInUser");
    navigate('/')
  };

  return (
    <header>
      <Navbar
        bg="primary"
        navbar="light"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ECart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {loggedInUser && !loggedInUser.isAdmin && (
              
                <Nav.Link>
                  <i className="bi bi-cart"> Cart</i>
                </Nav.Link>
              )}
              
              {loggedInUser && !loggedInUser.isAdmin && (
                
                  <Nav.Link>
                    <i className="bi bi-bag-check-fill"> Orders</i>
                  </Nav.Link>
                
              )}

              {loggedInUser && (
                <LinkContainer to='/profile'>
                  <Nav.Link>
                    <i className="bi bi-person-badge"> Profile</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {loggedInUser && loggedInUser.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to='/users'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to='/products'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/categories'>  
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orders'> 
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {!loggedInUser && (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right"> Log In</i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {loggedInUser && (
                <Nav.Link onClick={handleSignOut}>
                  <i className="bi bi-box-arrow-in-right"> Sign Out</i>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
