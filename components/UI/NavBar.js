"use client";
import React from 'react'
import {useRouter} from "next/navigation"
const NavBar = ({session}) => {
    const router = useRouter()
    const Navlist = ["Blogs", "Write", "Account"]

    const renderedLinks = Navlist.map((link)=>{
        function handleNavClick(link) {
            switch (link) {
                case "Blogs":
                    router.push(`/blogs`)  
                    break
                case "Write":
                    router.push("/composer")
                    break
                case "Account":
                    router.push("/dashboard")
                    break
            } 
        }
        return (
            <div onClick={() => {handleNavClick(link)}} className={`mx-auto px-4 py-2 bg-slate-500 rounded`} key={`nb-link-${link}`} >
                {link}
            </div>

        )
    })
  return (
    <div className='fixed top-0 left-0 w-full text-white flex font-bold bg-green-100 py-2 z-50'>
        {renderedLinks}</div>
  )
}

export default NavBar