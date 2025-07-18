import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Hero from "@/components/Hero";
import { FaUser } from "react-icons/fa";

function HomePage() {
    const[blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    
  useEffect(() => {
    const res =  axios.get("https://codewala-backend.vercel.app/api/posts")
      .then((res) => setBlogs(res.data.posts))
      .catch((err) => {
        console.error(err);
        setError("Failed to load blogs.");
        toast.error("Failed to load blogs.");
      });
  }, []);


  return (
    <>
     <Hero />
    <div className=" min-h-screen">
      <h1 className="text-center sm:text-3xl text-4xl mt-10 font-light">Recent Blogs</h1>
        <div className="min-h-[400px] grid sm:grid-cols-3 gap-4 sm:p-12 p-4">
                        {
                          blogs.map((blog)=>(
                                <Card>
                                <CardHeader>
                                    <CardTitle className='text-2xl'>{blog.title}</CardTitle>
                                    <CardDescription className='text-md'>{blog.content}</CardDescription>
                                   
                                    <CardFooter className='flex items-center gap-2 justify-start'> <FaUser/>@{blog.author.name}</CardFooter>
                                 
                                    <CardContent>
                                          Created on:{' '}
                                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })}
                                    </CardContent>
                                </CardHeader>                                   
                                </Card>

                              ))
                        }
        </div>

    </div>
      
      
  </>
  )
}

export default HomePage