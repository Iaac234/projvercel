"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'

const _rg = createContext()

export default function Debite({ children }) {
    const [options, setoptions] = useState({ admin: false, viewAsAdmin: false })

    function setOption(data) {
        setoptions(data)
    }

    return <_rg.Provider value={{ options, setOption }}>
        <SessionProvider>
            {children}
        </SessionProvider>
    </_rg.Provider>
}

export const useDebite = () => useContext(_rg)
