"use client"

import { useState } from "react"
import {
    Search,
    Phone,
    Mic,
    ScanFace,
    User,
    Video,
    Volume2
} from "lucide-react"

// --- Types & Mock Data ---

type AlertType = "EMERGENCY" | "CAUTION" | "NORMAL"

interface MonitoredUser {
    id: string
    name: string
    age: number
    status: AlertType
    aiAnalysis: {
        type: "FACE" | "VOICE" | "NONE"
        message: string
        timestamp: string
    }
    isOnline: boolean
}

const MOCK_USERS: MonitoredUser[] = [
    {
        id: "U-101",
        name: "박영자",
        age: 78,
        status: "EMERGENCY",
        isOnline: true,
        aiAnalysis: {
            type: "VOICE",
            message: "비명 소리 및 '살려줘' 감지",
            timestamp: "방금 전",
        },
    },
    {
        id: "U-104",
        name: "김철수",
        age: 82,
        status: "CAUTION",
        isOnline: true,
        aiAnalysis: {
            type: "FACE",
            message: "안면 비대칭 징후 감지",
            timestamp: "2분 전",
        },
    },
    {
        id: "U-102",
        name: "이순재",
        age: 80,
        status: "NORMAL",
        isOnline: true,
        aiAnalysis: {
            type: "NONE",
            message: "특이사항 없음",
            timestamp: "-",
        },
    },
    {
        id: "U-105",
        name: "정말숙",
        age: 75,
        status: "CAUTION",
        isOnline: true,
        aiAnalysis: {
            type: "VOICE",
            message: "반복적인 신음 소리",
            timestamp: "5분 전",
        },
    },
    {
        id: "U-103",
        name: "최옥분",
        age: 77,
        status: "NORMAL",
        isOnline: false,
        aiAnalysis: {
            type: "NONE",
            message: "연결 대기 중",
            timestamp: "-",
        },
    },
]

export default function InstitutionMonitoringPage() {
    const [filter, setFilter] = useState<AlertType | "ALL">("ALL")

    const filteredList = MOCK_USERS.filter((u) => {
        if (filter === "ALL") return true
        return u.status === filter
    }).sort((a, b) => {
        const score = { EMERGENCY: 3, CAUTION: 2, NORMAL: 1 }
        return score[b.status] - score[a.status]
    })

    const stats = {
        emergency: MOCK_USERS.filter(u => u.status === "EMERGENCY").length,
        caution: MOCK_USERS.filter(u => u.status === "CAUTION").length,
        online: MOCK_USERS.filter(u => u.isOnline).length,
    }

    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">실시간 모니터링</h1>
                    <p className="text-slate-500 text-sm mt-0.5 font-semibold">관리 대상자의 실시간 영상 및 AI 이상 징후 분석</p>
                </div>

                <div className="flex items-center gap-6">
                    {/* Status Filter */}
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
                        <FilterTab label="전체" count={stats.online} active={filter === "ALL"} onClick={() => setFilter("ALL")} />
                        <FilterTab label="긴급" count={stats.emergency} active={filter === "EMERGENCY"} onClick={() => setFilter("EMERGENCY")} type="EMERGENCY" />
                        <FilterTab label="주의" count={stats.caution} active={filter === "CAUTION"} onClick={() => setFilter("CAUTION")} type="CAUTION" />
                    </div>

                    <div className="relative hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 font-black" />
                        <input
                            type="text"
                            placeholder="이름으로 검색"
                            className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-slate-300 font-semibold transition-all shadow-sm"
                        />
                    </div>
                </div>
            </header>

            {/* Monitoring Grid */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#F5F7FA]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {filteredList.map((user) => (
                        <UserMonitoringCard key={user.id} user={user} />
                    ))}
                    {filteredList.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-slate-400 font-black text-lg italic tracking-widest uppercase">현재 필터에 해당하는 대상자가 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

// --- Sub Components ---

function FilterTab({ label, count, active, onClick, type = "NORMAL" }: any) {
    let activeClass = "bg-white text-slate-900 shadow-md ring-1 ring-slate-200"
    let inactiveClass = "text-slate-500 hover:text-slate-900 hover:bg-white/50"

    if (active) {
        if (type === "EMERGENCY") activeClass = "bg-[#C05656] text-white shadow-lg shadow-red-100"
        if (type === "CAUTION") activeClass = "bg-[#D9A34A] text-white shadow-lg shadow-amber-50"
    }

    return (
        <button
            onClick={onClick}
            className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-[0.05em] transition-all duration-300 flex items-center gap-2 ${active ? activeClass : inactiveClass}`}
        >
            {label}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${active ? "bg-black/10 text-white" : "bg-slate-200 text-slate-600"}`}>
                {count}
            </span>
        </button>
    )
}

