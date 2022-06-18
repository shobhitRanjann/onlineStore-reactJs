import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../../App.css";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from "axios";

async function loginUser(credentials) {

  return axios({
    method: "post",
    url: "http://localhost:9001/process_register",
    data: credentials,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
       return response;
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
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

export default function Signup() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [mobilenumber, setMobilenumber] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[assword  >> ',password);
    let formdata = new FormData();
    formdata.append("email",username);
        formdata.append("password",password);
        formdata.append("firstName", firstname);
        formdata.append("lastName",lastname);
    const response = await loginUser(
        formdata
    );
    console.log("reponse de rha ", response);
    if ("data" in response) {
      console.log(response);
      swal("Success", "Please confirm your account from your email !..", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
          console.log('sucess register')
        // sessionStorage.setItem("accessToken", response["jwt"]);
        // sessionStorage.setItem("username", username);
        // // localStorage.setItem("accessToken", response["jwt"]);
        // // localStorage.setItem("user", JSON.stringify(response["jwt"]));
        // console.log("response", response["accessToken"]);
          navigate('/login')
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
    if ("data" in response) {
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
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter first name"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter last name"
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter mobile number"
          onChange={(e) => setMobilenumber(e.target.value)}
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
        <a onClick={handleShow}>Forgot password?</a>
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
