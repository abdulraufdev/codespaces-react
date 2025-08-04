import React from 'react'
import { RegisterForm } from '../components/register-form'
import { Link } from 'react-router-dom'
function Register() {
  return (
    <div className=' grid place-content-center h-screen'>
      <div className='bg-white p-8 border-2 border-gray-300 rounded shadow-md w-96'>
        <h1 className='text-2xl font-bold text-center'>Register Page</h1>
        <RegisterForm/>
        <Link to="/login" className='text-center mt-4 block'>
            Already have an account? <span className='text-blue-500'>Login here</span>
          </Link>
      </div>
    </div>
  )
}

export default Register