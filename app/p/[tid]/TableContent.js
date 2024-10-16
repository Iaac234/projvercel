"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CiEdit, CiTrash } from 'react-icons/ci'
import "./style.css"

export default function TableContent({ tid }) {
  const [dirs, setDirs] = useState([])
  const [options, setOptions] = useState({});
  const { data } = useSession()
  const router = useRouter()

  function generateTable(element, _arr = []) {
    let __heading = ["h2", "h3", "h4", "h5", "h6"].includes(element.tagName?.toLowerCase())

    if (__heading) {
      element.id = `${element.tagName?.toLowerCase()}.${_arr.length}`
      _arr.push({ [element.id]: element.innerText })
    }

    element.childNodes.forEach((child) => {
      if (child.nodeType === 1) {
        let _rt = generateTable(child, _arr)
        if (_rt && __heading) {
          _arr = [..._arr, ..._rt]
        }
      }
    });

    return _arr
  }

  useEffect(() => {
    let entireDoc = document.querySelector(".__cont")
    let _table = generateTable(entireDoc)
    setDirs(_table)
  }, [])

  return (
    <>
      {data?.user?.role === "admin" && <div className='mb-8 w-fit mx-auto gap-1 flex items-center p-1 border'>
        <p className='text-sm text-sec'>Admin Only</p>
        <p>--</p>
        <CiEdit onClick={() => {
          router.push(`/u/${tid}?admin=true&editx=6yHbsbJ8`)
        }} size={35} className='border p-1 cursor-pointer' />
        <CiTrash onClick={() => {
          setOptions({ ...options, del: true })
        }} size={35} className='border p-1 cursor-pointer' />
      </div>}
      {options?.del && <div className='fixed top-0 backdrop-blur-sm right-0 h-full w-full flex justify-center items-center'>
        <div className="max-w-[700px] w-[300px] shadow-xl border rounded-lg p-2 bg-[var(--background)]">
          <h3 className='text-2xl text-center'>Delete?</h3>
          <p>The action can't be reversed.</p>
          <div className="flex gap-1 my-2">
            <button className='p-1 bg-pri text-[white] w-[100%]' onClick={() => setOptions({ ...options, del: false })}>Cancel</button>
            <button className='p-1 bg-sec text-[white] w-[100%]' onClick={() => {
              if (options?.preDel) return
              setOptions({ ...options, preDel: true })
              fetch(`/api/p/${tid}`, {
                method: 'DELETE',
              }).then(() => {
                router.push("/p")
              })
            }}>{options?.preDel ? "Deleting..." : "Delete"}</button>
          </div>
        </div>
      </div>}
      {!!dirs?.length && <div className="mb-8 border p-2">
        <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
        <div className="flex flex-col">
          {dirs.map((dir) => {
            let _d = Object.keys(dir)[0]
            let ml = 0
            try {
              ml = parseInt(_d.charAt(1))
            } catch { }
            return <li style={{
              marginLeft: ml * 10,
            }}>
              <Link className={`capitalize text-sec`} href={"#" + _d}>{dir[_d]}</Link>
            </li>
          })}
        </div>
      </div>}
    </>
  )
}
