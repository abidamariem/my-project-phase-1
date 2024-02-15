import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function NavBar({ user,handleResultSearch }) {
  const [search, setSearch]=useState("")
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await axios.get("http://localhost:3310/api/user/logout", {
      withCredentials: true,
    });
    navigate("/");
    window.location.reload();
  };
const handleSearche= async ()=>{
  const searchResualt = await axios.get("http://localhost:3310/api/book/search",{params:{q:search}}) 

  handleResultSearch(searchResualt.data)
  navigate("/search")
}
const handleChange=(event)=> { 
  event.preventDefault()
  setSearch(event.target.value)}
  return (
    <div>
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Books Exchange | Echanger vos livres gratuitement</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
             {user.isLoggedIn ? <>  <Nav.Link href="/profil">Profil</Nav.Link> </> : "" }
             {!user.isLoggedIn && <> <Nav.Link href="/login">Login</Nav.Link> </> }
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav> */}
          <Form className="d-flex" onSubmit={handleSearche} >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onKeyDown={handleSearche}            />
            <Button variant="outline-success" >Search</Button>
            
          </Form>
           <Nav className="ms-auto">
           {user.isLoggedIn ? <> 
           <Dropdown >
          <Dropdown.Toggle  variant="success" id="dropdown-autoclose-true" >
          {user.name} ({user.state})
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item  href="/profil">Mon porfil</Dropdown.Item>
        <Dropdown.Item href="/bookUser">Mes publications</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Se déconnecter</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>  
    </> :  <Button variant="secondary" href="/login">Se Connecter</Button>}
           
           </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  )
}
