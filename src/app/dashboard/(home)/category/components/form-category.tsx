"use client";

import { Category } from "@/model/Category";
import React, { FC, useEffect, useState } from "react";
import { setupInterceptor } from "../../../../../../lib/axios";
import { useRouter } from "next/navigation";
import { categoryFormSchema } from "../lib/validation";
import { createCategory, editCategory } from "../lib/action";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButtonForm from "./submit-button";

interface FormCategoryProps {
    type?: "ADD"| "EDIT",
    defaultValues?: Category | null
}

const FormCategoryPage: FC<FormCategoryProps> = ({type, defaultValues}) => {
    setupInterceptor();

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string[]>([])

    useEffect(() => {
        if (type == "EDIT" && defaultValues) {
            setTitle(defaultValues.title);
        }
    }, [type, defaultValues])

    const handleCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        try {
            const validation = categoryFormSchema.safeParse({
                title,
            });

            if (!validation.success) {
                const errorMessage = validation.error.issues.map((issue) => issue.message);
                setError(errorMessage);
                return;
            }
            if (type == "ADD") {
                await createCategory({title: title})
    
                Swal.fire({
                    icon: "success",
                    title: "Succes",
                    text: "Category has been created",
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500
                  });
    
                  router.push("/dashboard/category");
            } else {
                if (defaultValues?.id) {
                    await editCategory({title: title}, defaultValues.id);

                    Swal.fire({
                        icon: "success",
                        title: "Succes",
                        text: "Category has been edited",
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    router.push("/dashboard/category");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Category id is not found",
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: error.message,
                toast: true,
                showConfirmButton: false,
                timer: 1500
            });

            setError(error instanceof Error? [error.message] : ['An unexpected error occured'])
        }
    }

    return (
        <form onSubmit={handleCategory} className="space-y-4">
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

            <div className="space-y-2">
                <Label htmlFor="title">
                    Title
                </Label>
                <Input placeholder="Judul..." name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <SubmitButtonForm />
            </div>
        </form>
    )
}

export default FormCategoryPage;