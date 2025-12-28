"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CallInProgressPage() {
    const [muted, setMuted] = useState(false)

    return (
        <div className="min-h-screen bg-[#1F2A12] flex flex-col justify-between items-center p-6 font-sans text-white">
            {/* 통화 상태 */}
            <div className="pt-10 text-center space-y-2">
                <p className="text-lg opacity-80">통화 중</p>
                <p className="text-2xl font-semibold">다미와 이야기 중이에요</p>
            </div>

            {/* AI 얼굴 */}
            <div className="flex-grow flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border-4 border-[#8FA963] shadow-2xl overflow-hidden bg-white flex items-center justify-center text-6xl">
                    🤖
                </div>
            </div>

            {/* 컨트롤 버튼 */}
            <div className="pb-8 w-full max-w-md flex justify-between items-center">
                {/* 음소거 */}
                <button
                    onClick={() => setMuted(!muted)}
                    className="w-20 h-20 rounded-full bg-[#3A4B22] flex items-center justify-center text-3xl"
                >
                    {muted ? "🔇" : "🔊"}
                </button>

                {/* 끊기 */}
                <Link href="/call/end">
                    <Button className="w-28 h-28 rounded-full bg-red-500 hover:bg-red-600 text-3xl shadow-2xl">
                        📞
                    </Button>
                </Link>

                {/* 도움 */}
                <button className="w-20 h-20 rounded-full bg-[#3A4B22] flex items-center justify-center text-3xl">
                    🆘
                </button>
            </div>
        </div>
    )
}
