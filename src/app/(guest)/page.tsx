"use client"

import { Content } from "@/model/Content";
import { useEffect, useState } from "react";
import axiosInstance from "../../../lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

  const [contents, setContents] = useState<Content[]>([]);
  const [sliceData, setSliceData] = useState<Content[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<Content[]>>("/fe/contents?limit=8");
        const sliced = response.data.data.slice(0, 2);
        setContents(response.data.data);
        setSliceData(sliced);
        setContents((prevContents) => prevContents.slice(2));
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Error when fetching data",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
        {sliceData.map((content) => (
          <div className="group cursor-pointer" key={content.id}>
            <div className="overflow-hidden rounded-md bg-gray-100 transistion-all hover:scale-105">
              <Link className="relative block aspect-[5/3]" href={""}>
                {content.image != "" && (
                  <Image src={content.image} alt={content.title} fill className="object-cover object-center trainsition-all rounded-2xl shadow-2xl" />
                )}
              </Link>
            </div>
            <div>
              <div>
                <div className="flex gap-3">
                  <Link href={`/category/${content.category_id}`}>
                    <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-600">{content.category_name}</span>
                  </Link>
                </div>
                <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2">
                  <Link href={`/contents/detail/${content.id}`}>
                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition  duration-500 hover:bg-[length:100%_3px]">
                      {content.title}
                    </span>
                  </Link>
                </h2>
                <div className="mt-3 flex items-center space-x-3 text-gray-500">
                  <Link href={""}>
                    <div className="flex items-center gap-3">
                      <div className="relative h-5 w-5 flex-shrink-0">
                        <img src="https://placehold.co/32x32" alt="author" className="rounded-full object-cover" sizes="20px" />
                      </div>
                      <span className="truncate text-sm">{content.author}</span>
                    </div>
                  </Link>
                  <span className="text-xs text-gray-300">.</span>
                  <time dateTime={"2024-11-26T15:48:00Z"} className="truncate text-sm">{content.created_at}</time>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap:10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {contents.map((content) => (
          <div className="group cursor-pointer" key={content.id}>
            <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105">
              <Link className="relative block aspect-[5/3]" href={""}>
                {content.image != "" && (
                  <Image src={content.image} alt={content.title} fill className="object-cover object-center trainsition-all rounded-2xl shadow-2xl" />
                )}
                {content.image == "" && (
                  <img src="https://placeholder.co/600x400" alt="image data" className="object-cover object-center trainsition-all rounded-2xl shadow-2xl" />
                )}
              </Link>
            </div>
            <div>
              <div>
                <div className="flex gap-3">
                  <Link href={`/category/${content.category_id}`}>
                    <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-600">{content.category_name}</span>
                  </Link>
                </div>
                <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2" >
                  <Link href={`/contents/detail/${content.id}`}>
                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition  duration-500 hover:bg-[length:100%_3px]">
                      {content.title}
                    </span>
                  </Link>
                </h2>
                <div className="mt-3 flex items-center space-x-3 text-gray-500">
                  <Link href={""}>
                    <div className="flex items-center gap-3">
                      <div className="relative h-5 w-5 flex-shrink-0">
                        <img src="https://placehold.co/32x32" alt="author" className="rounded-full object-cover" sizes="20px" />
                      </div>
                      <span className="truncate text-sm">{content.author}</span>
                    </div>
                  </Link>
                  <span className="text-xs text-gray-300">.</span>
                  <time dateTime={"2024-11-26T15:48:00Z"} className="truncate text-sm">{content.created_at}</time>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link href={"/contents"} className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
          <span>
            See All
          </span>
        </Link>
      </div>
    </div>
  );
}
