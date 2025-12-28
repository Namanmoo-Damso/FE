"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, Phone, Heart, User } from "lucide-react"
import Link from "next/link"
import { SettingsModal } from "@/components/settings-modal"

export default function ElderHomePage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] p-6 pb-24 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pt-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#4A5D23]">
                        안녕하세요, <span className="text-[#8FA963]">김영희</span>님!
                    </h1>
                    <p className="text-[#6E7F4F] text-lg mt-1">오늘 기분은 어떠신가요?</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white border-4 border-[#C2D5A8] flex items-center justify-center text-3xl shadow-md">
                    👵
                </div>
            </div>

            {/* Main Action - Start Call */}
            <Link href="/call/active">
                <Card className="p-8 bg-[#8FA963] border-none text-white shadow-xl flex flex-col items-center text-center space-y-4 active:scale-95 transition-transform">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl">
                        🤖
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">다미와 대화하기</h2>
                        <p className="text-white/80 text-xl mt-2">오늘 있었던 일을 들려주세요</p>
                    </div>
                    <Button size="xl" className="bg-white text-[#8FA963] hover:bg-[#F1F6E8] w-full text-2xl">
                        전화 시작하기
                    </Button>
                </Card>
            </Link>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-4 mt-8">
                <Link href="/onboarding/info-update">
                    <Card className="p-6 bg-white border-2 border-[#E9F0DF] shadow-md flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 bg-[#F7F9F2] rounded-full flex items-center justify-center text-primary">
                            <User className="w-8 h-8" />
                        </div>
                        <span className="text-xl font-bold text-[#4A5D23]">내 정보</span>
                    </Card>
                </Link>
                <Card className="p-6 bg-white border-2 border-[#E9F0DF] shadow-md flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-[#F7F9F2] rounded-full flex items-center justify-center text-primary">
                        <Heart className="w-8 h-8" />
                    </div>
                    <span className="text-xl font-bold text-[#4A5D23]">건강 기록</span>
                </Card>
            </div>

            {/* Information Row */}
            <Card className="mt-8 p-6 bg-[#E9F0DF] border-none flex items-center space-x-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-2xl">
                    💡
                </div>
                <p className="text-[#4A5D23] font-medium text-lg leading-snug">
                    오늘 오후에 안부 전화를<br />드릴 예정이에요.
                </p>
            </Card>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E9F0DF] px-8 py-4 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <button className="flex flex-col items-center text-[#8FA963]">
                    <MessageCircle className="w-8 h-8" />
                    <span className="text-sm font-bold mt-1">홈</span>
                </button>
                <button className="flex flex-col items-center text-[#9CA3AF]">
                    <Phone className="w-8 h-8" />
                    <span className="text-sm font-bold mt-1">통화</span>
                </button>
                <SettingsModal />
            </div>
        </div>
    )
}
