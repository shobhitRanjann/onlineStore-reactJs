import React, { Component, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

export default function MyProfile() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    names();
  }, []);

  const names = async () => {
    const username = sessionStorage.getItem("username");
    console.log(username);
    const response = await fetch(`http://localhost:9001/getmail/${username}`);
    setItems(await response.json());
    console.log("hello userr", items);
  };

  const alignprofile = {
    textAlignLast: "center",
    height: "100vh",
    margin: "109px"
  }

  return (
    <>
     
      <ListGroup style={alignprofile}>
        <ListGroup.Item>Email:  {items.email}</ListGroup.Item>
        <ListGroup.Item>FirstName:  {items.firstName}</ListGroup.Item>
        <ListGroup.Item>LastName:  {items.lastName}</ListGroup.Item>
        <ListGroup.Item>Mobile Number:  {items.mobileNumber}</ListGroup.Item>
      </ListGroup>
    </>
  );
}
