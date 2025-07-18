import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SignupPage() {

    const [name , setName] = useState('');
    const [password , setPassword] = useState('');
    const[role, setRole] = useState('')
    const[loading , setLoading] = useState(false)
        const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
    e.preventDefault();
           setError("");
    if (!name || !password || !role) {
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
            const res = await axios.post("https://codewala-backend.vercel.app/api/signup", 
            {name, password,role});
        if (res.data.success) {
            toast.success("Signup successful");
            navigate("/login");
        }
        else {
            toast.error("Invalid Credentials")
        }
        
    } catch (error){
  console.error("Error during signup:", error);

  if (error.response && error.response.status === 400) {
    // Server told us user already exists
    toast.error(error.response.data.message || "Invalid Creadentials");
    setError(error.response.data.message);
  } else {
    toast.error("Signup failed. Please try again later.");
    setError("Signup failed. Please try again.");
  }

  setLoading(false);
}
    }

  return (


   <>
   <div className=" flex justify-center items-center h-screen">

   <Card className=' p-8 rounded-lg shadow-lg sm:w-96 w-[80vw]'>

    <CardHeader className='text-center text-4xl font-semibold'>Signup</CardHeader>

   <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
    <label >Name</label>
    <Input type="text" placeholder="Name"  value={name} onChange={(e)=> setName(e.target.value)}/>

    <label >Password</label>
    <Input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)} />

    {/* <Input type="text" placeholder="What you do?" value={role} onChange={(e)=> setRole(e.target.value)} /> */}
     <label >Role</label>
   <Select onValueChange={(value) => setRole(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Developer">Developer</SelectItem>
        <SelectItem value="Learner">Learner</SelectItem>
        <SelectItem value="Working">Working</SelectItem>
        <SelectItem value="Teacher">Teacher</SelectItem>
      </SelectContent>
    </Select>
    <button type="submit" disabled={loading} 
    className="bg-lime-600 text-black px-4 py-2 rounded-md"
    >    {
                        loading ?
                           (
                                <>
                                <FaSpinner className='animate-spin' size={20} />Signing in...
                                </>
                            ) : (
                            "Signup"
                        )
                    }

    </button>
   </form>
   </Card>
   </div>
   </>
  )
}

export default SignupPage