import React, { useEffect } from 'react'
import { LoginForm } from '../components/login-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  useEffect(()=> {
    if (isAuthenticated) {
      navigate('/profile');
    }
  },[isAuthenticated, loading])
  return (
    <div className='bg-gray-100 grid place-content-center h-screen'>
      <div className='bg-white p-8 border-2 border-gray-300 rounded shadow-md w-96'>
        <h1 className='text-2xl font-bold text-center'>Login Page</h1>
        <LoginForm/>
        <Link to="/register" className='cursor-pointer text-center mt-4 block'>Don't have an account? Register here</Link>
      </div>
    </div>
  )
}

export default Login