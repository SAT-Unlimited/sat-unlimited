"use client"

import Link from "next/link"

export function Footer() {

    return (
        <footer className="w-screen bg-[#11001c] flex flex-col items-center pb-7 mt-72">
            <span className="logo-font text-[#E086D7] font-bold text-5xl mt-10">SAT Unlimited</span>
            <div className="mt-5">
                <span>Made with 🤍 by </span>
                <Link className="underline" href="https://shaurya.pro">Shaurya Kumar</Link>
            </div>
            <span className="text-base text-gray-400 mt-16">SAT is a registered trademark of the College Board, which was not involved in the production of and does not endorse this product.</span>
        </footer>
    )

}