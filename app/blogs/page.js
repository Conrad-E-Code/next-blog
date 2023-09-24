import React from 'react'
// import { getServerSession } from 'next-auth/next'
// import { redirect } from 'next/navigation'
// import { NextAuthOptions } from '../api/auth/options'
import BlogListGeneral from '@/components/BlogListGeneral'

const page = async () => {
    // const session = await getServerSession(NextAuthOptions)
    // if (!session) {
    //     redirect("/api/auth/signin?callbackUrl=/blogs")
    // }
    

  return (
    <div className='h-[100vh]'>
        <BlogListGeneral />
    </div>
  )
}

export default page