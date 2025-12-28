"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UserTypeSelectPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10"></div>

            <div className="max-w-md w-full flex flex-col justify-between flex-grow text-center space-y-10">
                {/* 질문 영역 */}
                <div className="pt-20 space-y-6">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        누가 사용하시나요?
                    </h1>
                    <p className="text-xl text-[#6E7F4F] leading-relaxed">
                        상황에 맞게
                        <br />
                        하나만 골라주세요.
                    </p>
                </div>

                {/* 선택 영역 */}
                <div className="space-y-6 flex-grow flex flex-col justify-center">
                    {/* 본인 */}
                    <Link href="/onboarding/ai-type" className="block w-full">
                        <Button size="xxl" className="w-full shadow-xl transition-transform hover:scale-105">
                            👵 제가 직접 사용할게요
                        </Button>
                    </Link>

                    {/* 보호자 */}
                    <Link href="/onboarding/guardian/role-select" className="block w-full">
                        <Button
                            variant="outline"
                            size="xxl"
                            className="w-full border-4 border-primary text-primary-dark shadow-lg bg-white hover:bg-[#F1F6E8]"
                        >
                            👨‍👩‍👧 보호자로 등록할게요
                        </Button>
                    </Link>

                    {/* 기관/단체 */}
                    <Link href="/institution" className="block w-full">
                        <Button
                            variant="ghost"
                            size="lg"
                            className="w-full text-[#7B8C5A] hover:text-[#4A5D23] hover:bg-[#F1F6E8] font-bold"
                        >
                            🏢 기관/단체이신가요? (도입 문의)
                        </Button>
                    </Link>
                </div>

                {/* 안심 문구 */}
                <div className="pb-10">
                    <p className="text-base text-[#7B8C5A]">
                        어려운 설정은 없어요.
                        <br />
                        차근차근 안내해드릴게요.
                    </p>
                </div>
            </div>
        </div>
    )
}
