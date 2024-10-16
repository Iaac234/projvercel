import React from 'react'

export default function notFound() {
    return (
        <div className="h-screen max-w-[1000px] mx-auto flex flex-col justify-center gap-5 items-center relative">
            <div className="absolute h-full w-full top-0 right-0 flex justify-center items-center opacity-[0.2]">
                <h2 className="text-[250px] font-extrabold">404</h2>
            </div>
            <h1 className="text-4xl text-pri"><span className="text-5xl text-sec">WoW!</span> You found the door to
                great Nothing.</h1>
            <p className="text-md text-center">The page you're looking for is not found. It may have been moved or
                deleted, or there could be an error in the URL you entered. Please double-check the URL and try
                again.</p>
        </div>
    )
}
