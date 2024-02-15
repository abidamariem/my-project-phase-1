import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/navbar/Navbar';
import Login  from './components/login/Login';
import Profil from './components/profil/Profil';
import Register from './components/register/Register';
import ListBook from './components/book/ListBook';
import ListBookUser from './components/book/ListBookUser';
import Search from './components/navbar/SearchList';
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [user, setUser] = useState({});
  //use state result search
const [resSearch,setResSearch]=useState([])
  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const result = await axios.get("http://localhost:3310/api/user/me", { withCredentials: true })
        setUser(result.data)
      } catch (error) {
        setUser(error.response.data)
      }

    }
    verifyLogin()
  }, [setUser])
  //handle result state
  const handleResultSearch= async (data)=>{
    setResSearch(data)
  }
console.log(resSearch)
  return (
    <>
    <NavBar handleResultSearch={handleResultSearch}
user={user}/>
    <Routes>
        <Route path='/profil' element={<Profil user={user} />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} /> 
        <Route path='/' element={<ListBook />} />
        <Route path='/bookUser' element={<ListBookUser />} />
        <Route path='/search' element={<Search resSearch={resSearch} />} />
      </Routes>
    
    
  </>
  );
}

export default App;
