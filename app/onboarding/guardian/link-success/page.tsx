"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GuardianLinkSuccessPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-center items-center p-8 relative font-sans text-center">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full space-y-12">
                {/* 성공 아이콘 */}
                <div className="text-8xl scale-125">✅</div>

                {/* 메시지 */}
                <div className="space-y-6">
                    <h1 className="text-5xl font-extrabold text-[#4A5D23] tracking-tight">
                        연결 완료!
                    </h1>
                    <p className="text-2xl text-[#6E7F4F] leading-relaxed font-medium">
                        이제 어르신의
                        <br />
                        안부를 확인할 수 있어요.
                    </p>
                </div>

                {/* 다음 액션 */}
                <div className="pt-8">
                    <Link href="/guardian/dashboard" className="block w-full">
                        <Button
                            size="xxl"
                            className="w-full shadow-2xl transition-all hover:scale-105 active:scale-95 text-3xl h-24"
                        >
                            보호자 홈으로 시작하기
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
