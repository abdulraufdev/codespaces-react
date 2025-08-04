import React, { useState } from 'react';
import { api } from '../contexts/AuthContext';

export function ForgetPasswordForm() {
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState('');

  const validateEmail = () => {
    return /^.+@.+\..+$/.test(email);
  };

  const handleForgotPassword = async () => {
    const valid = validateEmail();
    if(!valid){
      setIsError("Please enter a valid email address");
      return;
    }
    try {
      await api.post('/auth/forgot-password', { email });
    setEmail('');
    setIsError('');
    alert('If this email is registered, a password reset link has been sent.');
    } catch (error) {
      console.error("Error sending reset password email:", error);
      setIsError("Failed to send reset password email. Please try again.");
    }
  }
  return (
    <form className='flex flex-col mt-4 gap-y-2' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="email">Email:</label>
      <input type="email" placeholder="Enter your email" className='mb-2 p-2 border-2 border-gray-300 rounded' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      {isError && <p className='text-red-500 text-xs'>{isError}</p>}
      <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:opacity-50'>
        Reset Password
      </button>
    </form>
  );
}
