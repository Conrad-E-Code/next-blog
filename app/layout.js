import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from "/components/UI/NavBar"
import { ContextProvider } from '/context/Context'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog',
  description: 'Blogging front end',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ContextProvider>
      <body className={inter.className}>
      <NavBar/>
        {children}</body>
        </ContextProvider>
    </html>
  )
}
