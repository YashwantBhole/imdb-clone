import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from 'react-icons/bs'
import MenuItem from './MenuItem'
import Link from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';

export default function Header() {
    return (
        <div className='flex justify-between items-center p-3 max-w-8xl mx-auto'>
            <div className='flex gap-6'>
                <MenuItem title="home" address="/" Icon={AiFillHome} />
                <MenuItem title="about" address="/about" Icon={BsFillInfoCircleFill} />
            </div>

            <div className='flex items-center gap-4'>
           <DarkModeSwitch/>
                <Link href={'/'} className='flex gap-1 items-center ml-2'>
                    <span className='text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg'>IMDB</span>
                    <span className='text-xl hidden font-bold sm:inline'> Clone</span>
                </Link>
            </div>
        </div>
    )
}
