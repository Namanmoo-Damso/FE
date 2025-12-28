"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InstitutionLandingPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] font-sans text-[#2F3E1F]">
            {/* HERO */}
            <section className="relative max-w-6xl mx-auto px-12 py-28 flex flex-col items-start text-left">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#E9F0DF] to-transparent -z-10" />
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#8FA963] opacity-10 rounded-full blur-3xl -z-10" />

                <div className="max-w-3xl space-y-10">
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-1.5 bg-[#8FA963] text-white text-sm font-bold rounded-full shadow-sm">
                            기관 전용 솔루션
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight">
                            독거 어르신 안부 확인,<br />
                            <span className="text-[#8FA963]">AI 담소</span>로 더 세심히.
                        </h1>
                    </div>

                    <p className="text-xl text-[#556B2F] leading-relaxed font-medium">
                        반복적인 안부 전화를 AI가 정해진 시간에 수행하고,<br />
                        담당자는 통화 결과와 이상 징후만 체계적으로 관리하세요.
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4">
                        <Link href="/institution/inquiry">
                            <Button
                                size="xl"
                                className="px-10 shadow-lg transition-transform hover:scale-105 active:scale-95"
                            >
                                도입 문의하기
                            </Button>
                        </Link>

                        <Link href="/institution/workspace/dashboard">
                            <Button
                                variant="outline"
                                size="xl"
                                className="px-10 border-2 border-[#8FA963] text-[#4A5D23] bg-white hover:bg-[#F1F6E8] shadow-sm font-bold"
                            >
                                관리자 로그인
                            </Button>
                        </Link>

                        <div className="w-full" />

                        <Link href="/onboarding/institution/step1-criteria">
                            <p className="text-sm font-bold text-[#8FA963] hover:underline cursor-pointer flex items-center gap-1">
                                온보딩 과정 미리보기 <span className="text-xs">→</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* COMPARISON */}
            <section className="max-w-6xl mx-auto px-12 py-24 border-y border-[#E1EAD3]">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* 기존 방식 */}
                    <div className="p-8 rounded-3xl bg-white/40 border border-[#E1EAD3] space-y-6">
                        <h2 className="text-2xl font-bold text-[#7B8C5A] flex items-center gap-2">
                            <span>❌</span> 기존 방식
                        </h2>
                        <ul className="space-y-4 text-lg text-[#6E7F4F]">
                            <li className="flex items-start gap-2">• 담당자가 수백 명에게 직접 전화</li>
                            <li className="flex items-start gap-2">• 통화 내용 수기 기록으로 인한 업무 과부화</li>
                            <li className="flex items-start gap-2">• 육안으로만 식별 가능한 위험 징후들</li>
                        </ul>
                    </div>

                    {/* 담소 방식 */}
                    <div className="p-8 rounded-3xl bg-[#8FA963]/5 border-2 border-[#8FA963]/20 space-y-6">
                        <h2 className="text-2xl font-bold text-[#4A5D23] flex items-center gap-2">
                            <span>✅</span> 담소 도입 후
                        </h2>
                        <ul className="space-y-4 text-lg text-[#556B2F] font-medium">
                            <li className="flex items-start gap-2">• AI가 스케줄에 따라 동시 자동 통화</li>
                            <li className="flex items-start gap-2">• 통화 요약 및 키워드 자동 분석·정리</li>
                            <li className="flex items-start gap-2">• 이상 감지 시 담당자 대시보드 즉시 호출</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="bg-white py-28">
                <div className="max-w-6xl mx-auto px-12">
                    <div className="grid md:grid-cols-3 gap-12">
                        <Feature
                            icon="📊"
                            title="대상자 통합 관리"
                            desc="전체 등록 인원의 통화 이력과 상태를 실시간 대시보드에서 효율적으로 파악합니다."
                        />
                        <Feature
                            icon="⚡"
                            title="위기 대응 최적화"
                            desc="AI가 위험 발화를 감지하면 담당자에게 알림을 보내며 즉각적인 개입을 돕습니다."
                        />
                        <Feature
                            icon="📜"
                            title="자동 보고 체계"
                            desc="통화 데이터가 문서화되어 저장되므로 관리 직무의 기록 업무를 80% 이상 단축합니다."
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center bg-gradient-to-b from-white to-[#F7F9F2]">
                <div className="max-w-3xl mx-auto space-y-10 px-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#2F3E1F] leading-tight">
                        더 효율적이고 따뜻한<br />
                        지역사회를 함께 만듭니다.
                    </h2>

                    <Link href="/institution/inquiry" className="inline-block">
                        <Button
                            size="xxl"
                            className="px-16 shadow-2xl hover:scale-105 transition-transform"
                        >
                            기관용 담소 상담 신청
                        </Button>
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-[#E1EAD3] py-12 bg-white text-center">
                <p className="text-[#4A5D23] font-bold mb-2">Damsō for Communities</p>
                <p className="text-sm text-[#7B8C5A]">
                    © 담소 · 기관 전용 어르신 안부 확인 서비스
                </p>
            </footer>
        </div>
    )
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <div className="space-y-4 p-2">
            <div className="text-4xl">{icon}</div>
            <h3 className="text-2xl font-bold text-[#4A5D23]">{title}</h3>
            <p className="text-lg text-[#6E7F4F] leading-relaxed">{desc}</p>
        </div>
    )
}
