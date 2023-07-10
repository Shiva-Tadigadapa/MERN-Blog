import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import {auth, provider} from '../../firebase'
import {signInWithPopup} from 'firebase/auth'
function Register() {
  const [email, setEmail] = useState('');
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
 const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(username, email, password)
    dispatch(loginStart())
    try{
      const res= await axios.post('https://mern-blog-9lrx.vercel.app/api/signup',{name,email,password})
      console.log(res)
       alert('User Created')
    }
    catch(err){
      dispatch(loginFailure());
      console.log(err)
    }

  };

 const singinwithgoogle = async () => {
  // dispatch(loginStart())
 try{

   signInWithPopup(auth, provider)
   .then((result) => {
     console.log(result)
    })
  }
  catch(err){
    console.log(err)
  }
}




  return (
    <>
    <form className='flex flex-col w-8/12 mx-56 gap-4' onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Username"
        variant="outlined"
        type="name"
        value={name}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      
      <Button type="submit" variant="contained">
        Register
      </Button>
      
    
    </form>
    <Button type="submit" onClick={singinwithgoogle} style={{marginLeft:"500px",marginTop:"50px"}}  variant="contained" className='ml-[100px] bg-white/60 text-black/60'>
    Register with google
  </Button>
  </>
  );
}

export default Register;