"use client";

import { Content } from "@/model/Content";
import React, { FC, useEffect, useState } from "react";
import { setupInterceptor } from "../../../../../../lib/axios";
import { useRouter } from "next/navigation";
import { contentFormSchema } from "../lib/validation";
// import { createContent, editContent } from "../lib/action";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Category } from "@/model/Category";
import SubmitButtonForm from "./submit-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createContent, uploadImage } from "../lib/action";

interface FormContentProps {
    type?: "ADD"| "EDIT"
    defaultValues?: Content | null
    categoryList: Category[]
}

const FormContentPage: FC<FormContentProps> = ({type, defaultValues, categoryList}) => {
    setupInterceptor();

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [excerpt, setExerpt] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(defaultValues ? defaultValues.category_id.toString() : '');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState(defaultValues ? defaultValues.status : '');
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState(defaultValues ? defaultValues.image : '');
    const [error, setError] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const statusList = [
        {value: 'PUBLISH', label: 'Publish'},
        {value: 'DRAFT', label: 'Draft'},
    ];

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
            setImage(file);
        }
    }

    const handleCategoryChange = (value: string) => {
        setCategoryId(value);
    }

    const handleStatusChange = (value: string) => {
        setStatus(value);
    }

    useEffect(() => {
        if (categoryList) {
            setCategories(categoryList);
        }
    }, [categoryList])

    const handleContent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        try {
            const validation = contentFormSchema.safeParse({
                title,
                categoryId,
                excerpt,
                description,
            });

            if (!validation.success) {
                const errorMessage = validation.error.issues.map((issue) => issue.message);
                setError(errorMessage);
                return;
            }
            if (type == "ADD") {
                if (!image) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Image required",
                        toast: true,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
                setIsUploading(true);
                const imageUrl = await uploadImage(image);
                await createContent({
                    title: title,
                    excerpt: excerpt,
                    description: description,
                    image: imageUrl.data ? imageUrl.data.urlImage : imageUrl,
                    category_id: Number(categoryId),
                    tags: tags,
                    status: status,
                });
    
                Swal.fire({
                    icon: "success",
                    title: "Succes",
                    text: "Content has been created",
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500
                  });
    
                  router.push("/dashboard/content");
            } 

            let imageUrl;
            if (!image) {
                imageUrl = previewImage;
            } else {
                setIsUploading(true);
                imageUrl = await uploadImage(image);
            }

            if (defaultValues?.id) {

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
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <form onSubmit={handleContent} className="space-y-4">
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
                    <Label htmlFor="categoryId">
                        Select Category
                    </Label>
                    <Select name="categoryId" value={categoryId} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full" id="categoryId">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => 
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.title}
                            </SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="title">
                    Title
                </Label>
                <Input placeholder="Title..." name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="excerpt">
                        Summary
                    </Label>
                    <Input placeholder="Summary..." name="excerpt" id="exerpt" value={excerpt} onChange={(e) => setExerpt(e.target.value)} required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="tags">
                    Tags
                </Label>
                <Input placeholder="tags1, tags2, tags3..." name="tags" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="description">
                        Description
                    </Label>
                    <Textarea placeholder="Description..." name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="image">
                        Upload Image
                    </Label>
                    <Input name="image" type="file" id="image" accept="image/*" onChange={handleImageChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">
                        Status
                    </Label>
                    <Select name="status" value={status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-full" id="status">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusList.map((status) =>
                                <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                </SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="previewImage">
                        Image Preview
                    </Label>
                    {previewImage && (
                        <img src={previewImage} alt="preview-image" className="h-[200px] w-full" />
                    )}
                </div>
                <div className="space-y-2"></div>
            </div>
                <SubmitButtonForm />
        </form>
    )
}

export default FormContentPage;