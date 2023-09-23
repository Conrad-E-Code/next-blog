"use client";
import React from 'react'
import { useEffect, useState} from 'react';
const UserBlogList = ({session}) => {
    const [serverBlogs, setServerBlogs] = useState([])
    useEffect(()=>{
        fetch("/api/user/blogs")
        .then(r => r.json())
        .then(data => {setServerBlogs(data)})
    },[])

  return (
    <div>
        {serverBlogs.map((blogObj)=>{
            return(
                <h1>{blogObj.title}</h1>
                // Edit buttons (PATCH REQ)
            )
        })}
    </div>
  )
}

export default UserBlogList

