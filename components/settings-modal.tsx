"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TimePicker } from "./time-picker"
import { Settings } from "lucide-react"

export function SettingsModal() {
    const [callTime, setCallTime] = useState("10:00")
    const [volumeLevel, setVolumeLevel] = useState(80)
    const [planType, setPlanType] = useState("basic")
    const [guardianName, setGuardianName] = useState("홍길동")

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex flex-col items-center text-[#9CA3AF]">
                    <Settings className="w-8 h-8" />
                    <span className="text-sm font-bold mt-1">설정</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#4A5D23] text-center mb-4">
                        설정
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-10 py-6">
                    {/* ================= 상단: 어르신 체감 설정 ================= */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#4A5D23]">
                            통화 설정
                        </h3>

                        {/* 전화 받는 시간 */}
                        <div className="space-y-3">
                            <p className="text-lg font-medium text-[#556B2F]">
                                다미의 안부 전화 시간
                            </p>
                            <div className="pt-2">
                                <TimePicker
                                    value={callTime}
                                    onChange={setCallTime}
                                />
                            </div>
                            <p className="text-sm text-[#7B8C5A] text-center bg-[#F7F9F2] p-2 rounded-lg">
                                매일 이 시간에 다미가 안부 전화를 드릴게요.
                            </p>
                        </div>

                        {/* 음성 크기 */}
                        <div className="space-y-3">
                            <p className="text-lg font-medium text-[#556B2F]">
                                다미 목소리 크기
                            </p>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={volumeLevel}
                                onChange={(e) => setVolumeLevel(Number(e.target.value))}
                                className="w-full accent-[#8FA963]"
                            />
                            <p className="text-sm text-[#7B8C5A]">
                                현재 {volumeLevel}%
                            </p>
                        </div>
                    </section>

                    {/* ================= 하단: 이용 / 연결 관리 ================= */}
                    <section className="space-y-6 pt-6 border-t border-[#D7E3C5]">
                        <h3 className="text-xl font-semibold text-[#4A5D23]">
                            이용 및 연결 관리
                        </h3>

                        {/* 통화 이용 방식 */}
                        <div className="space-y-3">
                            <p className="text-lg font-medium text-[#556B2F]">
                                통화 이용 방식
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { key: "basic", label: "기본 안부 통화" },
                                    { key: "extended", label: "자유 통화 포함" },
                                ].map((opt) => (
                                    <button
                                        key={opt.key}
                                        onClick={() => setPlanType(opt.key)}
                                        className={`px-4 py-3 rounded-xl border-2 text-lg
                      ${planType === opt.key
                                                ? "bg-[#8FA963] border-[#8FA963] text-white"
                                                : "bg-white border-[#C2D5A8] text-[#556B2F]"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-[#7B8C5A]">
                                이 설정은 보호자와 함께 변경할 수 있어요
                            </p>
                        </div>

                        {/* 보호자 연결 */}
                        <div className="space-y-3">
                            <p className="text-lg font-medium text-[#556B2F]">
                                보호자 연결
                            </p>
                            <Button
                                variant="outline"
                                className="w-full h-14 text-lg justify-between"
                            >
                                <span>
                                    보호자 {guardianName ? "연결됨" : "미연결"}
                                </span>
                                <span className="text-[#8FA963]">
                                    연결하기 →
                                </span>
                            </Button>
                        </div>

                        {/* 기관 연결 */}
                        <div className="space-y-3">
                            <p className="text-lg font-medium text-[#556B2F]">
                                지원 기관
                            </p>
                            <Button
                                variant="outline"
                                className="w-full h-14 text-lg justify-between"
                            >
                                <span>
                                    기관 {false ? "연결됨" : "미연결"}
                                </span>
                                <span className="text-[#8FA963]">
                                    연결하기 →
                                </span>
                            </Button>
                        </div>
                    </section>

                    {/* 저장 */}
                    <Button className="w-full h-16 text-xl font-bold bg-[#8FA963] text-white rounded-xl">
                        저장하기
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
