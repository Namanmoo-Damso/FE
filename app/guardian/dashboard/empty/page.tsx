"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GuardianDashboardEmptyPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/3 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full flex flex-col justify-between flex-grow text-center space-y-12">
                {/* 상단 인사 */}
                <div className="pt-16 space-y-4">
                    <h1 className="text-3xl font-extrabold text-[#4A5D23]">
                        보호자 홈
                    </h1>
                    <p className="text-xl text-[#6E7F4F] leading-relaxed font-medium">
                        어르신과
                        <br />
                        안전하게 연결됐어요.
                    </p>
                </div>

                {/* 핵심 안내 영역 */}
                <div className="flex-grow flex flex-col justify-center space-y-8">
                    <div className="relative">
                        <div className="text-8xl mb-6">📞</div>
                        <div className="absolute -top-4 -right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce shadow-lg">
                            곧 첫 통화가 시작돼요!
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-2xl font-bold text-[#556B2F]">
                            통화 요약과 알림은
                            <br />
                            여기서 확인하세요
                        </p>
                        <p className="text-lg text-[#7B8C5A] leading-relaxed">
                            아직 표시할 내용이 없어요.
                            <br />
                            <span className="font-semibold text-[#4A5D23]">첫 통화</span> 이후부터
                            <br />
                            AI가 자동으로 정리해 드려요.
                        </p>
                    </div>
                </div>

                {/* 액션 버튼 */}
                <div className="space-y-6 pb-12 w-full">
                    <Link href="/guardian/dashboard" className="block w-full">
                        <Button
                            size="xxl"
                            className="w-full shadow-xl transition-transform hover:scale-105"
                        >
                            📋 안부 설정 확인하기
                        </Button>
                    </Link>

                    <p className="text-sm text-[#7B8C5A] font-medium leading-relaxed">
                        통화 시간, 알림 방식은
                        <br />
                        언제든지 바꿀 수 있어요.
                    </p>
                </div>
            </div>
        </div>
    )
}
