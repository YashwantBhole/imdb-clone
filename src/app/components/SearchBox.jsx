'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBox() {
    
    const router = useRouter();
    const [search, setSearch] = useState('')
    
    const handleSubmit =(e) =>{
      e.preventDefault();
      router.push(`/search/${search}`)
    }

  return (
    <form className='flex justify-between px-5 mx-auto max-w-6xl' onSubmit={handleSubmit}>
      <input type='text' placeholder='search keyword' 
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className='w-full h-14 rounded-md placeholder-gray-500 outline-none bg-transparent flex-1'/>
      <button className='text-amber-600 cursor-pointer  disabled:text-gray-500' disabled={!search}>Search</button>
    </form>
  )
}
