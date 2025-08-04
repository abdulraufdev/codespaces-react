import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(!email || !password){
      alert("All fields are required");
      return;
    }
    try {
      await login(email, password);
      alert("Login successful!");
      setEmail('');
      setPassword('');
      navigate('/profile');
      
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
    setLoading(false);
  }
    return (
        <form className='flex flex-col mt-4 gap-y-2' onSubmit={loginUser}>
          <label htmlFor="email">Username or Email</label>
          <input type="email" placeholder="Username or Email" className='mb-2 p-2 border-2 border-gray-300 rounded' value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" className='mb-2 p-2 border-2 border-gray-300 rounded' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link to="/forgot-password" className=' text-right mb-2'>Forgot Password?</Link>
          <button type='submit' className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:opacity-50' disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
    )
}