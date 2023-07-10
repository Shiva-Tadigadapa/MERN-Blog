import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';






function Login() {

  // const cookies = new Cookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => { 
    event.preventDefault();
    console.log(name, email, password)
    try{
      const response=await axios.post('https://mern-blog-9lrx.vercel.app/api/signin',{name,email,password},{credentials:'include'})
      console.log(response.data)
    navigate('/home')

      // setCookie('access_token', response.data)
// 
   
localStorage.setItem('access_token', response.data)
const token = localStorage.getItem('access_token')

// const token = localStorage.getItem('access_token')
// console.log(token)
const config = {
  headers : {
    Authorization : `Bearer ${token}`
  
  }
}

axios.get('https://mern-blog-9lrx.vercel.app/api/profile',config)
.then(response=>{
  console.log(response)

}).catch(err=>{
  console.log(err)

})
navigate('/home')

    }
    catch(err){
      console.log(err)
    }
    
   
  };
  

 

  return (
    <form
    className='flex flex-col gap-4 w-8/12 mx-56'onSubmit={handleSubmit}
      >
      <TextField
        label="UserName"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
}

export default Login;