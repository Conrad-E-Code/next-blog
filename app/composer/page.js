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
  console.log(session)
  return (
    <div>
    <div className=''>
    Welcome! {session["user"]["name"]}
    </div>
        <EditorContainer userId={session["user"]["_id"]} />
    </div>
  )
}

export default page