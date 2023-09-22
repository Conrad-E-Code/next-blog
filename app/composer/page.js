import EditorContainer from '@/components/EditorContainer'
import React from 'react'
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "/app/api/auth/options";
import {redirect} from "next/navigation"
const page = async () => {
  const session = await getServerSession(NextAuthOptions);
  
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/composer")
  }
  return (
    <div>
    <div className=''>
    Welcome! {session["user"]["name"]}
    </div>
        <EditorContainer userEmail={session["user"]["email"]} />
    </div>
  )
}

export default page