function UserMonitoringCard({ user }: { user: MonitoredUser }) {
    const isEmergency = user.status === "EMERGENCY"
    const isCaution = user.status === "CAUTION"

    const borderColor = isEmergency ? "border-[#C05656] ring-4 ring-red-500/10" : isCaution ? "border-[#D9A34A] shadow-amber-50 shadow-lg" : "border-slate-200"

    let statusBadge = (
        <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
            정상 작동
        </span>
    )
    if (isEmergency) {
        statusBadge = (
            <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-[#C05656] text-white animate-pulse shadow-lg shadow-red-100">
                긴급 상황
            </span>
        )
    } else if (isCaution) {
        statusBadge = (
            <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-[#D9A34A] text-white shadow-md shadow-amber-50">
                위험 감지
            </span>
        )
    }

    return (
        <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${borderColor}`}>

            {/* Header */}
            <div className="p-5 flex items-center justify-between bg-white border-b border-slate-50 relative z-10">
                <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner">
                        <User size={22} />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-black text-slate-900 tracking-tight text-base truncate">
                            {user.name} 어르신 <span className="font-bold text-xs text-slate-400 bg-slate-50 px-1.5 py-0.5 border rounded ml-1">{user.age}세</span>
                        </h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">UID: {user.id}</p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    {statusBadge}
                </div>
            </div>

            {/* Video Area */}
            <div className="relative w-full bg-slate-950 aspect-[4/3] group overflow-hidden">
                {user.isOnline ? (
                    <>
                        {/* Feed Simulation */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-0"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-5">
                            <Video size={100} className="text-white" />
                        </div>

                        {/* Live Indicator */}
                        <div className="absolute top-5 left-5 z-10">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white font-black tracking-widest border border-white/20">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                LIVE FEED
                            </div>
                        </div>

                        {/* AI Overlay (Bottom) */}
                        {(isEmergency || isCaution) && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/85 backdrop-blur-xl p-5 border-t border-white/10 animate-in slide-in-from-bottom-full duration-500">
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 p-2 rounded-xl ${isEmergency ? "bg-[#C05656] text-white" : "bg-[#D9A34A] text-white"}`}>
                                        {user.aiAnalysis.type === "VOICE" ? <Mic size={18} /> : <ScanFace size={18} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black text-white/50 uppercase tracking-[0.1em] mb-1">AI DETECTED LOG</p>
                                        <p className="text-white text-base leading-snug font-bold">
                                            {user.aiAnalysis.message}
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter mt-1">{user.aiAnalysis.timestamp}</span>
                                </div>
                            </div>
                        )}

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                            <button className="bg-white/95 text-slate-900 font-extrabold text-xs px-6 py-3 rounded-full uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                                전체 화면 확대 (Zoom)
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 border-y border-slate-800 text-slate-600 gap-4">
                        <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center">
                            <Video size={32} className="opacity-30" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">피드 오프라인</span>
                    </div>
                )}
            </div>

            {/* Footer Action */}
            <div className="p-5 bg-white border-t border-slate-100">
                <button
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${isEmergency
                        ? "bg-[#C05656] text-white hover:bg-[#A84A4A] shadow-xl shadow-red-100 ring-4 ring-red-500/10"
                        : "bg-[#4F5B75] text-white hover:bg-[#3D475C] hover:shadow-slate-200 hover:shadow-xl"
                        }`}
                >
                    <Phone size={18} className={isEmergency ? "animate-bounce" : ""} />
                    긴급 상황 대응 전파 (Alert)
                </button>
            </div>
        </div>
    )
}
