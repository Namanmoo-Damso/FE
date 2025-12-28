"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GuardianRoleSelectPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full flex flex-col justify-between flex-grow text-center space-y-12">
                {/* 질문 영역 */}
                <div className="pt-20 space-y-6">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        어떤 역할로
                        <br />
                        함께하시나요?
                    </h1>
                    <p className="text-xl text-[#6E7F4F] leading-relaxed">
                        역할에 따라
                        <br />
                        볼 수 있는 정보가 달라요.
                    </p>
                </div>

                {/* 선택 버튼 영역 */}
                <div className="space-y-6 flex-grow flex flex-col justify-center">
                    {/* 가족 보호자 */}
                    <Link href="/onboarding/guardian/connect" className="block w-full">
                        <Button
                            size="xxl"
                            className="w-full shadow-xl transition-transform hover:scale-105"
                        >
                            👨‍👩‍👧 가족 보호자
                        </Button>
                    </Link>

                    {/* 기관 · 실무 담당자 */}
                    <Link href="/onboarding/guardian/connect" className="block w-full">
                        <Button
                            variant="outline"
                            size="xxl"
                            className="w-full border-4 border-primary text-primary-dark shadow-lg bg-white hover:bg-[#F1F6E8]"
                        >
                            🏥 기관 · 실무 담당자
                        </Button>
                    </Link>
                </div>

                {/* 하단 안내 문구 */}
                <div className="pb-10">
                    <p className="text-base text-[#7B8C5A]">
                        선택은 언제든지
                        <br />
                        나중에 변경할 수 있어요.
                    </p>
                </div>
            </div>
        </div>
    )
}
