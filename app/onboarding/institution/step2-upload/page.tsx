"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X } from "lucide-react"

export default function InstitutionOnboardingUpload() {
    const [file, setFile] = useState<File | null>(null)

    return (
        <div className="min-h-screen bg-[#F7F9F2] font-sans px-10 py-16 text-[#2F3E1F]">
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#E1EAD3] rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-[#8FA963]" />
                </div>

                {/* 헤더 */}
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
                        대상자 명단 업로드
                    </h1>
                    <p className="text-xl text-[#6E7F4F] font-medium">
                        관리하실 어르신들의 명단 파일을 등록해 주세요.<br />
                        엑셀(XLSX) 또는 CSV 파일 모두 가능합니다.
                    </p>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#E1EAD3] space-y-10">
                    {/* 업로드 영역 */}
                    <div className="space-y-4">
                        <label
                            className={`
                                flex flex-col items-center justify-center
                                h-72
                                rounded-2xl
                                border-3 border-dashed
                                transition-all cursor-pointer
                                ${file
                                    ? "bg-[#F1F6E8] border-[#8FA963]"
                                    : "bg-[#F7F9F2]/50 border-[#C2D5A8] hover:bg-[#F1F6E8] hover:border-[#8FA963]"
                                }
                            `}
                        >
                            <input
                                type="file"
                                accept=".csv,.xlsx"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />

                            <div className="flex flex-col items-center text-center space-y-4 p-8">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${file ? 'bg-[#8FA963] text-white' : 'bg-white text-[#C2D5A8]'}`}>
                                    {file ? <FileText className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-[#4A5D23]">
                                        {file ? file.name : "파일 선택 또는 드래그"}
                                    </p>
                                    <p className="text-base text-[#7B8C5A]">
                                        {file ? `${(file.size / 1024).toFixed(1)} KB` : "최근에 사용하시던 대상자 명단 파일을 올려주세요"}
                                    </p>
                                </div>
                                {file && (
                                    <button
                                        onClick={(e) => { e.preventDefault(); setFile(null); }}
                                        className="text-sm font-bold text-red-500 hover:text-red-700 underline underline-offset-4"
                                    >
                                        파일 제거하기
                                    </button>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* 안내 섹션 */}
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="p-5 bg-[#F7F9F2] rounded-2xl border border-[#E1EAD3]">
                            <h3 className="font-bold text-[#4A5D23] mb-2 flex items-center gap-2">
                                <span className="text-xl">📊</span> 양식 자유도
                            </h3>
                            <p className="text-sm text-[#7B8C5A] leading-relaxed">
                                이름과 연락처만 포함되어 있다면 어떤 양식이라도 괜찮습니다. 다음 단계에서 항목을 매칭합니다.
                            </p>
                        </div>
                        <div className="p-5 bg-[#F7F9F2] rounded-2xl border border-[#E1EAD3]">
                            <h3 className="font-bold text-[#4A5D23] mb-2 flex items-center gap-2">
                                <span className="text-xl">🛡️</span> 데이터 보안
                            </h3>
                            <p className="text-sm text-[#7B8C5A] leading-relaxed">
                                업로드된 데이터는 암호화되어 안전하게 보관되며 외부로 절대 유출되지 않습니다.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6">
                        <Link href="/onboarding/institution/step3-mapping" className="block w-full">
                            <Button
                                disabled={!file}
                                className={`w-full h-18 text-xl font-bold rounded-2xl transition-all shadow-md
                                    ${file
                                        ? "bg-[#8FA963] text-white hover:bg-[#7A9351] hover:scale-[1.01]"
                                        : "bg-[#D7E3C5] text-[#7B8C5A] cursor-not-allowed opacity-70"
                                    }`}
                            >
                                다음 단계로 (항목 매칭하기)
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
