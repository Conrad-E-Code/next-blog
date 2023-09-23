"use client";
import React from 'react'
import { useEffect, useState } from 'react'
import Reader from './Reader';
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
        {serverBlogs.length > 0 ? serverBlogs.map((blog)=> {
        return (<Reader blog={blog} />)
        }): null}


    </div>
  )
}

export default BlogListGeneral