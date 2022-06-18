import React, { Component, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Mobiles from "./StoreType/Mobiles";
import { useNavigate } from "react-router-dom";

export default function Todos() {
  // Constructor
  const [items, setItems] = useState([]);

  useEffect(() => {
    names();
  }, []);

  const names = async () => {
    const response = await fetch("http://localhost:9001/all");

    setItems(await response.json());
    console.log(items)
  };

  const history = useNavigate();

  const handleData = (data) => {
    console.log("dtaa ", data.item);
    history("/mobiles", { state: data.item });
  };
  const cardHeader = {
    textAlign: "-webkit-center",
    margin: "10px 0px -6px 0px",
  };
  const homeBody = {
    margin: "12px",
    minHeight: "100vh",
  };

  return (
    <>
      <h3 style={cardHeader}>Mobiles</h3>
      <Row xs={1} md={4} className="g-4" style={homeBody}>
        {items.map((item) => {
          return (
            <>
            {item.producttype===null ?
            <Col key={item.id}>
              <Card>
                <Carousel>
                  <Carousel.Item>
                    <Card.Img
                      variant="top"
                      style={{ height: "148px" }}
                      src={`http://localhost:9001${
                        item.photosImagePath.split(",")[0]
                      }`}
                    />
                  </Carousel.Item>
                </Carousel>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description.substring(0, 75)}...</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleData({ item })}
                  >
                    Go somewhere
                  </Button>
                </Card.Body>
              </Card>
            </Col> : "" } </>
          );
        })}
      </Row>







      <h3 style={cardHeader}>Laptop</h3>
      <Row xs={1} md={4} className="g-4" style={homeBody}>
        {items.map((item) => {
          return (
            <>
            {item.producttype==='laptop' ?
            <Col key={item.id}>
              <Card>
                <Carousel>
                  <Carousel.Item>
                    <Card.Img
                      variant="top"
                      style={{ height: "148px" }}
                      src={`http://localhost:9001${
                        item.photosImagePath.split(",")[0]
                      }`}
                    />
                  </Carousel.Item>
                </Carousel>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description.substring(0, 75)}...</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleData({ item })}
                  >
                    Go somewhere
                  </Button>
                </Card.Body>
              </Card>
            </Col> : "" } </>
          );
        })}
      </Row>
    </>

    // <div className = "App">
    //     <h1> Fetch data from an api in react </h1>  {
    //         items.map((item) => (
    //         <div key = { item.id } >
    //             User_Name: { item.name },
    //             Full_Name: { item.address },
    //             User_Email: { item.description },
    //             user image: <img src={`http://localhost:9001/dept_photos/${ item.id }/adhar.png`} alt="no image" />
    //         </div>
    //         ))
    //     }
    // </div>
  );
}
