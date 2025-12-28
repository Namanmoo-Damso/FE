"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 overflow-hidden relative font-sans">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10"></div>

            <div className="max-w-md w-full flex flex-col flex-grow justify-between text-center z-10 space-y-6">
                {/* Logo & AI Avatar Section */}
                <div className="flex flex-col items-center space-y-6 pt-10 flex-grow justify-center relative">
                    {/* Logo Placeholder (Blurred Background) */}
                    <div className="w-28 h-28 bg-[#D0E0B5] rounded-full flex items-center justify-center shadow-lg absolute top-0 left-1/2 -translate-x-1/2 opacity-30 blur-xl -z-10"></div>
                    <div className="relative z-10">
                        <h1 className="text-5xl font-extrabold tracking-tight text-[#4A5D23] relative z-10">
                            담소
                            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-3xl">
                                ✨
                            </span>
                        </h1>
                    </div>

                    {/* Friendly AI Avatar */}
                    <div className="relative mt-8 mb-4 w-56 h-56 rounded-full border-4 border-[#C2D5A8] shadow-xl overflow-hidden bg-white">
                        <div className="w-full h-full bg-[#E9F0DF] flex items-center justify-center text-4xl">
                            🤖
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-[#556B2F]">
                        안녕하세요, 어르신!
                        <br />
                        AI 친구 <span className="text-[#primary] font-bold">'다미'</span>에요.
                    </p>
                </div>

                {/* Introduction Section */}
                <div className="space-y-5">
                    <h2 className="text-3xl font-bold tracking-tight text-[#4A5D23]">
                        이야기하러 오셨나요?
                    </h2>
                    <p className="text-[#6E7F4F] text-xl leading-relaxed">
                        오늘 있었던 일, 저에게 다 들려주세요.
                    </p>
                </div>

                {/* Call to Action Section */}
                <div className="space-y-4 pt-8 pb-6">
                    <Link href="/onboarding/user-type" className="block w-full">
                        <Button size="xl" className="w-full shadow-lg transition-transform hover:scale-105">
                            이야기 시작하기
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
