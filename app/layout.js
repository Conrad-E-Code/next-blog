import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from "/components/UI/NavBar"
import { ContextProvider } from '/context/Context'
import { getServerSession } from 'next-auth/next'
import { NextAuthOptions } from './api/auth/options'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog',
  description: 'Blogging front end',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(NextAuthOptions)
  return (
    <html lang="en">
      <ContextProvider>
      <body className={inter.className}>
      <NavBar session={session}/>
        {children}</body>
        </ContextProvider>
    </html>
  )
}
