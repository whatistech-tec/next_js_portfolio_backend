// pages/auth/signin.js

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function signin() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({email: '', password: '', confirmPassword: ''});
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
  
  
    },[]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try{
      const result= await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      })
      if (!result.error) {
        router.push('/')
      }else{
        setError('Invalid email or password');
        setTimeout(() =>{
          setError('');
        },4000);
      }

    }catch(error){

      setError('Sign In failed. Please try again');
        setTimeout(() =>{
          setError('');
        },4000);
    }finally{
      setLoading(false);
      setTimeout(() =>{
        setError('');
      },4000);
    }
    

    
  }
  
  return (
    <>
      <div className="flex flex-center full-h">
        
        <div className="loginform">
          <div className="heading">Login</div>
          <form onSubmit={handleSubmit} className="form">
            <input type="email" name="email" onChange={handleChange} className="input" placeholder="Enter Email Address"/>
            <input type="password" name="password" onChange={handleChange} className="input" placeholder="Enter Password"/>
            <button className="login-button" type="submit">Sign In</button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
