import React, { useState } from "react";
import swal from "sweetalert";
import "../../App.css";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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

export default function Forgotpassword() {
  const [username, setUserName] = useState();

  const handleSubmit = async (e) => {
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
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
      <>
     
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your registered email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
      </Modal>
      </>
    );
  };



