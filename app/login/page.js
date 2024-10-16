"use client"

import Link from 'next/link'
import React, {useEffect} from 'react'
import {CiLock} from 'react-icons/ci'
import {GoPerson} from 'react-icons/go'
import {signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';


export default function page() {
    const {data} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (data?.user?.id && data?.user?.email) {
            router.push('/')
        }
    }, [data?.user?.id])

    return (<div className="h-screen w-full flex justify-center items-center">
        <form className="w-[90%] max-w-[400px] py-5 rounded-md" style={{
            boxShadow: "rgb(189, 189, 189, 0.5) 1px 3px 10px 5px"
        }} onSubmit={(event) => {
            event.preventDefault()
            let {username, password} = event.target.elements;

            if (!username?.value || !password?.value) {
                alert("Invalid Creds...")
                return
            }

            let __sess = signIn('credentials', {
                redirect: false, username: username?.value, password: password?.value,
            })

            __sess.then((res) => {
                if (res.ok) {
                    router.push('/')
                } else {
                    alert("Something goes wrong, Likely invalid credentials...")
                }
            })

            __sess.catch((err) => {
                alert("Something goes wrong! " + err)
            })

        }}>
            <div className="up p-3 flex justify-center items-center flex-col gap-2">
                <img src="/images/app_icon.png" alt="" className="h-[70px] my-5"/>
            </div>

            <div className="border items-center mx-5 p-2 flex my-5">
                <GoPerson size={25}/>
                <div className="h-[20px] bg-pri w-[1px] mx-2"></div>
                <input type="text" name="username" className="outline-none w-full text-lg"
                       placeholder="username..."/>
            </div>

            <div className="border items-center mx-5 p-2 flex mt-5">
                <CiLock size={25}/>
                <div className="h-[20px] bg-pri w-[1px] mx-2"></div>
                <input type="password" name="password" className="outline-none w-full text-lg"
                       placeholder="password..."/>
            </div>

            <div className="mx-5 p-2 relative h-[20px]">
                <Link href="#" className="absolute h-[20px] right-0 text-sec">Forget password?</Link>
            </div>

            <div className="items-center cursor-pointer rounded-md gap-2 mx-5 p-2 flex mt-10">
                <input type="checkbox" name="agree" id=""/>
                <p>Agree to <Link href="#" className="text-sec underline">Terms and Condition</Link>.</p>
            </div>

            <div className="border items-center cursor-pointer text-white rounded-md bg-pri mx-5 p-2 flex mt-5">
                <button className="w-full" type="submit">
                    Login
                </button>
            </div>
        </form>
    </div>)
}
