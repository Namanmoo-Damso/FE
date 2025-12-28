"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, LayoutDashboard, Users, HeartPulse, ShieldCheck } from "lucide-react"

export default function InstitutionOnboardingComplete() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] font-sans px-10 py-20 text-[#2F3E1F]">
            <div className="max-w-4xl mx-auto space-y-14 text-center">
                {/* Success Animation Area */}
                <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#8FA963] opacity-20 blur-3xl rounded-full scale-150 animate-pulse" />
                        <CheckCircle2 className="w-24 h-24 text-[#8FA963] relative z-10" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-5xl font-black text-[#4A5D23] tracking-tight">
                            등록이 완료되었습니다!
                        </h1>
                        <p className="text-2xl text-[#6E7F4F] font-medium leading-relaxed">
                            이제 담소가 AI 동료로서<br />
                            어르신들의 안부를 챙기기 시작합니다.
                        </p>
                    </div>
                </div>

                {/* 요약 및 통계 그리드 */}
                <div className="grid grid-cols-4 gap-4 pt-4">
                    <ResultCard label="총 등록 인원" value="30명" icon={<Users className="w-5 h-5" />} />
                    <ResultCard label="건강 체크 대상" value="18명" icon={<HeartPulse className="w-5 h-5" />} />
                    <ResultCard label="보호자 알림 대상" value="12명" icon={<ShieldCheck className="w-5 h-5" />} />
                    <ResultCard label="데이터 무결성" value="완벽" icon={<CheckCircle2 className="w-5 h-5" />} green />
                </div>

                {/* 다음 안내 (정보성 영역) */}
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-[#E1EAD3] space-y-8 text-left max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold text-[#4A5D23] border-b border-[#F1F6E8] pb-4">앞으로의 일정</h2>
                    <div className="space-y-6">
                        <StepInfo
                            num="1"
                            title="전화 발신 스케줄링"
                            desc="설정하신 운영 기준에 따라 내일부터 순차적으로 AI 전화가 시작됩니다."
                        />
                        <StepInfo
                            num="2"
                            title="대시보드 실시간 업데이트"
                            desc="통화가 종료되는 대로 대시보드에서 요약 리포트와 분석 결과를 확인할 수 있습니다."
                        />
                        <StepInfo
                            num="3"
                            title="위험 상황 즉시 알림"
                            desc="이상 징후가 발견되면 담당자 계정으로 실시간 긴급 알림이 전송됩니다."
                        />
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-8 space-y-4 max-w-md mx-auto">
                    <Link href="/guardian/dashboard">
                        <Button
                            size="xxl"
                            className="w-full h-20 text-3xl font-black rounded-3xl bg-[#8FA963] text-white hover:bg-[#7A9351] shadow-2xl transition-all hover:scale-105"
                        >
                            <LayoutDashboard className="w-8 h-8 mr-3" />
                            대시보드로 시작하기
                        </Button>
                    </Link>
                    <p className="text-[#7B8C5A] font-bold text-sm tracking-wide">
                        관리자 대시보드는 PC 환경에서 보시는 것을 추천드립니다.
                    </p>
                </div>
            </div>
        </div>
    )
}

function ResultCard({ label, value, icon, green = false }: { label: string; value: string; icon: React.ReactNode, green?: boolean }) {
    return (
        <div className="bg-white p-5 rounded-3xl border border-[#E1EAD3] shadow-sm space-y-2">
            <div className="flex items-center justify-center text-[#8FA963] mb-1 opacity-80">
                {icon}
            </div>
            <p className="text-xs font-bold text-[#7B8C5A]">{label}</p>
            <p className={`text-xl font-black ${green ? 'text-[#8FA963]' : 'text-[#4A5D23]'}`}>{value}</p>
        </div>
    )
}

function StepInfo({ num, title, desc }: { num: string; title: string, desc: string }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#8FA963]/10 text-[#8FA963] flex items-center justify-center font-black shrink-0">
                {num}
            </div>
            <div>
                <p className="font-bold text-[#4A5D23]">{title}</p>
                <p className="text-[#6E7F4F] text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
