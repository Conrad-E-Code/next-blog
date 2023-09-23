import React from 'react'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { NextAuthOptions } from '../api/auth/options'
import UserBlogList from '@/components/UserBlogList'

const page = async () => {
    const session = await getServerSession(NextAuthOptions)
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/blogs")
    }
    

  return (
    <div>
        <UserBlogList session={session} />
    </div>
  )
}

export default page