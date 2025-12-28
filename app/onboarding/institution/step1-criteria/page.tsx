"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InstitutionAdminOnboardingStep1() {
    const [manageUnit, setManageUnit] = useState<string | null>(null)
    const [callFrequency, setCallFrequency] = useState<string | null>(null)
    const [callLimit, setCallLimit] = useState<string | null>(null)
    const [guardianPolicy, setGuardianPolicy] = useState<string | null>(null)

    const isValid = manageUnit && callFrequency && callLimit && guardianPolicy

    return (
        <div className="min-h-screen bg-[#F7F9F2] font-sans px-10 py-16 text-[#2F3E1F]">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#E1EAD3] rounded-full overflow-hidden">
                    <div className="w-1/5 h-full bg-[#8FA963]" />
                </div>

                {/* 헤더 */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        기관 운영 기준 설정
                    </h1>
                    <p className="text-xl text-[#6E7F4F] font-medium italic">
                        대상자 일괄 등록 전에<br />
                        우리 기관의 기본 운영 방침을 먼저 설정해 주세요.
                    </p>
                </div>

                <div className="space-y-10 bg-white p-10 rounded-3xl shadow-sm border border-[#E1EAD3]">
                    {/* 관리 단위 */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-[#4A5D23] flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#8FA963] text-white flex items-center justify-center text-xs">1</span>
                            대상자 관리 단위
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {["개인별 관리", "지역 · 센터 단위", "담당자 · 팀 단위"].map((unit) => (
                                <button
                                    key={unit}
                                    onClick={() => setManageUnit(unit)}
                                    className={`px-4 py-4 rounded-xl border-2 text-base transition-all
                                        ${manageUnit === unit
                                            ? "border-[#8FA963] bg-[#F1F6E8] font-bold text-[#4A5D23] shadow-sm"
                                            : "border-[#E1EAD3] bg-white text-[#6E7F4F] hover:border-[#C2D5A8]"
                                        }`}
                                >
                                    {unit}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 통화 빈도 */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-[#4A5D23] flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#8FA963] text-white flex items-center justify-center text-xs">2</span>
                            기본 통화 빈도
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {["매일 1회", "주 2~3회", "필요 시 직접"].map((freq) => (
                                <button
                                    key={freq}
                                    onClick={() => setCallFrequency(freq)}
                                    className={`px-4 py-4 rounded-xl border-2 text-base transition-all
                                        ${callFrequency === freq
                                            ? "border-[#8FA963] bg-[#F1F6E8] font-bold text-[#4A5D23] shadow-sm"
                                            : "border-[#E1EAD3] bg-white text-[#6E7F4F] hover:border-[#C2D5A8]"
                                        }`}
                                >
                                    {freq}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 통화 시간 제한 */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-[#4A5D23] flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#8FA963] text-white flex items-center justify-center text-xs">3</span>
                            1회 통화 최대 시간
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {["10분", "20분", "30분"].map((limit) => (
                                <button
                                    key={limit}
                                    onClick={() => setCallLimit(limit)}
                                    className={`px-4 py-4 rounded-xl border-2 text-base transition-all
                                        ${callLimit === limit
                                            ? "border-[#8FA963] bg-[#F1F6E8] font-bold text-[#4A5D23] shadow-sm"
                                            : "border-[#E1EAD3] bg-white text-[#6E7F4F] hover:border-[#C2D5A8]"
                                        }`}
                                >
                                    {limit}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 보호자 정책 */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-bold text-[#4A5D23] flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#8FA963] text-white flex items-center justify-center text-xs">4</span>
                            보호자 연동 정책
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {["보호자 등록 필수", "보호자 등록 선택"].map((policy) => (
                                <button
                                    key={policy}
                                    onClick={() => setGuardianPolicy(policy)}
                                    className={`px-4 py-4 rounded-xl border-2 text-base transition-all
                                        ${guardianPolicy === policy
                                            ? "border-[#8FA963] bg-[#F1F6E8] font-bold text-[#4A5D23] shadow-sm"
                                            : "border-[#E1EAD3] bg-white text-[#6E7F4F] hover:border-[#C2D5A8]"
                                        }`}
                                >
                                    {policy}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="pt-8 space-y-4">
                        <Link href="/onboarding/institution/step2-upload" className="block w-full">
                            <Button
                                disabled={!isValid}
                                className={`w-full h-18 text-xl font-bold rounded-2xl transition-all shadow-md
                                    ${isValid
                                        ? "bg-[#8FA963] text-white hover:bg-[#7A9351] hover:scale-[1.01]"
                                        : "bg-[#D7E3C5] text-[#7B8C5A] cursor-not-allowed opacity-70"
                                    }`}
                            >
                                다음 단계로 (명단 업로드)
                            </Button>
                        </Link>
                        <p className="text-sm text-[#7B8C5A] text-center font-medium leading-relaxed">
                            이 기준은 등록된 모든 대상자에게 기본 적용되며,<br />
                            등록 완료 후 대시보드에서 개별 수정이 가능합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
