"use client"

import { Button } from "@/components/ui/button";
import { Content } from "@/model/Content";
import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react";
import Link from "next/link";
import DeleteContent from "./delete-content";

export const columns: ColumnDef<Content>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="max-w-[200px] truncate">
                {row.getValue("title")}
            </div>
        ),
    },
    {
        accessorKey: "excerpt",
        header: "Summary",
        cell: ({ row }) => (
            <div className="max-w-[250px] truncate">
                {row.getValue("excerpt")}
            </div>
        ),
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const content = row.original;

            return (
                <div className="flex items-center">
                    <img src={content.image} alt={content.title} width="100" height="100" />
                </div>
            )
        },
    },
    {
        accessorKey: "category_name",
        header: "Category",
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({row}) => {
            const content = row.original;

            return (
                <div className="inline-flex gap-5 items-end">
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/dashboard/content/edit/${content.id}`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                        </Link>
                    </Button>
                    <DeleteContent id={content.id} />
                </div>
            )
        }
    },
]   