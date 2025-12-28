"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InfoUpdatePage() {
    const [name, setName] = useState("김영희")
    const [hobby, setHobby] = useState("걷기 운동")

    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full flex flex-col flex-grow justify-between text-center space-y-8">
                {/* 헤더 */}
                <div className="pt-16 space-y-4">
                    <h1 className="text-3xl font-bold text-[#4A5D23]">
                        이야기 잘 나누셨나요?
                    </h1>
                    <p className="text-lg text-[#6E7F4F] leading-relaxed">
                        제가 정리한 내용이 맞는지 봐주세요.
                        <br />
                        틀리면 꾹 눌러서 고칠 수 있어요.
                    </p>
                </div>

                {/* 정보 확인 카드 */}
                <div className="space-y-6 flex-grow flex flex-col justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-[#C2D5A8] space-y-8">
                        <div className="space-y-2 text-left">
                            <label className="text-sm font-semibold text-[#8FA963] ml-1">불러드릴 이름</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-2xl font-bold text-[#4A5D23] bg-[#F7F9F2] p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8FA963]"
                            />
                        </div>

                        <div className="space-y-2 text-left">
                            <label className="text-sm font-semibold text-[#8FA963] ml-1">좋아하시는 일</label>
                            <input
                                type="text"
                                value={hobby}
                                onChange={(e) => setHobby(e.target.value)}
                                className="w-full text-2xl font-bold text-[#4A5D23] bg-[#F7F9F2] p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8FA963]"
                            />
                        </div>
                    </div>
                </div>

                {/* 확인 버튼 */}
                <div className="pb-10">
                    <Link href="/onboarding/accept-calls">
                        <Button
                            size="xl"
                            className="w-full shadow-lg transition-transform hover:scale-105"
                        >
                            네, 맞아요
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
