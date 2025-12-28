"use client"

import {
    Bell,
    AlertTriangle,
    CheckCircle2,
    Clock,
    User,
    Search,
    Filter,
    ArrowUpRight,
    MessageSquare,
    ShieldAlert,
    PhoneCall,
    FileSearch
} from "lucide-react"

// --- Mock Data ---

const LOG_ENTRIES = [
    {
        id: "LOG-9821",
        time: "오늘 오전 10:45",
        type: "긴급 상황",
        user: "김영희",
        residentId: "U-1024",
        issue: "[AI 감지] '가슴 통증' 및 호흡 곤란 징후",
        response: "박지훈 사회복지사 현장 출동 및 119 연계 완료",
        status: "조치 완료",
        severity: "CRITICAL"
    },
    {
        id: "LOG-9819",
        time: "오늘 오전 09:12",
        type: "주의 필요",
        user: "이철수",
        residentId: "U-1025",
        issue: "[AI 감지] 답변 거부 및 실내 낙상 자동 추정",
        response: "최은지 담당자 유선 확인 결과 '스마트폰 낙하' 오탐으로 확인",
        status: "조치 완료",
        severity: "MEDIUM"
    },
    {
        id: "LOG-9815",
        time: "어제 16:30",
        type: "시스템",
        user: "SYSTEM",
        issue: "AI 케어 서버 정기 업데이트 완료 (v2.4.1)",
        response: "모든 통화 엔진 정상 동작 확인",
        status: "업데이트 완료",
        severity: "LOW"
    },
    {
        id: "LOG-9812",
        time: "2024.05.20 14:00",
        type: "일반 고지",
        user: "박순자",
        residentId: "U-1026",
        issue: "기분 상태 '매우 우울' 감지 (3회 연속)",
        response: "담당자 배정 및 내일 방문 상담 예약",
        status: "대기 중",
        severity: "MEDIUM"
    }
]

export default function AlertsLogPage() {
    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10 font-sans">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">알림 및 관제 대응 이력</h1>
                    <p className="text-slate-500 text-sm mt-0.5 font-semibold">긴급 상황 발생 기록 및 조치 내역 감사 로그 (Audit Trail)</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-3">
                        <FileSearch size={18} /> 통합 감사 리포트 출력
                    </button>
                </div>
            </header>

            {/* Toolbar Area */}
            <div className="px-8 pt-8 flex flex-col md:flex-row justify-between items-end gap-6 flex-shrink-0 font-sans">
                <div className="flex gap-2 p-2 bg-slate-100 rounded-[1.25rem] border border-slate-200 shadow-inner">
                    <LogFilter label="전체 이력" active />
                    <LogFilter label="긴급/주의" count={3} />
                    <LogFilter label="미확인 건" count={1} />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 font-black" />
                        <input
                            type="text"
                            placeholder="로그ID, 대상자 성함, 담당자 명으로 검색..."
                            className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-black transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
                        />
                    </div>
                    <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                        <Filter size={24} />
                    </button>
                </div>
            </div>

            {/* Log Timeline Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#F5F7FA]">
                <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
                    {LOG_ENTRIES.map((log) => (
                        <LogEntryCard key={log.id} log={log} />
                    ))}

                    <button className="w-full py-8 mt-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-white hover:border-slate-300 hover:text-slate-800 transition-all">
                        이전 관제 활동 기록 더 보기 (Load More)
                    </button>
                </div>
            </div>
        </>
    )
}

// --- Sub Components ---

function LogFilter({ label, count, active }: any) {
    return (
        <button className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active
            ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-200"
            : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
            }`}>
            {label} {count !== undefined && <span className="ml-1.5 opacity-40">({count})</span>}
        </button>
    )
}

function LogEntryCard({ log }: any) {
    const isCritical = log.severity === "CRITICAL"
    const isMedium = log.severity === "MEDIUM"

    return (
        <div className={`bg-white rounded-[2rem] border transition-all hover:translate-x-2 hover:shadow-2xl flex flex-col md:flex-row relative overflow-hidden group shadow-sm ring-1 ring-slate-200/50 ${isCritical ? "border-[#C05656]/20" : "border-slate-100"
            }`}>
            {/* Status Indicator Bar */}
            <div className={`w-2 flex-shrink-0 ${isCritical ? "bg-[#C05656]" : isMedium ? "bg-[#D9A34A]" : "bg-[#5A9A7D]"
                }`} />

            {/* Time & Meta (Left) */}
            <div className="p-8 md:w-64 flex-shrink-0 bg-slate-50/20 border-r border-slate-100 flex flex-col justify-between">
                <div>
                    <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block mb-1.5">{log.id}</span>
                    <div className="flex items-center gap-2 text-sm font-black text-slate-800 tracking-tight">
                        <Clock size={16} className="text-slate-300" /> {log.time}
                    </div>
                </div>
                <div className="mt-8">
                    <StatusBadge status={log.status} />
                </div>
            </div>

            {/* Content (Middle) */}
            <div className="p-8 flex-1 min-w-0 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-lg border uppercase tracking-widest ${isCritical ? "bg-[#FFF5F5] text-[#C05656] border-[#FAD2D2]" : "bg-slate-100 text-slate-500 border-slate-200"
                            }`}>
                            {log.type}
                        </span>
                        <h4 className="font-black text-slate-900 text-lg tracking-tight flex items-center gap-2 group-hover:text-[#4F5B75] transition-colors">
                            {log.user} 어르신 <span className="text-xs font-bold text-slate-400">({log.residentId})</span>
                        </h4>
                    </div>
                    <p className="text-base font-bold text-slate-700 leading-snug">{log.issue}</p>
                </div>

                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 relative group-hover:bg-white group-hover:border-slate-200 transition-all duration-300 shadow-inner">
                    <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm text-[#4F5B75] mt-0.5 ring-2 ring-slate-100 group-hover:bg-[#4F5B75] group-hover:text-white transition-all">
                            <ShieldAlert size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">담당 관제 대응 내역 (Response Log)</p>
                            <p className="text-sm font-bold text-slate-800 leading-relaxed italic">"{log.response}"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions (Right) */}
            <div className="p-8 md:w-56 flex-shrink-0 flex md:flex-col justify-center gap-3 border-l border-slate-50 relative z-10">
                <button className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={16} /> 원본 로그
                </button>
                {isCritical && (
                    <button className="flex-1 px-4 py-3 bg-[#C05656] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-[#A84A4A] transition-all flex items-center justify-center gap-2 font-sans">
                        <PhoneCall size={16} /> 담당 소환
                    </button>
                )}
                {!isCritical && (
                    <button className="flex-1 px-4 py-3 bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-slate-950 transition-all flex items-center justify-center gap-2">
                        <ArrowUpRight size={16} /> 기록 상세
                    </button>
                )}
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const isResolved = status === "조치 완료" || status === "업데이트 완료"
    const isPending = status === "대기 중"

    if (isResolved) {
        return (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 uppercase tracking-widest shadow-sm">
                <CheckCircle2 size={12} /> {status}
            </span>
        )
    }
    if (isPending) {
        return (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black text-[#D9A34A] bg-amber-50 border border-amber-100 uppercase tracking-widest shadow-sm">
                <AlertTriangle size={12} /> {status}
            </span>
        )
    }
    return (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black text-slate-500 bg-slate-100 border border-slate-200 uppercase tracking-widest">
            {status}
        </span>
    )
}
