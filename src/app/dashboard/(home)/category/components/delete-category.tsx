"use client";

import { FC } from "react";
import Swal from "sweetalert2";
import { deleteCategory } from "../lib/action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteCategoryPageProps {
    id: number
}

const DeleteCategory: FC<DeleteCategoryPageProps> = ({id}) => {
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Confirm delete",
            text: "This category will deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, Delete"
        });

        if (result.isConfirmed) {
            try {
                await deleteCategory(id);

                Swal.fire({
                icon: "success",
                title: "Succes",
                text: "Category has been deleted",
                toast: true,
                showConfirmButton: false,
                timer: 1500
                });

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
            }
        }
    }

    return (
    <Button size={"sm"} variant={"destructive"} onClick={handleDelete}><Trash className="mr-2 h-4 w-4" /> Delete</Button>
    );
}

export default DeleteCategory;