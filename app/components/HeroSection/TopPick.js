import Link from 'next/link'
import React from 'react'
import EditPick from './EditPick'
import { apiEndPoint } from '@/app/required/comm';

export default async function TopPick() {
  let __list = []

  if (process.env.NEXT_IS_WAITING === "false") {
    __list = await fetch(apiEndPoint + "/api/fv")
    __list = await __list.json()
    __list = __list?.data?.__list || []
  }

  return (
    <div className="bg-white py-4 mb-[100px]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl flex-grow font-bold text-pri my-10 text-center">Top Pick</h3>
          <EditPick />
        </div>
        <div className="flex flex-wrap gap-[30px] justify-center">
          {__list.map(async (_) => {
            _ = await (await fetch(apiEndPoint + "/api/p/" + _)).json()
            _ = _?.data || {}
            return <Link style={{ boxShadow: "rgb(200, 200, 200) 0px 0px 10px 0px" }} className="overflow-hidden max-w-[250px] max-sm:max-w-[130px] max-md:max-w-[200px] w-[90%] flex flex-col min-h-[200px] rounded-lg min p-3" href={`p/` + _?.exp?.ur}>
              <img src={_?.cont?.tb || "/images/app_icon.png"} alt="" className="flex-grow h-[90px]" />
              <div className="h-[1px] border my-1"></div>
              <div className="l">
                <h4 className="font-semibold text-[15px] max-md:text-[12px] break-normal text-clip">{_?.cont?.tt?.substring(0, 75)}</h4>
                <span className='text-sec text-[12px] max-md:text-[10px]'>{_?.exp?.dt}</span>
              </div>
            </Link>
          })}
        </div>
      </div>
    </div>
  )
}
