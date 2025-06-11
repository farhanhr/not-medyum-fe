"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"
import React, { useState } from "react";

const FormSignIn = () => {
    const router = useRouter();

    return (
        <div className="w-full h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-96">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to Manage
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:mx-w-sm">
                    <Input type="email" placeholder="example@mail.com" name="email" required />
                    <Input type="password" placeholder="password" name="password" required />

                    <Button>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default FormSignIn;