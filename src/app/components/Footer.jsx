import React from 'react'
import { FaGithub } from 'react-icons/fa'

export default function Footer() {
    return (
     
            <footer className="bg-gray-900 text-white py-4 text-center ">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                    <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                    <a
                        href="https://github.com/YashwantBhole"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition duration-300 mt-2 md:mt-0"
                    >
                        <FaGithub size={20} />
                        <span className="text-sm">github.com/YashwantBhole</span>
                    </a>
                </div>
            </footer>

    
    )
}
