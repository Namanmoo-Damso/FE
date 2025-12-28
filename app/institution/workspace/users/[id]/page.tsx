"use client"

import {
    Bot,
    Phone,
    MapPin,
    Activity,
    Pill,
    FileText,
    MoreHorizontal,
    Edit,
    ArrowLeft,
    Heart,
    AlertTriangle,
    PhoneCall,
    CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// --- Mock Data ---

const USER_DETAIL = {
    id: "U-1024",
    name: "김영희",
    age: 82,
    gender: "여성",
    address: "서울특별시 성북구 정릉동 102-3 (2층)",
    riskLevel: "HIGH",
    status: "ONLINE",
    careLevel: "장기요양 3등급 (재가)",
    conditions: ["고혈압", "초기 치매", "관절염"],
    medications: ["혈압약 (아침)", "관절 보조제 (저녁)"],
    guardian: {
        name: "박철수 (장남)",
        phone: "010-9999-8888",
        relation: "비동거 (차량 30분 거리)"
    },
    manager: "박지훈 (사회복지사)",
    aiInsight: {
        lastCall: "오늘 오전 09:30",
        sentiment: "약간 우울",
        keywords: ["어지러움", "입맛 없음", "비 소식"],
        summary: "일어난 직후 약간의 어지러움을 호소했으나, 약 복용 후에 쉬겠다고 답변함. 비가 와서 경로당에 못 가는 것에 대해 아쉬움을 표현함."
    },
    history: [
        { type: "CALL", time: "오늘 09:30", title: "AI 오전 안부 전화", desc: "통화 성공 (3분 40초)", result: "어지러움 증상 보고됨" },
        { type: "ALERT", time: "어제 14:00", title: "낙상 위험 감지", desc: "거실 소파 근처 충격 감지됨", result: "오탐 확인 (물건 떨어뜨림)" },
        { type: "MEMO", time: "2024.05.18", title: "사회복지사 방문", desc: "식사 배달 및 약 복용 지도 완료", result: "작성자: 박지훈" },
        { type: "CALL", time: "2024.05.18", title: "AI 저녁 안부 전화", desc: "통화 성공 (2분 10초)", result: "특이사항 없음" },
    ]
}

export default function UserDetailPage() {
    const params = useParams()
    const id = params.id

    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10 font-sans">
                <div className="flex items-center gap-5">
                    <Link href="/institution/workspace/users">
                        <button className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-all border border-transparent hover:border-slate-200 shadow-sm">
                            <ArrowLeft size={22} />
                        </button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                                {USER_DETAIL.name} 어르신
                                <span className="text-xs font-black text-slate-400 uppercase ml-3 bg-slate-100 px-2 py-1 rounded border border-slate-200">UID: {id}</span>
                            </h1>
                            <RiskBadge level={USER_DETAIL.riskLevel} />
                        </div>
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-1 uppercase tracking-tight">
                            <MapPin size={14} className="text-slate-300" /> {USER_DETAIL.address}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2">
                        <Edit size={18} className="text-slate-400" /> 정보 상세 수정
                    </button>
                    <button className="px-6 py-3 bg-[#C05656] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#A84A4A] shadow-xl shadow-red-100 transition-all flex items-center gap-2 font-sans">
                        <PhoneCall size={18} className="animate-pulse" /> 비상 연락 가동
                    </button>
                </div>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#F5F7FA]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* --- Left Column: Health Profile --- */}
                    <div className="space-y-10">

                        {/* Profile Info */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm flex flex-col items-center text-center relative overflow-hidden ring-1 ring-slate-200/50 font-sans">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A9A7D]/5 rounded-bl-[3rem] -mr-16 -mt-16" />

                            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-slate-300 mb-8 border-4 border-white shadow-2xl ring-1 ring-slate-100 relative group overflow-hidden transition-all hover:scale-105">
                                <UserIcon size={72} className="group-hover:opacity-0 transition-opacity" />
                                <div className="absolute inset-0 bg-[#4F5B75] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black uppercase tracking-widest">사진 변경</div>
                            </div>

                            <div className="mb-10 font-sans">
                                <span className="inline-block px-4 py-1.5 bg-emerald-50 text-xs font-black text-emerald-700 rounded-full border border-emerald-100 uppercase tracking-widest mb-4 shadow-sm">
                                    웨어러블 연결됨
                                </span>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{USER_DETAIL.careLevel}</h3>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] mt-2">담소 전담: {USER_DETAIL.manager}</p>
                            </div>

                            <div className="w-full space-y-10 pt-10 border-t border-slate-100 font-sans">
                                <div className="text-left font-sans">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Heart size={16} className="text-[#C05656]" /> 기저 질환 (Primary Conditions)</p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {USER_DETAIL.conditions.map((c, i) => (
                                            <span key={i} className="px-4 py-2 bg-[#FFF5F5] text-[#C05656] text-xs font-black rounded-xl border border-[#FAD2D2] shadow-sm uppercase tracking-tight">{c}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-left font-sans">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Pill size={16} className="text-[#4F5B75]" /> 정기 복약 목록</p>
                                    <ul className="space-y-3">
                                        {USER_DETAIL.medications.map((m, i) => (
                                            <li key={i} className="text-sm font-black text-slate-600 flex items-center gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                                <div className="w-2 h-2 rounded-full bg-[#4F5B75]/50 shadow-sm" />
                                                {m}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Guardian Info */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm ring-1 ring-slate-200/50 font-sans">
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-50 pb-5">비상 연락망 (보호자)</h2>
                            <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 group hover:bg-white hover:shadow-2xl hover:border-slate-300 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-100 text-[#4F5B75] rounded-xl group-hover:bg-[#4F5B75] group-hover:text-white transition-all">
                                            <Heart size={20} />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 text-base tracking-tight">{USER_DETAIL.guardian.name}</p>
                                            <p className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border mt-1 inline-block">{USER_DETAIL.guardian.relation}</p>
                                        </div>
                                    </div>
                                    <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-400 shadow-sm hover:scale-110 transition-transform">
                                        <Phone size={18} />
                                    </button>
                                </div>
                                <p className="text-lg font-black text-slate-700 tracking-[0.05em] font-mono">{USER_DETAIL.guardian.phone}</p>
                            </div>
                        </div>

                    </div>

                    {/* --- Right Column: AI Insights & Timeline --- */}
                    <div className="lg:col-span-2 space-y-10 font-sans">

                        {/* AI Insight Report */}
                        <div className="bg-[#4F5B75] rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-bl-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/15 transition-all duration-700" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-400/20 rounded-tr-full -ml-20 -mb-20 blur-2xl" />

                            <div className="flex justify-between items-start mb-10 relative z-10 font-sans">
                                <div className="flex items-center gap-5">
                                    <div className="h-16 w-16 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                                        <Bot size={36} />
                                    </div>
                                    <div className="font-sans">
                                        <h2 className="text-2xl font-black text-white tracking-tight">AI 케어 분석 리포트</h2>
                                        <p className="text-xs text-white/50 font-black uppercase tracking-[0.1em] mt-1.5 font-sans">생성 일시: {USER_DETAIL.aiInsight.lastCall}</p>
                                    </div>
                                </div>
                                <div className="text-right font-sans">
                                    <span className="block text-xs text-white/50 font-black uppercase tracking-widest mb-2 font-sans">인지된 감정 상태</span>
                                    <span className="inline-block px-5 py-2 bg-white/20 backdrop-blur-md rounded-2xl text-base font-black text-white border border-white/20 shadow-lg">
                                        {USER_DETAIL.aiInsight.sentiment} ☁️
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 mb-10 shadow-inner relative z-10">
                                <p className="text-white text-lg leading-relaxed font-black tracking-tight font-sans">
                                    "{USER_DETAIL.aiInsight.summary}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 relative z-10 font-sans">
                                <span className="text-xs font-black text-white/40 uppercase tracking-widest font-sans">주요 감지 키워드:</span>
                                {USER_DETAIL.aiInsight.keywords.map((k, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-xs font-black rounded-xl border border-white/10 shadow-sm uppercase tracking-widest hover:bg-white hover:text-[#4F5B75] transition-all cursor-default">
                                        #{k}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* History Timeline */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col h-[700px] ring-1 ring-slate-200/50 font-sans overflow-hidden">
                            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-white font-sans">
                                <h2 className="font-black text-slate-800 text-xl tracking-tight flex items-center gap-4">
                                    <FileText className="text-slate-300" size={28} /> 활동 및 케어 이력 통합 로그
                                </h2>
                                <div className="flex gap-2.5 bg-slate-100 p-1.5 rounded-2xl shadow-inner border border-slate-200 font-sans">
                                    <TimelineFilter label="전체" />
                                    <TimelineFilter label="통화" active />
                                    <TimelineFilter label="긴급" />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-12 font-sans">
                                <div className="relative border-l-4 border-slate-50 ml-6 space-y-14">
                                    {USER_DETAIL.history.map((log, idx) => (
                                        <div key={idx} className="relative pl-12 group font-sans">
                                            <TimelineIcon type={log.type} />
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start transition-all group-hover:translate-x-2">
                                                <div className="space-y-2">
                                                    <span className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest block mb-1">{log.time}</span>
                                                    <p className="font-black text-slate-800 text-lg tracking-tight">{log.title}</p>
                                                    <p className="text-sm text-slate-600 font-bold leading-relaxed max-w-xl">{log.desc}</p>
                                                    {log.result && (
                                                        <div className="mt-4 inline-block px-4 py-1.5 bg-slate-100/50 rounded-xl text-xs font-black text-slate-500 border border-slate-200 uppercase tracking-widest shadow-sm">
                                                            조치 결과: {log.result}
                                                        </div>
                                                    )}
                                                </div>
                                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-3 text-slate-300 hover:text-slate-800 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 mt-3 sm:mt-0 font-sans">
                                                    <MoreHorizontal size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Action Bar */}
                            <div className="p-6 bg-slate-50/80 border-t border-slate-100 font-sans">
                                <div className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="사회복지사 전담 관찰 노트를 작성하세요..."
                                            className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-black transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
                                        />
                                        <Edit className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-sans" size={20} />
                                    </div>
                                    <button className="px-8 py-4 bg-slate-800 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-950 shadow-xl transition-all font-sans">
                                        기록 완료 (Save)
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

// --- Sub Components ---

function RiskBadge({ level }: { level: string }) {
    if (level === "HIGH") {
        return (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#FFF5F5] text-[#C05656] shadow-md border border-[#FAD2D2] ring-4 ring-offset-2 ring-red-50 font-sans animate-in zoom-in duration-500">
                <AlertTriangle size={14} fill="currentColor" className="text-[#C05656]" /> 중점 관리 대상
            </span>
        )
    }
    return <span className="text-xs font-black uppercase tracking-widest bg-slate-50 text-slate-400 px-4 py-2 rounded-full border border-slate-200 font-sans">관찰 안정 상태</span>
}

function TimelineFilter({ label, active }: { label: string, active?: boolean }) {
    return (
        <button className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all font-sans ${active
            ? "bg-white text-slate-900 shadow-lg ring-1 ring-slate-200"
            : "text-slate-400 hover:text-slate-800 hover:bg-white/50"
            }`}>
            {label}
        </button>
    )
}

function TimelineIcon({ type }: { type: string }) {
    let icon = <Activity size={18} />
    let colorClass = "bg-slate-200 text-slate-500 border-slate-300 shadow-slate-100"

    if (type === "CALL") {
        icon = <Phone size={18} />
        colorClass = "bg-[#4F5B75] text-white border-white shadow-slate-200 shadow-xl"
    } else if (type === "ALERT") {
        icon = <AlertTriangle size={18} />
        colorClass = "bg-[#C05656] text-white border-white shadow-red-100 shadow-xl"
    } else if (type === "MEMO") {
        icon = <FileText size={18} />
        colorClass = "bg-[#D9A34A] text-white border-white shadow-amber-50 shadow-xl"
    }

    return (
        <div className={`absolute -left-[27px] w-12 h-12 rounded-[1.25rem] flex items-center justify-center border-4 bg-white z-10 transition-transform group-hover:scale-110 shadow-sm ${colorClass.split(' ')[0] === 'bg-white' ? 'border-slate-100' : ''}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-white/20 ${colorClass}`}>
                {icon}
            </div>
        </div>
    )
}

function UserIcon({ size, ...props }: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}
