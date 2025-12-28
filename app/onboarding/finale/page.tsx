"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CallReadyPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full flex flex-col flex-grow justify-between text-center space-y-10">
                {/* 메시지 */}
                <div className="pt-24 space-y-6">
                    <div className="mx-auto w-44 h-44 rounded-full border-4 border-[#C2D5A8] shadow-xl overflow-hidden bg-white animate-pulse flex items-center justify-center text-5xl">
                        🤖
                    </div>

                    <p className="text-3xl font-semibold text-[#556B2F] leading-relaxed">
                        첫 인사를 위해
                        <br />
                        수신 동의가 필요해요.
                    </p>

                    <p className="text-lg text-[#6E7F4F] leading-relaxed">
                        제가 지금 바로 전화드릴게요.
                        <br />
                        편하게 '동의'하고 받아주세요 😊
                    </p>
                </div>

                {/* 시작 버튼 */}
                <div className="pb-14">
                    <Link href="/call/active">
                        <Button
                            size="xxl"
                            className="w-full text-3xl shadow-xl transition-transform hover:scale-105"
                        >
                            📞 전화 받기
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
