"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { formSchema } from "./validation";

const SubmitButton = () => {
    const {pending} = useFormStatus()

    return (
        <Button
          disabled={pending} className="w-full" type="submit">
            {pending ? 'Loading...' : 'Submit'}
          </Button>
    )
}

const FormSignIn = () => {
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState<string[]>([]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        const validation = formSchema.safeParse({
            email,
            password
        })

        if (!validation.success) {
            const errorMessage = validation.error.issues.map((issues) => issues.message)
            setError(errorMessage)
            return;
        }
    }
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