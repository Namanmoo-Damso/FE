"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Persona = "warm" | "calm" | "cheerful"

export default function SelfOnboardingPersonaPage() {
    const [selected, setSelected] = useState<Persona | null>(null)

    const personas = [
        {
            id: "warm",
            emoji: "🤗",
            title: "다정한 친구",
            desc: "천천히 잘 들어주고, 공감해줘요",
        },
        {
            id: "calm",
            emoji: "🌿",
            title: "차분한 친구",
            desc: "조용하고 편안하게 이야기해요",
        },
        {
            id: "cheerful",
            emoji: "😊",
            title: "밝은 친구",
            desc: "웃으면서 기운을 북돋아줘요",
        },
    ]

    return (
        <div className="min-h-screen bg-[#F7F9F2] flex flex-col justify-between items-center p-8 relative font-sans">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/5 bg-gradient-to-b from-[#E9F0DF] to-transparent opacity-80 -z-10" />

            <div className="max-w-md w-full flex flex-col flex-grow justify-between text-center space-y-10">
                {/* 질문 */}
                <div className="pt-16 space-y-6">
                    <div className="mx-auto w-32 h-32 rounded-full border-4 border-[#C2D5A8] shadow-lg overflow-hidden bg-white flex items-center justify-center text-4xl">
                        🤖
                    </div>

                    <p className="text-2xl font-semibold text-[#556B2F] leading-relaxed">
                        저는 어떤 친구였으면 좋을까요?
                        <br />
                        편한 걸로 골라주세요 😊
                    </p>
                </div>

                {/* 페르소나 선택 */}
                <div className="space-y-4 flex-grow flex flex-col justify-center">
                    {personas.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setSelected(p.id as Persona)}
                            className={`w-full p-6 rounded-3xl text-left shadow-md transition border-4
                ${selected === p.id
                                    ? "border-[#8FA963] bg-[#F1F6E8]"
                                    : "border-transparent bg-white hover:bg-[#FAFCF6]"
                                }`}
                        >
                            <div className="flex items-center space-x-4">
                                <span className="text-4xl">{p.emoji}</span>
                                <div>
                                    <p className="text-2xl font-bold text-[#4A5D23]">
                                        {p.title}
                                    </p>
                                    <p className="text-lg text-[#6E7F4F]">{p.desc}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* 다음 */}
                <div className="pb-10">
                    <Link href="/onboarding/finale">
                        <Button
                            disabled={!selected}
                            size="xl"
                            className="w-full shadow-lg transition-transform enabled:hover:scale-105"
                        >
                            이 친구로 할게요
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
