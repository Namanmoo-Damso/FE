"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function InstitutionInquiryPage() {
    const [orgType, setOrgType] = useState<string | null>(null)
    const [orgName, setOrgName] = useState("")
    const [region, setRegion] = useState("")
    const [managerName, setManagerName] = useState("")
    const [managerContact, setManagerContact] = useState("")
    const [note, setNote] = useState("")

    const isValid = orgType && orgName && managerName && managerContact

    return (
        <div className="min-h-screen bg-[#F7F9F2] font-sans px-8 py-16 text-[#2F3E1F]">
            <div className="max-w-2xl mx-auto space-y-12">
                {/* Back Link */}
                <Link href="/institution" className="inline-flex items-center gap-2 text-[#7B8C5A] hover:text-[#4A5D23] transition-colors font-medium">
                    <ArrowLeft className="w-5 h-5" />
                    랜딩페이지로 돌아가기
                </Link>

                {/* 헤더 */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        기관 도입 문의
                    </h1>
                    <p className="text-xl text-[#6E7F4F] leading-relaxed font-medium">
                        담소 도입을 고민 중이신가요?<br />
                        정보를 남겨주시면 담당자가 빠른 시일 내에 연락드리겠습니다.
                    </p>
                </div>

                <div className="space-y-10 bg-white p-10 rounded-3xl shadow-sm border border-[#E1EAD3]">
                    {/* 기관 유형 */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-[#4A5D23]">
                            기관 유형 <span className="text-red-500">*</span>
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                "지자체 · 행정기관",
                                "위탁기관 · 복지법인",
                                "요양시설 · 복지관",
                                "기타 단체",
                            ].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setOrgType(type)}
                                    className={`
                                        px-4 py-4 rounded-xl border-2 text-base transition-all
                                        ${orgType === type
                                            ? "border-[#8FA963] bg-[#F1F6E8] text-[#4A5D23] font-bold shadow-sm"
                                            : "border-[#E1EAD3] bg-white text-[#6E7F4F] hover:border-[#C2D5A8]"
                                        }
                                    `}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 상세 정보 */}
                    <div className="space-y-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-[#7B8C5A] mb-2 uppercase tracking-wider">
                                    기관명 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    placeholder="정확한 기관명을 입력해주세요"
                                    className="w-full px-5 py-4 text-lg rounded-xl border-2 border-[#E1EAD3] focus:outline-none focus:border-[#8FA963] bg-[#F7F9F2]/30 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#7B8C5A] mb-2 uppercase tracking-wider">
                                    담당 지역 (선택)
                                </label>
                                <input
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    placeholder="예) 서울특별시 서대문구 전역"
                                    className="w-full px-5 py-4 text-lg rounded-xl border-2 border-[#E1EAD3] focus:outline-none focus:border-[#8FA963] bg-[#F7F9F2]/30 transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#F1F6E8] space-y-6">
                            <h2 className="text-lg font-bold text-[#4A5D23]">담당자 연락처</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#7B8C5A] mb-2 uppercase tracking-wider">
                                        성함 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={managerName}
                                        onChange={(e) => setManagerName(e.target.value)}
                                        placeholder="담당자 성함"
                                        className="w-full px-5 py-4 text-lg rounded-xl border-2 border-[#E1EAD3] focus:outline-none focus:border-[#8FA963] bg-[#F7F9F2]/30 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#7B8C5A] mb-2 uppercase tracking-wider">
                                        연락처 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={managerContact}
                                        onChange={(e) => setManagerContact(e.target.value)}
                                        placeholder="이메일 또는 전화번호"
                                        className="w-full px-5 py-4 text-lg rounded-xl border-2 border-[#E1EAD3] focus:outline-none focus:border-[#8FA963] bg-[#F7F9F2]/30 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#7B8C5A] mb-2 uppercase tracking-wider">
                                상세 문의 내용 (선택)
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="대상자 수, 운영 중인 사업, 필요한 기능 등을 적어주세요."
                                rows={4}
                                className="w-full px-5 py-4 text-lg rounded-xl border-2 border-[#E1EAD3] focus:outline-none focus:border-[#8FA963] bg-[#F7F9F2]/30 transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6">
                        <Button
                            disabled={!isValid}
                            className={`
                                w-full h-18 text-xl font-bold rounded-2xl transition-all shadow-md
                                ${isValid
                                    ? "bg-[#8FA963] text-white hover:bg-[#7A9351] hover:scale-[1.01]"
                                    : "bg-[#D7E3C5] text-[#7B8C5A] cursor-not-allowed opacity-70"
                                }
                            `}
                        >
                            신청 완료하기
                        </Button>

                        <p className="mt-6 text-sm text-[#7B8C5A] text-center leading-relaxed font-medium">
                            문의 접수 시 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.<br />
                            담당자가 검토 후 1~2영업일 이내로 연락드리겠습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
