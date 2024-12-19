import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-slate-800 py-1 flex flex-col text-white items-center w-full'>
            <div className="logo font-bold text-2xl flex">
                &lt;<img width={30} src="/password.png" alt="" /><span className='text-green-400 italic'>Pass</span>
                Op/&gt;
            </div>
            <div>
                Created with <span className='text-2xl'>❤</span> by CodeWithMoiz
            </div>
        </footer>
    )
}

export default Footer
