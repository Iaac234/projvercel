"use client"

// import React from 'react'
// import { BiPencil } from 'react-icons/bi'
// import { IoImage } from 'react-icons/io5'

// export default function Editor({ style, edits, uploadSource }) {
//     let def_edits = {
//         "text": <>
//             <BiPencil size={23} />
//         </>,
//         "img": <>
//             <IoImage size={23}/>
//         </>,
//     }

//     return (
//         <div className='absolute bottom-2 flex items-center gap-1 border rounded-md bg-white p-1 border-[var(--primary)] bg-[var(--background)] right-2' style={style}>
//             {edits.map((_) => {
//                 if (!def_edits?.[_] || !uploadSource?.[_]) {
//                     return
//                 }
//                 return <>{def_edits?.[_]}</>
//             })}
//         </div>
//     )
// }


import React from 'react'

export default function Editor() {
  return (
    <div></div>
  )
}
