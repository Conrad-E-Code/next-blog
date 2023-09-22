import EditorContainer from '@/components/EditorContainer'
import SignForm from '@/components/account/SignForm'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='bg-zinc-200 flex flex-col'>
      <SignForm />
    </div>
  )
}
