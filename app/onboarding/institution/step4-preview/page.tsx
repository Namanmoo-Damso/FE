"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

const dummyRows = Array.from({ length: 30 }).map((_, i) => ({
    name: `김OO${i + 1}`,
    phone: "010-****-" + String(1000 + i),
    birth: "194" + (i % 10) + "-0" + ((i % 9) + 1) + "-15",
    region: "서울 " + (i % 5 === 0 ? "서대문구" : "용산구"),
    disease: i % 3 === 0 ? "고혈압" : i % 5 === 0 ? "당뇨" : "-",
    medication: i % 2 === 0 ? "복용 중" : "해당 없음",
    guardian: i % 4 === 0 ? "연동 완료" : "미연동",
}))

export default function InstitutionOnboardingPreview() {
    return (
        <div className="min-h-screen bg-[#F7F9F2] font-sans px-10 py-16 text-[#2F3E1F]">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#E1EAD3] rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-[#8FA963]" />
                </div>

                {/* 헤더 */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        등록 데이터 검토
                    </h1>
                    <p className="text-xl text-[#6E7F4F] font-medium font-medium">
                        매칭된 결과에 맞춰 데이터가 올바르게 준비되었습니다.<br />
                        등록 전에 샘플 정보를 확인해 주세요.
                    </p>
                </div>

                {/* 요약 현황 */}
                <div className="grid grid-cols-3 gap-6">
                    <SummaryCard label="총 등록 전송 인원" value={`${dummyRows.length}명`} icon="👤" />
                    <SummaryCard label="필수 정보 정상 여부" value="정상" icon="✅" color="text-[#8FA963]" />
                    <SummaryCard label="데이터 분석 완료" value="자동 분석 대기" icon="⚙️" />
                </div>

                {/* 데이터 테이블 */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-lg font-bold text-[#4A5D23]">데이터 미리보기 (상위 30건)</h2>
                        <span className="text-sm text-[#7B8C5A]">개인정보는 마스킹 처리되었습니다.</span>
                    </div>

                    <div className="bg-white rounded-[32px] shadow-sm border border-[#E1EAD3] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#F1F6E8]/70 border-b border-[#E1EAD3]">
                                    <tr>
                                        {["이름", "연락처", "생년월일", "거주 지역", "주요 지병", "복약 여부", "보호자"].map((h) => (
                                            <th key={h} className="px-6 py-5 text-sm font-bold text-[#4A5D23] whitespace-nowrap">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dummyRows.map((row, idx) => (
                                        <tr key={idx} className="border-b border-[#F1F6E8] hover:bg-[#F7F9F2] transition-colors">
                                            <td className="px-6 py-4 font-bold text-[#4A5D23]">{row.name}</td>
                                            <td className="px-6 py-4 text-[#6E7F4F]">{row.phone}</td>
                                            <td className="px-6 py-4 text-[#6E7F4F]">{row.birth}</td>
                                            <td className="px-6 py-4 text-[#6E7F4F]">{row.region}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.disease !== '-' ? 'bg-[#E9F0DF] text-[#4A5D23]' : 'text-[#C2D5A8]'}`}>
                                                    {row.disease}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-[#6E7F4F]">{row.medication}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-sm font-medium ${row.guardian === '연동 완료' ? 'text-[#8FA963]' : 'text-[#7B8C5A]'}`}>
                                                    {row.guardian}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 경고/알림 */}
                <div className="bg-[#FFF4F4] p-6 rounded-3xl border border-red-100 flex gap-4">
                    <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800 leading-relaxed font-medium">
                        등록 완료 후에는 대량 삭제가 번거로울 수 있습니다. 업로드된 대상이 우리 기관 소속이 맞는지 다시 한번 확인해 주세요.
                    </p>
                </div>

                {/* CTA */}
                <div className="pt-4 flex gap-4">
                    <Link href="/onboarding/institution/step3-mapping" className="flex-1">
                        <Button variant="outline" className="w-full h-18 text-xl font-bold rounded-2xl border-2 border-[#E1EAD3]">
                            이전으로 (매칭 수정)
                        </Button>
                    </Link>
                    <Link href="/onboarding/institution/complete" className="flex-[2]">
                        <Button className="w-full h-18 text-xl font-bold rounded-2xl bg-[#8FA963] text-white hover:bg-[#7A9351] shadow-lg">
                            이대로 최종 등록하기
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

function SummaryCard({ label, value, icon, color = "text-[#4A5D23]" }: { label: string; value: string; icon: string; color?: string }) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#E1EAD3] flex items-center gap-5">
            <div className="text-4xl bg-[#F7F9F2] w-16 h-16 rounded-2xl flex items-center justify-center border border-[#F1F6E8]">
                {icon}
            </div>
            <div>
                <p className="text-sm font-bold text-[#7B8C5A]">{label}</p>
                <p className={`text-2xl font-black ${color}`}>{value}</p>
            </div>
        </div>
    )
}
