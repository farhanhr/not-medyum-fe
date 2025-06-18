"use client";

import { User } from "@/model/User";
import React, { FC, useEffect, useState } from "react";
import { setupInterceptor } from "../../../../../../lib/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { updatePassword } from "../lib/action";
import SubmitButtonForm from "../../content/components/submit-button";
import { deleteCookie } from "cookies-next";

interface FormUserProps {
    defaultValues?: User | null
}

const FormUserPage: FC<FormUserProps> = ({ defaultValues }) => {
    setupInterceptor();

    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string[]>([])

    useEffect(() => {
        if (defaultValues) {
            setName(defaultValues.name);
            setEmail(defaultValues.email);
        }
    }, [defaultValues])

    const handleUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "Password will be updated",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Yes, Update"
                });

        if (result.isConfirmed) {
            try {
                await updatePassword({
                    current_password: password,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                })
                Swal.fire({
                    icon: "success",
                    title: "Succes",
                    text: "Password has been updated",
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500
                });
                deleteCookie('accessToken');
                window.location.reload();
            } catch (error: any) {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: error.message,
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500
                });

                setError(error instanceof Error ? [error.message] : ['An unexpected error occured'])
            }
    
        }
        
    }

    return (
        <form onSubmit={handleUser} className="space-y-4">
            {error.length > 0 && (
                <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 round-lg text-white">
                    <div className="font-bold mb-4">
                        <ul className="list-disc list-inside">
                            {error?.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input name="name" id="name" value={name} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input name="email" id="email" value={email} disabled />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="curentPassword">
                        Current password
                    </Label>
                    <Input type="password" name="currentPassword" id="currentPassword" placeholder="Current pasword..." onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">
                        New password
                    </Label>
                    <Input type="password" name="newPassword" id="newPassword" placeholder="New pasword..." onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                        Confirm password
                    </Label>
                    <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm pasword..." onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                
            </div>

            <div className="space-y-2">
                <SubmitButtonForm />
            </div>
        </form>
    )
}

export default FormUserPage;