import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../../App.css";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

async function loginUser(credentials) {
  return fetch("http://localhost:9001/registerapii", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function forgotuser(credentials) {
  console.log(JSON.stringify(credentials));
  console.log(credentials.username);
  return fetch(
    `http://localhost:9001/forgotpassword/${credentials.username}`,
    {
      method: "POST",
    }
  ).then((data) => data.toString());
}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password,
    });
    console.log("reponse de rha ", response);
    if ("jwt" in response) {
      console.log(response.jwt);
      swal("Success", response.jwt, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        sessionStorage.setItem("accessToken", response["jwt"]);
        sessionStorage.setItem("username", username);
        // localStorage.setItem("accessToken", response["jwt"]);
        // localStorage.setItem("user", JSON.stringify(response["jwt"]));
        console.log("response", response["accessToken"]);
        window.location.href = "/";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };


  const handleForgetPass = async (e) => {
    e.preventDefault();
    const response = await forgotuser({
      username,
    });
    console.log("reponse de rha ", response);
    if (response) {
      console.log(response);
      swal("Success", "Rest link sent on your email id", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
         handleClose();
        // sessionStorage.setItem("accessToken", response["jwt"]);
        // localStorage.setItem("accessToken", response["jwt"]);
        // localStorage.setItem("user", JSON.stringify(response["jwt"]));
        //console.log("response", response["accessToken"]);
        // window.location.href = "/";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <form
      noValidate
      onSubmit={handleSubmit}
      className="loginFormPage"
      style={{ height: "95vh" }}
    >
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a onClick={handleShow}>password?</a>
      </p>
    </form>

      {show?
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your registered email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form
        noValidate
        onSubmit={handleForgetPass}
        className="loginFormPage"
      >
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>:''}
    </>
  );
}
