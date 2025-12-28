"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SelfOnboardingCheckInConsentPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full flex flex-col flex-grow justify-between text-center space-y-10">
                {/* 질문 */}
                <div className="pt-20 space-y-6">
                    <div className="mx-auto w-36 h-36 rounded-full border-4 border-[#C2D5A8] shadow-lg overflow-hidden bg-white flex items-center justify-center text-4xl">
                        🤖
                    </div>

                    <p className="text-2xl font-semibold text-[#556B2F] leading-relaxed">
                        제가 가끔
                        <br />
                        안부 전화 드려도 될까요?
                    </p>

                    <p className="text-lg text-[#6E7F4F] leading-relaxed">
                        원하실 때만 받으셔도 괜찮고,
                        <br />
                        싫으시면 언제든 안 하셔도 돼요.
                    </p>
                </div>

                {/* 선택 버튼 */}
                <div className="space-y-6 flex-grow flex flex-col justify-center">
                    <Link href="/elder/home">
                        <Button
                            size="xxl"
                            className="w-full shadow-xl transition-transform hover:scale-105"
                        >
                            네, 좋아요 😊
                        </Button>
                    </Link>

                    <Link href="/elder/home">
                        <Button
                            variant="outline"
                            size="xxl"
                            className="w-full border-4 border-[#C9D8AE] text-secondary-muted shadow-md bg-white hover:bg-[#FAFCF6]"
                        >
                            아니요, 필요할 때만 할게요
                        </Button>
                    </Link>
                </div>

                {/* 안심 문구 */}
                <div className="pb-10">
                    <p className="text-base text-[#7B8C5A]">
                        언제든 설정에서 바꾸실 수 있어요.
                    </p>
                </div>
            </div>
        </div>
    )
}
