"use client"

import { useState, useEffect } from "react"

import Profile from "@components/Profile"

const UserProfile = ({params}) => {

  const [userPosts, setUserPosts] = useState([])
  const [userInfos, setUserInfos] = useState([])

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);

    };
    
    if(params?.id) fetchUserPosts();
  
  }, [params.id]);

  useEffect(() => {
    const fetchUserInfos = async () => {
      const response = await fetch(`/api/users/${params?.id}`);
      const data = await response.json();
      setUserInfos(data);
    };
    
    if(params?.id) fetchUserInfos();
  
  }, [params.id])
  
  const userName = userInfos[0]?.username

  return (
    <Profile 
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. You can explore and use ${userName}'s extraordinary prompts, or be inspired by the power of their imagination`}
      data={userPosts}
    />
  )
}

export default UserProfile