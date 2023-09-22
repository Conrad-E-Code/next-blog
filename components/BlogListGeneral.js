"use client";
import React from 'react'
import { useEffect, useState } from 'react'
const BlogListGeneral = () => {
    const [serverBlogs, setServerBlogs] = useState([])
    useEffect(()=>{
        fetch("/api/blogs")
        .then(r => r.json())
        .then(data => {setServerBlogs(data)})
    },[])
  return (
    // add filter/search function
    <div>
        {serverBlogs.map((blog)=> {
        return (<div>{blog.title}</div>)
        })}

    </div>
  )
}

export default BlogListGeneral