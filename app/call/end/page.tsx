"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CallEndedPage() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/onboarding/info-update")
        }, 3000)
        return () => clearTimeout(timer)
    }, [router])

    const handleClick = () => {
        router.push("/onboarding/info-update")
    }

    return (
        <div
            className="min-h-screen bg-[#F7F9F2] flex flex-col justify-center items-center p-8 relative font-sans text-center cursor-pointer"
            onClick={handleClick}
        >
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full space-y-8">
                {/* AI 얼굴 */}
                <div className="mx-auto w-40 h-40 rounded-full border-4 border-[#C2D5A8] shadow-xl overflow-hidden bg-white flex items-center justify-center text-5xl">
                    🤖
                </div>

                {/* 메시지 */}
                <p className="text-3xl font-semibold text-[#556B2F] leading-relaxed">
                    오늘 이야기
                    <br />
                    잘 들었어요 😊
                </p>

                <p className="text-xl text-[#6E7F4F] leading-relaxed">
                    덕분에 저도 즐거웠어요.
                    <br />
                    다음에 또 이야기해요.
                </p>

                {/* 자동 종료 안내 */}
                <p className="text-base text-[#7B8C5A] pt-6">
                    화면을 누르거나 3초 후에 다음으로 넘어가요.
                </p>
            </div>
        </div>
    )
}
