"use client"

import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import { CiSearch, CiUser } from "react-icons/ci";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
// import { RiAdminFill, RiAdminLine } from "react-icons/ri";
import { useEffect } from 'react';
import { useDebite } from '@/app/Hooks/Debite';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const { data, status } = useSession();
    const { options, setOption } = useDebite()
    const [argvs, setArgvs] = useState({})
    const router = useRouter()


    useEffect(() => {
        if (data?.user) {
            setOption(prev => ({ ...prev, admin: (data?.user?.role === "admin") }))
        }
    }, [data?.user?.id])

    function handelSubmit(e) {
        e.preventDefault()
        if (!e.target.q.value) return
        setArgvs({ ...argvs, search: false })
        router.push(`/p?q=${e.target.q.value}`)
    }

    return (
        <header className="w-full bg-gray-50 relative shadow-md z-10">
            <nav className="p-3 gap-2 flex mx-5 items-center justify-between">
                <Link href="/" className="l">
                    <img src="/images/app_icon.png" alt="" className="h-[40px]" />
                </Link>
                <form className="m p-1 max-md:hidden flex-grow px-2 flex justify-between items-center border bg-[#f2f2f2] rounded-lg max-w-[800px]" onSubmit={handelSubmit}>
                    <GoSearch size={20} />
                    <div className="line mx-[10px] h-[20px] w-[1px] bg-[#b5b5b5]"></div>
                    <input type="search" name='q' required className="outline-none border-none bg-[#f2f2f2] py-1 text-lg w-full" placeholder="Search for transcript, docs, on Debite" />
                </form>
                <div className="r flex justify-center items-center gap-4">
                    <div className="links max-sm:hidden flex gap-3 items-center">
                        <Link href="/" className="text-[17px]">
                            Home
                        </Link>
                        <Link href="/p" className="text-[17px]">
                            View all
                        </Link>
                        {/* {options?.admin && <RiAdminLine onClick={() => { setOption({ ...options, viewAsAdmin: !options?.viewAsAdmin }) }} title='View As Admin' className={`cursor-pointer ${options?.viewAsAdmin && "bg-slate-300"} border p-1 rounded-lg border-[var(--primary)]`} size={28} />} */}
                    </div>
                    <div className="border p-1 md:hidden rounded-lg" onClick={() => setArgvs({ ...argvs, search: !argvs?.search })}>
                        <CiSearch size={20} />
                    </div>
                    <Link className="border p-1 rounded-lg" href={((status === "loading") ? "#" : (!data?.user?.id ? "/login" : "/u/cre?admin=true&editx=JhbGsn76"))}>
                        {!data?.user?.image ? <CiUser size={20} /> : <>
                            <img src={data?.user?.image} />
                        </>}
                    </Link>
                </div>
            </nav>
            {argvs?.search && <div className='absolute z-10 flex top-0 right-0 h-screen w-screen' onClick={(e) => {
                if (!document.querySelector(".__searcher")?.contains(e.target)) {
                    setArgvs({ ...argvs, search: !argvs?.search })
                }
            }}>
                <form className="__searcher max-w-[500px] mt-[70px] mx-auto shadow-md rounded-md border h-14 w-[90%] bg-[var(--background)]" onSubmit={handelSubmit}>
                    <input type="search" name='q' placeholder='Search for transcript, docs, on Debite' required className="rounded-md outline-none border-none h-full w-full p-1" />
                </form>
            </div>}
        </header >
    )
}
