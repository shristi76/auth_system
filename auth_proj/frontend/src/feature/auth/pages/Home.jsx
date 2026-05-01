import React from 'react'
import { useauth } from '../hooks/useauth'
import { useNavigate } from 'react-router'
import './home.scss'

const Home = () => {
  const { user, handlelogout } = useauth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await handlelogout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return (
    <main>
      <div className="home">
        <h1>Welcome to Authentication system {user?.username} !</h1>
        <div className="logout-container">
          <button className='btn logout-btn' onClick={onLogout}>Logout</button>
        </div>
      </div>
    </main>
  )
}

export default Home
