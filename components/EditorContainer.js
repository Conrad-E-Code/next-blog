// Dont client here because of weird error
import React from 'react'
import Editor from './Editor'
import { getServerSession } from 'next-auth/next';
import { NextAuthOptions } from "../app/api/auth/options"
const EditorContainer = async () => {
   const session = await getServerSession(NextAuthOptions)
   if (!session) {
    return (<div>Not Authorized</div>)
   }
   else return (
    <div className='justify-center text-center bg-blue-600'>
    <Editor />

    
  </div>  )
}

export default EditorContainer