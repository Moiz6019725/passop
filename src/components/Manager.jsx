import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordsList, setPasswordList] = useState([])
    const passFieldRef = useRef()
    const passShowBtnRef = useRef()
    const iconRef1 = useRef()
    const iconRef2 = useRef()
    const iconRef3 = useRef()

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordList(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('✔️ Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })
        navigator.clipboard.writeText(text)
    }


    const showPassword = (e) => {
        if (passFieldRef.current.type === "password") {
            passFieldRef.current.type = "text";
            passShowBtnRef.current.src = "src/assets/visibility-none.svg"
        } else {
            passFieldRef.current.type = "password";
            passShowBtnRef.current.src = "src/assets/visibility.svg"
        }
    }
    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordList([...passwordsList, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordsList, { ...form, id: uuidv4() }]))
            setForm({ site: "", username: "", password: "" })
            toast.success('Password saved!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            toast("Error: Fields can't be null")
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const deletePassword = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            setPasswordList(passwordsList.filter(item => item.id != id))
            localStorage.setItem("passwords", passwordsList.filter(item => item.id != id))
            toast.info('Deleted successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    const editPassword = (id) => {
        setForm(passwordsList.filter(item => item.id === id)[0])
        setPasswordList(passwordsList.filter(item => item.id != id))
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 "></div>
            <div className='px-1 md:mycontainer mx-auto min-h-[77.6vh]'>
                <h1 className='text-3xl font-bold text-center'>
                    <div className="logo font-bold text-2xl flex justify-center">&lt;<img width={30} src="/password.png" alt="" /><span className='text-green-400 italic'>Pass</span>Op/&gt;</div>
                </h1>
                <p className='text-green-600 text-center font-normal text-lg'>Your own Password Manager</p>
                <div className='text-black flex flex-col p-4 gap-2 items-center'>
                    <input placeholder='Enter website URL' id='site' name='site' value={form.site} onChange={handleChange} className='rounded-2xl border border-green-500 w-full px-4 py-[2px]' type="text" />
                    <div className='flex flex-col md:flex-row w-full gap-2 md:gap-5'>
                        <input placeholder='Enter Username' id='username' name='username' value={form.username} onChange={handleChange} className='rounded-2xl border border-green-500 w-full px-4 py-[2px]' type="text" />
                        <div className='relative'>
                            <input onKeyUp={(e)=>{
                                 if (e.key === "Enter") {
                                    // Cancel the default action, if needed
                                    savePassword()
                                  }
                            }} placeholder='Enter Password' id='password' name='password' value={form.password} onChange={handleChange} className='rounded-2xl border border-green-500 w-full px-4 py-[2px]' type="password" ref={passFieldRef} />
                            <button onClick={showPassword} className='absolute right-1 top-1'>
                                <img ref={passShowBtnRef} src="src/assets/visibility.svg" alt="" />
                            </button>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center text-sm rounded-full py-1 px-4 w-fit bg-green-400 hover:bg-green-500 gap-2 border border-green-900'>
                        Save Password
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "width": "20px", "height": "20px" }}>
                        </lord-icon>
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='text-xl font-bold pb-2'>Your Passwords</h2>
                    {passwordsList.length === 0 && <div>No passwords to show</div>}
                    {passwordsList.length != 0 && <table className="table-fixed w-full text-center rounded-md overflow-hidden">
                        <thead className='bg-green-400 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordsList.map((item, index) => {
                                return <tr key={index}>
                                    <td className='border border-white'>
                                        <div className='flex justify-center items-center gap-1'>
                                            <a className='w-4/5 overflow-hidden text-ellipsis' href={item.site} target='_blank'>{item.site}</a>
                                            <div className='w-5 cursor-pointer hover:animate-[wiggle_1s_ease-in-out]' onClick={() => {
                                                copyText(item.site)
                                            }}>
                                                <img src="src/assets/copy.svg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='border border-white'>
                                        <div className='flex justify-center items-center gap-1'>
                                            {item.username}
                                            <div className='w-5 cursor-pointer hover:animate-[wiggle_1s_ease-in-out]' onClick={() => {
                                                copyText(item.username)
                                            }}>
                                                <img src="src/assets/copy.svg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='border border-white'>
                                        <div className='flex justify-center items-center gap-1'>
                                            {item.password}
                                            <div className='w-5 cursor-pointer hover:animate-[wiggle_1s_ease-in-out]' onClick={() => {
                                                copyText(item.password)
                                            }}>
                                                <img src="src/assets/copy.svg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='border border-white '>
                                        <div className='flex justify-center items-center gap-2'>
                                            <span className='cursor-pointer hover:animate-[wiggle_1s_ease-in-out]' onClick={() => {
                                                editPassword(item.id)
                                            }}>
                                                <img src="src/assets/edit.svg" alt="" />
                                            </span>
                                            <span className='cursor-pointer' onClick={() => {
                                                deletePassword(item.id)
                                            }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
