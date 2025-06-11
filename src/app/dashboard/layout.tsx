import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dashboard",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>
                <section>
                    <nav className="border-b border-muted p-5">
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-bold text-primary">
                                Medyum
                            </span>
                        </div>
                    </nav>
                </section>
                <section className="flex flex-row gap-5 item-start flex-nowrap">
                    <section className="grow-0 w-[20%] h-screen shadow p-5 space-y-5">
                        <div className="space-y-2">
                            <Button variant={"ghost"} asChild className="w-full justify-start">
                                <Link href={"/dasboard"}>Dashboard</Link>
                            </Button>
                        </div>
                    </section>
                    <section className="grow mr-5 mt-5 h-[87vh] overflow-y-auto">
                        {children}
                    </section>
                </section>
                </body>
        </html>
    );
}
