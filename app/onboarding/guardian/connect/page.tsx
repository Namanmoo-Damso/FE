"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GuardianConnectMethodPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full flex flex-col justify-between flex-grow text-center space-y-12">
                {/* 질문 영역 */}
                <div className="pt-20 space-y-6">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        어떻게
                        <br />
                        연결할까요?
                    </h1>
                    <p className="text-xl text-[#6E7F4F] leading-relaxed">
                        상황에 맞는 방법을
                        <br />
                        선택해주세요.
                    </p>
                </div>

                {/* 선택 버튼 영역 */}
                <div className="space-y-6 flex-grow flex flex-col justify-center">
                    {/* 기존 사용자와 연결 */}
                    <Link href="/onboarding/guardian/link-existing" className="block w-full">
                        <Button
                            size="xxl"
                            className="w-full shadow-xl transition-transform hover:scale-105"
                        >
                            🔗 이미 사용 중인 어르신과 연결
                        </Button>
                    </Link>

                    {/* 대신 등록 */}
                    <Link href="/onboarding/guardian/link-pending" className="block w-full">
                        <Button
                            variant="outline"
                            size="xxl"
                            className="w-full border-4 border-primary text-primary-dark shadow-lg bg-white hover:bg-[#F1F6E8]"
                        >
                            ✍️ 지금부터 대신 등록할게요
                        </Button>
                    </Link>
                </div>

                {/* 하단 안내 */}
                <div className="pb-10">
                    <p className="text-base text-[#7B8C5A]">
                        나중에 다른 어르신도
                        <br />
                        추가할 수 있어요.
                    </p>
                </div>
            </div>
        </div>
    )
}
