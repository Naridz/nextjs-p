"use client"

import React,{useState} from 'react'
import {useRouter} from 'next/navigation'

function Header() {

  const router = useRouter();
  const [poName , setPoName] = useState("")

  const handleSearch = (e)=>{
    setPoName(e.target.value)
  }

  const handleForm = (e)=>{
    e.preventDefault();
    router.push(`/searchname/${poName}`)
  }

  return (
    <header className='bg-gradient-to-r from-indigo-500 
    from-10% via-sky-500 via-30% to-emerald-500 to-90% h-[300px] flex justify-center items-center'>
        <div className='text-center'>
            <h1 className='text-5xl'>Pokemon With NextJs</h1>
            <p className='text-2xl'>Find Pokemon !</p>
            <form onSubmit={handleForm} className='flex mt-2'>
                <input 
                 type='text'
                 className='w-full rounded-md border-gray-300 px-3 py-2 text-gray-700 shadow-md'
                 placeholder='Search . . .'
                 onChange={handleSearch}
                />
                {poName?(
                  <button className='inline-flex items-center mx-2 px-4 py-2 bg-blue-800 text-white rounded-md shadow-md' type='submit'>Search</button>
                ):(
                  <button className='inline-flex items-center mx-2 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md' disabled type='submit'>Search</button>
                )}
            </form>
        </div>
    </header>
  )
}

export default Header