import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Login from "./Authentication/Login";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Todos from "./Todos";

export default function Header(props) {
  // const [textInput1, setTextInput] = React.useState('');
  // const handleChange = (event) => {
  //   setTextInput(event.target.value);
  // }
  const navigate = useNavigate();
  function handleLoginClick(e) {
    console.log("login");
    // props.send(textInput1);
    // console.log('clicked',textInput.current.value)
  }
 
  function handleLogoutClick(e) {
    sessionStorage.clear();
    window.location.reload(false);
  }
  function handleRegisterClick() {
    navigate('/signup');
    console.log("register");
  }

  return (
    <>
    <Navbar bg="light" expand="lg" style={{backgroundcolor: "#d7ccf8 !important"}}>
      <Container fluid>
        <Navbar.Brand href="#">{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            
            <Nav.Link  onClick={() => navigate('/orders')}>{sessionStorage.getItem('username')!=null ? "Orders" : ""}</Nav.Link>
            <Nav.Link onClick={() => navigate('/profile')}>{sessionStorage.getItem('username')!=null ? "My Profile" : ""}</Nav.Link>
          </Nav>
          {props.logout ? (
            <Form className="d-flex">
              <Button onClick={handleLogoutClick} variant="outline-success">
                Logout
              </Button>
            </Form>
          ) : (
            ""
          )}
          {props.registerLogin ? (
            <Button
              onClick={() => navigate("/login")}
              variant="outline-success"
            >
              Login
            </Button>
          ) : (
            ""
          )}
          {props.registerLogin ? (
            <Button onClick={handleRegisterClick} variant="outline-success">
              Register
            </Button>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  );
}

Header.defaultProps = {
  title: "default prop",
};

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool.isRequired,
};
