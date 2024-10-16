import Link from 'next/link'
import React from 'react'
import { apiEndPoint } from '../required/comm'
import Bishwashi from './Bishwashi'

let search = ["motion", "infoSlide", "speaker_score", "side", "speaker_role", "debater", "tournament", "round", "genre"]
let stt = {
    "motion": "min-w-[200px]",
    "infoSlide": null,
    "speaker_score": null,
    "side": null,
    "speaker_role": "min-[10px]",
    "debater": null,
    "tournament": null,
    "round": null,
    "genre": null,
}

export default async function page({ params }) {
    let _data = await fetch(apiEndPoint + "/api/p/_")
    if (process.env.NEXT_IS_WAITING === "true") {
        _data = []
    } else {
        _data = await _data.json()
        _data = _data?.data || _data
    }
    return <>
        <div className="min-h-[100vh] border-t-[var(--secondary)] border-t">
            <Bishwashi />
            <div className="rounded-lg overflow-x-auto flex gap-2 flex-col justify-center">
                <table className="overflow-y-auto">
                    <thead>
                        <tr>
                            {search.map((_) =>
                                <th className={"text-center text-sm text-sec capitalize border bg-slate-100"}>{_}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {_data.map((item, ind) => {
                            let col = "bg-slate-100"
                            if (ind % 2 === 0) {
                                col = "bg-transparent"
                            }
                            let __long_text = `${item?.cont?.tt}${item?.id}`
                            let __render = search.map((_) => {
                                __long_text += (item?.cont?.[_] || "")
                                return <td className='border'>
                                    <Link href={`/p/${item?.id}`} className={`p-1 text-center block h-full text-[15px] ` + (stt[_] || "")}>
                                        {item?.cont?.[_] || "..."}
                                    </Link>
                                </td>
                            })
                            return <tr title={item?.cont?.tt} data-dfr={__long_text} className={`__ssr ${col} cursor-pointer hover:bg-[var(--item-view-hover)]`}>
                                {__render}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div >
        </div >
    </>
}