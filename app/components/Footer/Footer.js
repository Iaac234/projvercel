import Link from 'next/link'
import React from 'react'
import { CiFacebook, CiLinkedin, CiMail, CiYoutube } from 'react-icons/ci'

export default function Footer() {
    return (
        <footer className="pt-12 mt-10 bg-gray-50" style={{ boxShadow: "rgb(204, 204, 204) 10px 0px 10px 0px" }}>
            <div className="flex items-center flex-col">

                <div className="link"><Link href="/" className="text-white text-2xl font-bold"><img src="/images/app_icon.png" className="h-[50px] max-md:h-[35px]" alt="" /></Link></div>

                <div className="desc max-w-[350px]"><p className="mt-2 text-lg text-center max-md:text-sm">Wondering how to actually get better at debate on your own?</p></div>

                <div className="social flex gap-3 mt-3 items-center">
                    <Link href="#"><CiFacebook size={30} /></Link>
                    <Link href="#"><CiYoutube size={30} /></Link>
                    <Link href="#"><CiLinkedin size={30} /></Link>
                    <Link href="#"><CiMail size={30} /></Link>
                </div>
            </div>
            <div className="bg-[#f0f0f0]">
                <div className="flex mt-3 max-md:pb-3 mx-auto w-[90%] max-w-[1500px] justify-between max-md:flex-col max-md:items-center">
                    <div className="stamp py-2 items-center flex gap-2">
                        <p className="text-lg max-md:text-sm">Copyright © 2024</p>
                        <div className="h-[20px] w-[1px] bg-[#000]"></div>
                        <p className="text-lg max-md:text-sm">
                            <span className="text-sec">DeBite</span>
                        </p>
                    </div>
                    <div className="links flex gap-3 items-center">
                        <Link href="/" className="text-[15px] max-md:text-[12px]">
                            Home
                        </Link>
                        <Link href="/p" className="text-[15px] max-md:text-[12px]">
                            View all
                        </Link>
                        <Link href="/tac" className="text-[15px] max-md:text-[12px]">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
