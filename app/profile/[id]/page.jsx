"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const UserProfile = ({params}) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get("name")
  console.log(params?.id)
  console.log(params.creator?.username)

  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);

    };
    
    if(params?.id) fetchUserPosts();
  
  }, [params.id]);
  
  return (
    <Profile 
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. You can explore and use ${userName}'s extraordinary prompts, or be inspired by the power of their imagination`}
      data={userPosts}
    />
  )
}

export default UserProfile