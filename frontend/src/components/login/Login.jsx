import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios"
import { Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });
    const handleChange = (event) => {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (userLogin.email === "" || userLogin.password === "") {
            alert("Veuillez remplir les champs SVP !")
        } else {
          
            const res = await axios.post("http://localhost:3310/api/user/login", userLogin, { withCredentials: true })
            console.log(res)
            toast.success('Login successful!',{
              position: "top-right",
              autoClose: 800,
              onClose : ()=> {navigate("/profil")
              window.location.reload() }, 
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control value={userLogin.email} type="email" name="email" placeholder="Email" required="true"  onChange={handleChange}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control value={userLogin.password} type="password" name="password" placeholder="Mot  de passe"  required="true" onChange={handleChange} />
      </Form.Group>
      
      <div>
      <Button variant="primary" type="submit">
        Se Connecter
      </Button>
       <Button variant="warning" href='/register'>
       Créer un compte
      </Button> </div>
      
    </Form>
    <ToastContainer />
    </div>
  )
}

