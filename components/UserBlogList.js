"use client";
import React from 'react'
import { useEffect, useState} from 'react';
const UserBlogList = ({session}) => {
    const [serverBlogs, setServerBlogs] = useState([])
    useEffect(()=>{
        fetch("/api/blogs")
        .then(r => r.json())
        .then(data => {setServerBlogs(data)})
    },[])

  return (
    <div>UserBlogList
        {serverBlogs.map(()=>{
            return
        })}
    </div>
  )
}

export default UserBlogList

