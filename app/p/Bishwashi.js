"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";

export function Bishwashi() {
  const param = useSearchParams()
  const redirect = useRouter()

  useEffect(() => {
    let _get = param.get("q")
    let _ele = document.querySelectorAll(".__ssr[data-dfr]")
    !!_get && (document.title = `${param.get("q")} - Debite`)
    _ele.forEach((e) => {
      if (!e.getAttribute("data-dfr")?.toLowerCase()?.includes(param.get("q")?.toLowerCase()) && _get) {
        e.style.display = "none"
      } else {
        e.style.display = null
      }
    })
  }, [param.get("q")])

  return !!param.get("q") && <div className='my-5'>
    <div className="mx-8 flex justify-between">
      <h2 className='font-bold text-pri text-xl'>Result for:- <span className='text-sec'>{param.get("q")}</span></h2>
      <div className="border cursor-pointer flex-wrap p-2 flex items-center gap-2 rounded-md" onClick={() => {
        redirect.push("/p")
      }}>
        <RxCross2 />
        <div className="h-full border"></div>
        <span>Clear Filter</span>
      </div>
    </div>
  </div>
}


export default function Bish() {
  return <Suspense>
    <Bishwashi />
  </Suspense>
}