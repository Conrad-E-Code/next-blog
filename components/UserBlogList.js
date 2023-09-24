"use client";
import React, { useContext } from 'react'
import { useEffect, useState} from 'react';
import Reader from './Reader';
import { useRouter } from 'next/navigation';
import { Context } from '@/context/Context';
const UserBlogList = ({session}) => {
    const router = useRouter()
    const {serverBlogs, setServerBlogs} = useContext(Context)
    useEffect(()=>{
        fetch("/api/user/blogs")
        .then(r => r.json())
        .then(data => {setServerBlogs(data)})
    },[])

  return (
    <div className='z-1'>
        {serverBlogs.map((blogObj)=>{
            // console.log(blogObj)
            return(
                <div>
                <Reader blog={blogObj}/>
                </div>

            )
        })}
    </div>
  )
}

export default UserBlogList

