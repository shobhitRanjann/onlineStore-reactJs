import React, { Component, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Carousel from 'react-bootstrap/Carousel'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import Moment from "react-moment";
import moment from 'moment';

export default function Orders() {
  // Constructor
  const [items, setItems] = useState([]);
  const [ordermessage, setOrdermessage] =  useState('');

  const Razorpay = useRazorpay();

  useEffect(() => {

    const username = sessionStorage.getItem('username')

    if(!username){
      console.log('noy')
      setOrdermessage('Please login to check your orders');
    }
    
    if(username !== null){
      console.log('this is not null', username)
      async function names() {
        const response = await createOrder({email:username});
        setItems(await response)
        console.log('this is item  >>',items)
      }names()
    }
  }, [setItems])

  async function createOrder(credentials) {
    const token = sessionStorage.getItem('accessToken')
    console.log('hello clicked', token);

    return fetch("http://localhost:9001/myorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }


  const history = useNavigate();
  
  const handleData = (data) => {
    console.log('dtaa ',data.item)
    history("/mobiles", {state: data.item});  
  }
  const cardHeader = {
    textAlign: "-webkit-center",
    margin: "10px 0px -6px 0px"
}
   const homeBody = {
     margin: "12px",
     minHeight: "100vh"
   }


    return (
      <>
        <h3 style={cardHeader}>My Orders</h3>
        <Row xs={1} md={4} className="g-4" style={homeBody}>
            {items.map((item) => {
              return (
              <Col key={item.id}>
                <Card>
                  <Carousel>
                    <Carousel.Item>
                      <Card.Img
                        variant="top" style={{height: "148px"}}
                        src={`http://localhost:9001${item.photosImagePath.split(",")[0]}`}
                      />
                    </Carousel.Item>
                  </Carousel>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description.substring(0,75)}...</Card.Text>
                  </Card.Body>
                </Card>
              </Col>)
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