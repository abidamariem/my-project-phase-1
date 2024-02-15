import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export default function Register() {
    const [userRegister, setUserRegister] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (event) => {
        setUserRegister({
            ...userRegister,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
       try {
        if (userRegister.name === "" || userRegister.email === "" || userRegister.password === "") {
            alert("plz add all filed")
        } else {
            const res = await axios.post("http://localhost:3310/api/user/register", userRegister)
            
                alert(res.status)
             
            alert(res.data.message)
            setUserRegister({
                name: "",
                email: "",
                password: ""
            })
        }
       } catch (error) {
        console.log(error.response.data.message)
        toast.error('Email existe déja !',{
          position: "top-right",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored"
          });
       }

    }
  return (
    <div class="w-75 ml-0 mr-0 mx-auto" >
       <Form onSubmit={handleSubmit}>
       <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Nom et Prénom</Form.Label>
        <Form.Control   value={userRegister.name}  placeholder="Nom et Prénom" name="name" required="true"   onChange={handleChange} />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control value={userRegister.email} type="email" name="email" placeholder="Email" required="true"  onChange={handleChange}  />

        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control value={userRegister.password} type="password" name="password" placeholder="Mot de passe" required="true"  onChange={handleChange}  />
        </Form.Group>
      </Row>


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <ToastContainer />
    </div>
  )
}
