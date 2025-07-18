
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaSpinner } from "react-icons/fa";

import { Input } from '@/components/ui/input';
import { Card, CardHeader } from '@/components/ui/card';
import useAuthStore from '@/store/useAuthStore';


function LoginPage() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const setUser = useAuthStore(state => state.setUser);


    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError("");
        // Validate input
        
      
        if (!name || !password) {
            toast.error("Please fill all the fields");
            setLoading(false);
            return;
        }
          if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }
        try {
            const res = await axios.post("https://codewala-backend.vercel.app/api/login",
                 {name, password}, {withCredentials:true});
            if (res.data.success) {
                toast.success("Login successful");
                navigate("/");
                setUser(res.data.user)
            }
            else {
                toast.error("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Please try again.");
            setLoading(false);
            toast.error("Invalid Credentials. Please try again.");

        }
    }
  return (

    <div>
        <div className='flex justify-center items-center h-screen'>

        <Card className=' p-8 rounded-lg shadow-lg sm:w-96 w-[80vw]'>
                <CardHeader className='text-center text-3xl font-semibold'>Login</CardHeader>
            <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                <label> Name </label>
                <Input type="text" value={name} 
                placeholder="Enter your name" onChange={(e) => {
                    setName(e.target.value);
                }} />

                <label> Password</label>
                <Input type="text" placeholder="Enter your password"
                 value={password} onChange={(e) =>setPassword(e.target.value) }/>

            <button type="submit" disabled={loading} className={`bg-orange-500 rounded-md px-4 py-2 text-white active:bg-orange-700  flex justify-center items-center gap-2 ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}>
                {
                    loading ?
                       (
                            <>
                            <FaSpinner className='animate-spin' size={20} />Logging in...
                            </>
                        ) : (
                        "Login"
                    )
                }
                
                
                
                </button>
            </form>
        </Card>
    </div>

    </div>
  )
}

export default LoginPage