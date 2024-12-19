import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white px-4 py-3 flex justify-around items-center shadow-[0_35px_60px_-15px_rgba(21,128,61,0.3)]'>
            <div className="logo font-bold text-2xl flex">&lt;<img width={40} src="/password.png" alt="" /><span className='text-green-400 italic'>Pass</span>Op/&gt;</div>
            {/* <ul className='flex gap-4 font-medium'>
                <li className='hover:font-bold'>
                    <a href="/">Home</a>
                </li>
                <li className='hover:font-bold'>
                    <a href="/">About</a>
                </li>
                <li className='hover:font-bold'>
                    <a href="/">Contact</a>
                </li>
            </ul> */}
            <a href="https://www.github.com" target='_blank' className='flex gap-2 items-center p-1 px-2 rounded-full bg-[#2d40a8] ring-white ring-1'>
               
                    <img className='w-8 invert' src="src/assets/github.svg" alt="" />
                    Github
               
            </a>
        </nav>
    )
}

export default Navbar
