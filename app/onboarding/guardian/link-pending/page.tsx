"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GuardianLinkPendingPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-center items-center p-8 relative font-sans text-center">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full space-y-12">
                {/* 아이콘 */}
                <div className="text-8xl animate-pulse">⏳</div>

                {/* 메시지 */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        승인 기다리는 중...
                    </h1>
                    <p className="text-xl text-[#6E7F4F] leading-relaxed">
                        어르신께
                        <br />
                        연결 요청을 보냈어요.
                    </p>
                </div>

                <div className="bg-white/50 p-6 rounded-3xl border-2 border-[#C2D5A8] text-base text-[#7B8C5A] leading-relaxed">
                    어르신이 화면에서
                    <br />
                    <span className="font-bold text-[#4A5D23]">승인</span> 버튼을 누르면
                    <br />
                    자동으로 연결돼요.
                </div>

                {/* Mock navigation for testing */}
                <Link href="/onboarding/guardian/link-success" className="block pt-8">
                    <Button variant="ghost" className="text-[#8FA963] font-semibold">
                        (임시) 승인 완료 시뮬레이션
                    </Button>
                </Link>
            </div>
        </div>
    )
}
