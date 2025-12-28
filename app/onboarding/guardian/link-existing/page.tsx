"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GuardianLinkExistingPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans text-center">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full flex flex-col justify-between flex-grow space-y-12">
                <div className="pt-20 space-y-6">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        연결 코드를
                        <br />
                        입력해주세요
                    </h1>
                    <p className="text-xl text-[#6E7F4F] leading-relaxed">
                        어르신 화면에 표시된
                        <br />
                        6자리 숫자를 입력해주세요.
                    </p>
                </div>

                <div className="flex-grow flex flex-col justify-center">
                    <input
                        type="text"
                        placeholder="0 0 0 0 0 0"
                        className="w-full text-center text-5xl font-bold tracking-widest bg-white border-4 border-[#C2D5A8] rounded-3xl py-8 text-[#4A5D23] focus:outline-none focus:border-primary shadow-inner"
                        maxLength={6}
                    />
                </div>

                <div className="space-y-6 pb-10">
                    <Link href="/onboarding/guardian/link-pending" className="block w-full">
                        <Button
                            size="xxl"
                            className="w-full shadow-xl transition-transform hover:scale-105"
                        >
                            연결하기
                        </Button>
                    </Link>
                    <Link href="/onboarding/guardian/connect" className="text-[#7B8C5A] underline underline-offset-4">
                        이전으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    )
}
