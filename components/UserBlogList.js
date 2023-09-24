"use client";
import React from 'react'
import { useEffect, useState} from 'react';
import Reader from './Reader';
import { useRouter } from 'next/navigation';
const UserBlogList = ({session}) => {
    const router = useRouter()
    const [serverBlogs, setServerBlogs] = useState([])
    useEffect(()=>{
        fetch("/api/user/blogs")
        .then(r => r.json())
        .then(data => {setServerBlogs(data)})
    },[])

  return (
    <div>
        {serverBlogs.map((blogObj)=>{
            // console.log(blogObj)
            return(
                <div>
                <Reader blog={blogObj} />
                </div>

            )
        })}
    </div>
  )
}

export default UserBlogList

