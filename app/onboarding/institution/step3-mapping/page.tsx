"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Info } from "lucide-react"

const csvColumns = [
    "이름",
    "전화번호",
    "생년월일",
    "거주지",
    "지병",
    "복약여부",
    "보호자이름",
    "보호자연락처",
]

const fieldGroups = [
    {
        title: "기본 정보",
        description: "대상자 식별 및 안부 통화를 위한 필수 정보입니다.",
        fields: [
            { key: "name", label: "이름", required: true },
            { key: "phone", label: "연락처", required: true },
            { key: "birth", label: "생년월일", required: false },
            { key: "region", label: "거주 지역", required: false },
        ],
    },
    {
        title: "건강 · 돌봄 정보",
        description: "통화 중 위험 신호를 분석하고 건강 상태를 파악하는 데 활용됩니다.",
        fields: [
            { key: "disease", label: "주요 지병", required: false },
            { key: "medication", label: "복약 여부", required: false },
        ],
    },
    {
        title: "보호자 정보",
        description: "비상 상황 발생 시 알림을 전송할 대상 정보입니다.",
        fields: [
            { key: "guardian_name", label: "보호자 성함", required: false },
            { key: "guardian_phone", label: "보호자 연락처", required: false },
        ],
    },
]

export default function InstitutionOnboardingColumnMapping() {
    const [mapping, setMapping] = useState<Record<string, string>>({})

    const requiredKeys = fieldGroups
        .flatMap((g) => g.fields)
        .filter((f) => f.required)
        .map((f) => f.key)

    const isMapped = (key: string) => Object.values(mapping).includes(key)
    const isValid = requiredKeys.every(isMapped)

    const handleMappingChange = (csvCol: string, systemKey: string) => {
        const newMapping = { ...mapping }
        // Remove existing mapping for this system key if it exists
        Object.keys(newMapping).forEach((k) => {
            if (newMapping[k] === systemKey) delete newMapping[k]
        })
        if (csvCol) newMapping[csvCol] = systemKey
        setMapping(newMapping)
    }

    return (
        <div className="min-h-screen bg-[#F7F9F2] font-sans px-10 py-16 text-[#2F3E1F]">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#E1EAD3] rounded-full overflow-hidden">
                    <div className="w-3/5 h-full bg-[#8FA963]" />
                </div>

                {/* 헤더 */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        데이터 항목 매칭
                    </h1>
                    <p className="text-xl text-[#6E7F4F] font-medium italic">
                        업로드하신 파일의 각 항목이 담소 시스템의 어떤 정보에 해당되는지 확인해 주세요.
                    </p>
                </div>

                <div className="space-y-12">
                    {fieldGroups.map((group) => (
                        <section key={group.title} className="space-y-6">
                            <div className="space-y-2 px-2 border-l-4 border-[#8FA963]">
                                <h2 className="text-2xl font-extrabold text-[#4A5D23]">
                                    {group.title}
                                </h2>
                                <p className="text-[#7B8C5A] text-sm font-medium">
                                    {group.description}
                                </p>
                            </div>

                            <div className="grid gap-4">
                                {group.fields.map((field) => (
                                    <div
                                        key={field.key}
                                        className={`
                                            flex items-center gap-8 bg-white rounded-3xl p-6 border-2 transition-all
                                            ${isMapped(field.key) ? 'border-[#8FA963] shadow-md' : 'border-[#E1EAD3] hover:border-[#C2D5A8]'}
                                        `}
                                    >
                                        <div className="w-1/3 space-y-1">
                                            <div className="flex items-center gap-2 font-bold text-lg text-[#4A5D23]">
                                                {field.label}
                                                {field.required && (
                                                    <span className="text-red-500 text-sm font-normal">(필수)</span>
                                                )}
                                                {isMapped(field.key) && <Check className="w-5 h-5 text-[#8FA963]" />}
                                            </div>
                                        </div>

                                        <div className="flex-1 relative">
                                            <select
                                                className={`
                                                    w-full px-5 py-4 text-base font-bold rounded-2xl border-2 appearance-none bg-[#F7F9F2] focus:outline-none focus:border-[#8FA963] transition-colors
                                                    ${isMapped(field.key) ? 'text-[#4A5D23] border-[#8FA963] bg-white' : 'text-[#7B8C5A] border-[#E1EAD3]'}
                                                `}
                                                value={Object.entries(mapping).find(([_, v]) => v === field.key)?.[0] || ""}
                                                onChange={(e) => handleMappingChange(e.target.value, field.key)}
                                            >
                                                <option value="">파일 내 항목을 선택하세요</option>
                                                {csvColumns.map((col) => (
                                                    <option key={col} value={col}>
                                                        📄 {col}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#C2D5A8]">
                                                ▼
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Helpers */}
                <div className="bg-[#E9F0DF] p-6 rounded-3xl border border-[#C2D5A8] flex gap-4">
                    <Info className="w-6 h-6 text-[#8FA963] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#556B2F] leading-relaxed">
                        파일의 컬럼명과 시스템 필드명이 달라도 괜찮습니다. 의미가 같은 항목끼리 연결만 해주시면 담소가 나머지는 알아서 처리합니다.
                    </p>
                </div>

                {/* CTA */}
                <div className="pt-8 space-y-4">
                    <Link href="/onboarding/institution/step4-preview" className="block w-full">
                        <Button
                            disabled={!isValid}
                            className={`w-full h-18 text-xl font-bold rounded-2xl transition-all shadow-md
                                ${isValid
                                    ? "bg-[#8FA963] text-white hover:bg-[#7A9351] hover:scale-[1.01]"
                                    : "bg-[#D7E3C5] text-[#7B8C5A] cursor-not-allowed opacity-70"
                                }`}
                        >
                            매칭 완료 및 데이터 미리보기
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
