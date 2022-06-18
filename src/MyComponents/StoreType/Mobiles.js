import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import useRazorpay from "react-razorpay";
import swal from "sweetalert";
import addNotification from 'react-push-notification'
import { Notifications } from 'react-push-notification';

function Mobiles() {
  const Razorpay = useRazorpay();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState([]);
  const [dbtoken, setDbtoken] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [customerName, setCustomerName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [amount, setAmount] = useState();

  const [razorpayPaymentId, setRazorpaypaymentId] = useState("");
  const [razorpayOrderId, setRazorpayorderId] = useState("");
  const [razorpaySignature, setRazorpaysignature] = useState("");

  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
    setToken(sessionStorage.getItem("accessToken"));

    async function names() {
      try {
        if (username !== undefined || username !== "" || username !== null) {
          const headers = new Headers();
          headers.set("Content-type", "application/json");
          headers.set("Authorization", "Bearer " + token);
          headers.set("Access-Control-Allow-Origin", "*");
          const response = await fetch(
            `http://localhost:9001/getmail/${sessionStorage.getItem(
              "username"
            )}`
          );

          if (!response.ok) {
            console.log("error while fetch", await response.json());
            return;
          }
          const userData = await response.json();
          console.log("token getting ", userData);
          const savedlocaltoken = sessionStorage.getItem("accessToken");
          if (userData.token === savedlocaltoken) {
            console.log("got it");
          }
          setDbtoken(await response.json());
        }
      } catch {}
    }
    names();
  }, [refreshKey]);
  const descriptionTitle = {
    textAlign: "-webkit-center",
    margin: "16px",
  };

  function warningNotification (){
    addNotification({
      title: 'Warning',
      subtitle: 'Please login',
      message: 'You have login before order',
      theme: 'red',
      closeButton:"X",
    })
  };

  const handleClick = async (params) => {
    if (username === undefined || username === "" || username === null) {
      warningNotification();
      return;
    } else {
      setCustomerName(username.split("@")[0]);
      setEmail(username);
      setPhoneNumber("9999999999");
      setAmount(location.state.price);

      setRefreshKey((oldKey) => oldKey + 1);
      console.log("dbtoken ", dbtoken);
      //  const order = await createOrder(params); //  Create order on your backend
      const response = await createOrder({
        customerName: sessionStorage.getItem("username").split("@")[0],
        email : sessionStorage.getItem("username"),
        phoneNumber : "9898989898",
        amount : location.state.price
      });

      console.log(response);

      const options = {
        description: location.state.id,
        image:
        `http://localhost:9001${location.state.photosImagePath.split(",")[0]}`,
        currency: "INR",
        key: "rzp_test_Rdab4sKKJnl5EP", // Enter the Key ID generated from the Dashboard
        amount: location.state.price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        name: username,
        order_id: response.razorpayOrderId,
        handler: function (response) {
          console.log("only after success payment");
          swal("Success", "order confirmed sucessfully", "success", {
            buttons: false,
            timer: 2000,
          });
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_signature);
          console.log(response);

          setRazorpaypaymentId(response.razorpay_payment_id);
          setRazorpayorderId(response.razorpay_order_id);
          setRazorpaysignature(response.razorpay_signature);

          updateOrder({
            razorpayOrderId : response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            productId: location.state.id
          });
        },
        prefill: {
          name: sessionStorage.getItem("username"),
          email: sessionStorage.getItem("username"),
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    }

    async function createOrder(credentials) {
      console.log('hello clicked', token);


      return fetch("http://localhost:9001/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body: JSON.stringify(credentials),
      }).then((data) => data.json());
    }

    async function updateOrder(credentials) {
      return fetch("http://localhost:9001/order", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body: JSON.stringify(credentials),
      }).then((data) => data);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <h3 style={descriptionTitle}>Product Description</h3>
      <Notifications />
      <Row xs={1} md={2} className="g-4" style={{ margin: "12px" }}>
        <Col>
          <Card>
            <Carousel fade>
              {location.state.photosImagePath.split(",")[0] ? (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ height: "52vh" }}
                    src={`http://localhost:9001${
                      location.state.photosImagePath.split(",")[0]
                    }`}
                    alt="First slide"
                  />
                </Carousel.Item>
              ) : (
                ""
              )}
              {location.state.photosImagePath.split(",")[1] ? (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ height: "52vh" }}
                    src={`http://localhost:9001${
                      location.state.photosImagePath.split(",")[1]
                    }`}
                    alt="Second slide"
                  />
                </Carousel.Item>
              ) : (
                ""
              )}
              {location.state.photosImagePath.split(",")[2] ? (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ height: "52vh" }}
                    src={`http://localhost:9001${
                      location.state.photosImagePath.split(",")[2]
                    }`}
                    alt="Second slide"
                  />
                </Carousel.Item>
              ) : (
                ""
              )}
              {location.state.photosImagePath.split(",")[3] ? (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ height: "52vh" }}
                    src={`http://localhost:9001${
                      location.state.photosImagePath.split(",")[3]
                    }`}
                    alt="Second slide"
                  />
                </Carousel.Item>
              ) : (
                ""
              )}
              {location.state.photosImagePath.split(",")[4] ? (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ height: "52vh" }}
                    src={`http://localhost:9001${
                      location.state.photosImagePath.split(",")[4]
                    }`}
                    alt="Second slide"
                  />
                </Carousel.Item>
              ) : (
                ""
              )}
            </Carousel>
          </Card>
        </Col>
        <Col style={{ marginTop: "30px" }}>
          <p>{location.state.name}</p>
          <p>{location.state.address}</p>
          <p>{location.state.description}</p>
          <h3>{location.state.price}$</h3>
          <Button variant="info" onClick={handleClick}>
            Place Order
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Mobiles;
