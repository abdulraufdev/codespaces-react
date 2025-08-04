import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Profile() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [label, setLabel] = useState('Edit profile')

  const { user } = useAuth();

  useEffect(()=> {
    const data = localStorage.getItem('user')
    if (data) {
      const profile = JSON.parse(data)
      setUsername(profile.username || '')
      setEmail(profile.email || '')
    }
  }, [])

  const saveChanges = async () => {
    if(label === 'Edit profile') {
      setLabel('Save changes')
    } else {
      if(username === '' || email === '') {
        alert('Please fill in all fields')
        return
      }
      if(!/^.+@.+\..+$/.test(email)) {
        alert('Please enter a valid email address')
        return
      }
      if(username === user.username && email === user.email) {
        alert('No changes made')
        setLabel('Edit profile')
        return
      }
      try {
        const userProfile = { username, email }
        await axios.put(`http://localhost:3000/api/user/${user.id}`, userProfile)
        localStorage.setItem('user', JSON.stringify(userProfile))
        setLabel('Edit profile')
      } catch (err) {
        console.error('Error saving profile:', err)
        alert('Failed to save changes. Please try again later.')
      }
    }
  }
  return (
    <div className=' p-8'>
      <h1 className='text-2xl font-bold text-center'>Profile Page</h1>
      <div className='mt-4'>
        <p className='text-lg'>Welcome to your profile!</p>
        <p className='text-gray-600'>Here you can view and edit your personal information.</p>
        <button className={`bg-black text-white rounded px-4 py-2 mt-4 hover:opacity-75 ${label === 'Save changes' ? 'bg-blue-500' : ''}`} onClick={saveChanges}>{label}</button>
        <div className={`mt-4 flex flex-col gap-y-2 ${label === 'Edit profile' ? 'pointer-events-none bg-gray-100 opacity-50': ''}`} >
          <label className='block text-gray-700'>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border-gray-300 border-2 rounded p-2 w-[30ch]'
          />
          <label className='block text-gray-700'>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-gray-300 border-2 rounded p-2 w-[30ch]'
          />
        </div>
      </div>
    </div>
  )
}

export default Profile