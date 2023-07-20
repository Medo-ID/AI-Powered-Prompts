"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session} = useSession()
  const pathName = usePathname()
  const router = useRouter()
  
  const [copied, setCopied] = useState("")
  
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000);
  }
  
  const user_Profile_Path = session?.user.id !== post.creator?._id ? `/profile/${post.creator?._id}` : '/profile'

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          
          <Image 
            src={post.creator?.image}
            alt="user-picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onClick={() => router.push(user_Profile_Path)}
          />
          
          <div className="flex flex-col">
            <h3 
              className="font-satoshi font-semibold text-gray-600"
              onClick={() => router.push(user_Profile_Path)}
            >
              {post.creator?.username}
            </h3>
            <p
              className="font-inter text-sm text-gray-500"
              onClick={() => router.push(user_Profile_Path)}
            >
              {post.creator?.email}
            </p>
          </div>

        </div>
          
        <div 
          className="copy_btn"
          onClick={handleCopy}
        >
          <Image 
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt="copy-icon"
          />
        </div>
      
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-600">{post.prompt}</p>        
      <p 
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator?._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
          
          <p 
            className="font-inter text-sm text-green-500 cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          
          <p 
            className="font-inter text-sm text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        
        </div>
      )}    

    </div>
  )
}

export default PromptCard