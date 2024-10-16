"use client"

import { useDebite } from '@/app/Hooks/Debite'
import React, { useEffect, useRef, useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import { CiEdit } from 'react-icons/ci'

export default function EditPick() {
  const [argvs, setargvs] = useState({})
  const { options } = useDebite()
  const __lists = useRef(null)

  return options?.admin && <>
    <div onClick={() => {
      setargvs({ ...argvs, showUpload: true })
    }} className='border cursor-pointer flex gap-2 items-center rounded-md p-2'>
      <CiEdit className='' size={24}></CiEdit>
      <div className="h-[20px] border"></div>
      <span>Edit</span>
    </div>

    {argvs?.showUpload && <div onClick={(e) => {
      if (!document.querySelector(".__lister").contains(e.target)) {
        setargvs({ ...argvs, showUpload: false })
      }
    }} className="fixed flex backdrop-blur-sm justify-center items-center top-0 right-0 h-full w-full">
      <div className="__lister max-w-[600px] w-[90%] bg-white shadow-lg border rounded-lg">
        <div className="flex p-1 justify-between items-center">
          <h2 className='font-bold text-xl'>Edit Top Picks</h2>
          <div onClick={() => {
            if (argvs?.upload) return

            let sep = __lists.current.value?.split(/[,|\n]+/).map(item => item.trim()).filter(item => item !== '')
            if (sep?.length && sep?.length < 5) {
              alert("Add at least 5 items in Top Picks.")
              return
            }
            let brk = !sep?.length
            sep?.map((_) => {
              if (_.length !== 15 || !_?.includes("_kr")) {
                brk = true
                alert("Invalid ID -> '" + _ + "'")
              }
            })
            if (brk) return
            fetch("/api/fv", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                l: sep
              })
            }).then((_) => {
              if (_.ok) {
                setargvs({ ...argvs, upload: false, showUpload: false })
              }
            })
          }} className='border flex gap-2 items-center rounded-md p-2'>
            <BiUpload className='' size={24} />
            <span>{argvs?.upload ? 'Uploading...' : 'Upload'}</span>
          </div>
        </div>
        <textarea ref={__lists} placeholder='Please insert the URLs of your items, each seperated with comma or new line, in the order you want them to be displayed.' className='h-full w-full outline-none border p-1 min-h-[250px]'></textarea>
      </div>
    </div>}
  </>
}
