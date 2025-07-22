
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import HomePage from './components/HomePage';
import SignupPage from './pages/authPages/SignupPage';
import LoginPage from './pages/authPages/LoginPage';
import CreatePost from './pages/postPages/CreatePost';
import ProfilePage from './pages/dashboard/ProfilePage';
import useAuthStore from './store/useAuthStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIhelper from './components/AIhelper';





function App() {

  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // fetch logged-in user on app load
  }, []);

  return (
    <>
    <Navbar />

      <Routes >
        <Route  path="/" element={<HomePage />} />
        <Route  path="/signup" element={<SignupPage />} />
        <Route  path="/login" element={<LoginPage />} />
        <Route  path="/create" element={<CreatePost />} />
        <Route  path="/profile" element={<ProfilePage />} />
      </Routes>
      <AIhelper />
       <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
       <Footer />

    </>
  )
}

export default App
