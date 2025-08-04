import React, { FormEvent, useState } from 'react';
import { api, useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string}>({});

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!/^.+@.+\..+$/.test(email)) newErrors.email = "Email is not valid";
    if (!/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return newErrors;
  }

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }
    try {
      await register(username, email, password);
      console.log('Registration successful!');
      setUsername('');
      setEmail('');
      setPassword('');
      navigate('/profile');
    } catch (error) {
      console.error("Registration failed:", error);
      errors.catch = "Registration failed. Please try again.";
      setErrors(errors);
    }
    setLoading(false);
  }
    return (
        <form className='flex flex-col mt-4 gap-y-2' onSubmit={registerUser}>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="Username" className='mb-2 p-2 border-2 border-gray-300 rounded' value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.all && <p className='text-red-500 text-xs'>{errors.all}</p>}
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Email" className='mb-2 p-2 border-2 border-gray-300 rounded' value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="Password" minLength={8} className='mb-2 p-2 border-2 border-gray-300 rounded' value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className='text-red-500 text-xs'>{errors.password}</p>}
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:opacity-50' disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {errors.catch && <p className='text-red-500 text-xs'>{errors.catch}</p>}
        </form>
    )
}