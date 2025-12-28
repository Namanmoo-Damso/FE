"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SelfOnboardingNamePage() {
    const [name, setName] = useState("")

    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10"></div>

            <div className="max-w-md w-full flex flex-col flex-grow justify-between text-center space-y-8">
                {/* AI 아바타 & 질문 */}
                <div className="pt-16 flex flex-col items-center space-y-6">
                    <div className="relative w-40 h-40 rounded-full border-4 border-[#C2D5A8] shadow-xl overflow-hidden bg-white flex items-center justify-center text-4xl">
                        🤖
                    </div>

                    <p className="text-2xl font-semibold text-[#556B2F] leading-relaxed">
                        반가워요 😊
                        <br />
                        제가 뭐라고 불러드리면 좋을까요?
                    </p>
                </div>

                {/* 이름 입력 */}
                <div className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="예: 김영수"
                        className="w-full h-16 text-2xl text-center rounded-2xl border-2 border-[#C2D5A8] focus:outline-none focus:ring-4 focus:ring-[#D6E5BF] bg-white text-[#4A5D23]"
                    />
                    <p className="text-base text-[#7B8C5A]">
                        성함이 아니어도 괜찮아요.
                        <br />
                        편한 이름이면 돼요.
                    </p>
                </div>

                {/* 다음 버튼 */}
                <div className="pb-10">
                    <Link href="/onboarding/ai-type">
                        <Button
                            disabled={!name}
                            size="xl"
                            className="w-full shadow-lg transition-transform enabled:hover:scale-105"
                        >
                            네, 좋아요
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
