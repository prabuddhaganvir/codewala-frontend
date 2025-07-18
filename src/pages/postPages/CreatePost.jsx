
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useAuthStore from "@/store/useAuthStore"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function CreatePost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const [loadingx, setLoadingx] = useState(false);
  const navigate = useNavigate()

  const { user, loading, fetchUser } = useAuthStore();

    useEffect(() => {
    if (!user && !loading) {
      navigate("/signup");
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;


  const handleSubmit = async (e) => {
     setLoadingx(true)
    e.preventDefault();
     setError('')

     if (!title || !content) {
      toast.error("All Fields are required")
      setLoadingx(false);
      return;
     }

     try {
       const res = await axios.post("http://localhost:3000/api/posts",
         {title, content}, {withCredentials:true})

       if (res.data.success) {
        toast.success("Post Successfully")
        navigate('/')
        console.log("error while posting blog", error);
        
       }else{
        console.log(error, "error while posting")
       }
      
     } catch (error) {
      toast.error("Failed to Post, try again later ")
      console.log("Internal server Error",error)
      
     }

  }
  return ( 

    <div className="flex justify-center items-center mt-20 ">
     
      <form onSubmit={handleSubmit}>
        <div className="w-[500px] flex gap-4 flex-col">
        <label className="text-xl">Title</label>
        <Input type="text" value={title} placeholder="Enter title of blog" onChange={(e)=> setTitle(e.target.value)} />

        <label className="text-xl">Description</label>
        <Textarea type="text"  value={content}  placeholder="Description" onChange={(e)=> setContent(e.target.value)}/>

        <button className="bg-blue-600 py-2 px-4 rounded-md" type="submit"> Post</button>
        </div>
      </form>
     
    </div>
  )
}

export default CreatePost