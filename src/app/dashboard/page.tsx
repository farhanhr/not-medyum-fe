"use client"

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const token = getCookie("accessToken");

        if (!token) {
            router.push("/login")
        }
    }, []);
  return (
    <div>
        <h1>Dashboard Admin</h1>
    </div>
  )
}

export default Dashboard