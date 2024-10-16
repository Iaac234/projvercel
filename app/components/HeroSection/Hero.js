

import Link from 'next/link'
import React from 'react'

export default function Hero() {
    return <section className="h-[80vh] max-md:h-fit max-md:pb-0 flex-wrap items-center gap-5 p-10 flex justify-evenly">
        <div className="relative">
            <img className="w-[450px]" src="/images/middleIcon.jpg" alt="" />
        </div>
        <div className="r max-w-[700px] flex flex-col gap-4">
            <div className="relative">
                <h1 className="font-bold text-4xl max-md:text-3xl max-sm:text-xl">A library for high quality Parliamentary Debate transcripts with sub-par Analysis</h1>
            </div>
            <div className="relative">
                <p className="text-lg max-md:text-sm">Wondering how to actually get better at debate on your own? Click here and find out!</p>
            </div>
            <div className="flex gap-4">
                <Link href="/p" className="bg-sec text-white font-bold p-2 rounded-lg">View all</Link>
            </div>
        </div>
    </section>
}
