import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useAuthStore from '@/store/useAuthStore'
import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const [userPosts, setUserPosts] = useState([]);
     const { user, loading } = useAuthStore();
     const navigate = useNavigate()


       useEffect(() => {
    // Redirect if user is not logged in once loading is done
    if (!loading && !user) {
      navigate('/signup'); // or wherever your login page is
    }
  }, [loading, user, navigate]);


    useEffect(()=>{
        if (!user || loading) return; 
         const res =  axios.get(`https://codewala-backend.vercel.app/posts/profile/${user._id}`)
        .then((res) =>setUserPosts(res.data))
        .catch(err=> console.error("Error in getting post", err))
       
    },[user,loading])

    
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in to view this page.</p>;


    const delPost = async function (id) {
    
    try {
      const res = await axios.delete(`https://codewala-backend.vercel.app/api/posts/profile/${id}`)
      if(!res.data.success){
          toast.error("Error while deleting post")
          return;
      }
      toast.success("Post delete successfully")
      setTimeout(() => {
  window.location.reload();
}, 1000);
    } catch (error) {
      toast.error("Server Error")
      console.log("Internal Server Erorr", error)
    }
  }

  return (

      <div>
      <h2 className='text-center text-2xl font-medium mt-10'>Your Posts</h2>
      <hr className='mt-8' />
      <div className="min-h-[400px] grid sm:grid-cols-3 gap-4 p-12">
        {userPosts.length === 0 ? (
        <p className='text-center text-xl mt-12'>No posts yet.</p>
      ) : (userPosts.map((post) => (
        <Card key={post._id}>
            <CardHeader>
            <CardTitle className='text-2xl'>{post.title}</CardTitle>
            <CardDescription className='text-md'>{post.content}</CardDescription>
                                          
          <CardFooter className='flex items-center gap-2 justify-start'> <FaUser/> Created on:{' '}
            {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}</CardFooter>
          <CardContent>
          <Button  onClick={() => delPost(post._id)}
           variant="destructive">Delete</Button>
           </CardContent>
           </CardHeader>                                   
        </Card>
      )
      ))}
      </div>
    </div>
  )
}

export default ProfilePage