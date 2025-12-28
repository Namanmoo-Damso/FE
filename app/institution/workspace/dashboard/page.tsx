"use client"

import {
    Phone,
    Bot,
    AlertTriangle,
    LayoutDashboard,
    Headphones,
    Radio,
    BrainCircuit,
    History
} from "lucide-react"

// --- Mock Data ---

// KPI: AI의 활동 성과 위주
const KPI_DATA = [
    { label: "AI 금일 통화 수행", value: "120", unit: "건", trend: "진행률 85%", trendUp: true, icon: Bot, color: "bg-slate-600" },
    { label: "AI 케어 성공(종료)", value: "113", unit: "건", trend: "특이사항 없음", trendUp: true, icon: History, color: "bg-[#5A9A7D]" },
    { label: "사람 개입 필요", value: "8", unit: "건", trend: "즉시 확인 요망", trendUp: false, icon: AlertTriangle, color: "bg-[#C05656]", alert: true },
    { label: "현재 AI 통화 중", value: "42", unit: "명", trend: "실시간 세션", trendUp: true, icon: Radio, color: "bg-[#4F5B75]", active: true },
]

// 인간의 개입이 필요한 리스트 (Priority Queue)
const INTERVENTION_QUEUE = [
    {
        id: 1,
        name: "김영희",
        age: 82,
        type: "EMERGENCY", // 긴급
        reason: "AI 대화 중 '가슴 통증' 호소",
        aiConfidence: 98,
        status: "WAITING", // 담당자 배전 대기
        time: "방금 전"
    },
    {
        id: 2,
        name: "이철수",
        age: 79,
        type: "ESCALATION", // AI가 대화 불가 판단
        reason: "불명확한 발음 / 답변 거부 지속",
        aiConfidence: 75,
        status: "ASSIGNED", // 담당자가 확인 중
        manager: "박지훈",
        time: "3분 전"
    },
    {
        id: 3,
        name: "정순자",
        age: 75,
        type: "REQUEST", // 사용자가 직접 요청
        reason: "어르신이 '상담원 연결' 요청함",
        aiConfidence: 100,
        status: "WAITING",
        time: "5분 전"
    },
]

// 실시간 AI 활동
const AI_ACTIVITY_FEED = [
    { name: "박민수", status: "TALKING", topic: "복약 여부 확인 중", sentiment: "POSITIVE" },
    { name: "최옥분", status: "TALKING", topic: "식사 메뉴 대화", sentiment: "NEUTRAL" },
    { name: "한석규", status: "ANALYZING", topic: "답변 분석 중...", sentiment: "NEUTRAL" },
    { name: "윤정희", status: "CONNECTING", topic: "연결 시도 중", sentiment: "NONE" },
    { name: "강동원", status: "TALKING", topic: "병원 일정 안내", sentiment: "POSITIVE" },
]

export default function InstitutionDashboardPage() {
    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">AI 관제 대시보드</h1>
                    <p className="text-slate-500 text-sm mt-0.5 font-semibold">실시간 AI 케어 현황 및 긴급 개입 관리</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5A9A7D] animate-pulse"></div>
                        <span className="text-xs font-black text-slate-600 uppercase tracking-wider">AI 서버 정상 작동 중</span>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#F5F7FA]">
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {KPI_DATA.map((kpi, idx) => (
                            <StatCard key={idx} {...kpi} />
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                        {/* [LEFT] Priority Intervention Queue */}
                        <div className="xl:col-span-2 space-y-5">
                            <div className="flex justify-between items-center">
                                <h2 className="font-black text-slate-800 flex items-center gap-2 text-xl">
                                    <AlertTriangle className="text-[#C05656]" size={22} />
                                    개입 필요 알림
                                    <span className="bg-[#FDEDED] text-[#C05656] px-3 py-1 rounded-full text-sm font-black shadow-sm border border-[#FAD2D2]">
                                        {INTERVENTION_QUEUE.length}건
                                    </span>
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {INTERVENTION_QUEUE.map((item) => (
                                    <InterventionCard key={item.id} data={item} />
                                ))}
                                {INTERVENTION_QUEUE.length === 0 && (
                                    <div className="bg-white rounded-xl p-12 text-center text-slate-400 border border-slate-200 border-dashed">
                                        <Bot size={48} className="mx-auto mb-4 opacity-20" />
                                        <p className="font-black text-slate-600 text-lg">현재 개입이 필요한 건이 없습니다.</p>
                                        <p className="text-sm mt-1">AI가 모든 통화를 원활하게 진행 중입니다.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* [RIGHT] Live AI Activity Feed */}
                        <div className="space-y-5">
                            <div className="flex justify-between items-center">
                                <h2 className="font-black text-slate-800 flex items-center gap-2 text-xl">
                                    <Radio className="text-[#4F5B75] animate-pulse" size={22} />
                                    실시간 AI 활동
                                </h2>
                                <span className="text-xs text-slate-500 font-black tracking-widest bg-slate-200 px-2 py-1 rounded">LIVE</span>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ring-1 ring-slate-200/50">
                                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                    <span className="text-sm font-black text-slate-500 uppercase tracking-tight">진행 중인 세션</span>
                                    <span className="text-sm font-mono text-[#4F5B75] font-black underline decoration-2 underline-offset-4">42명 실시간 통화</span>
                                </div>
                                <ul className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
                                    {AI_ACTIVITY_FEED.map((session, idx) => (
                                        <li key={idx} className="p-5 hover:bg-slate-50 transition-colors group">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="font-black text-slate-800 text-base">{session.name} 어르신</span>
                                                    <StatusDot status={session.status} />
                                                </div>
                                                <span className="text-xs font-black text-slate-400 bg-slate-50 px-2 py-1 rounded border">
                                                    {session.sentiment === "POSITIVE" ? "😄 긍정" : session.sentiment === "NEUTRAL" ? "😐 평이" : "😶 대기"}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 mb-4 truncate font-semibold">
                                                대화 주제: {session.topic}
                                            </p>

                                            {session.status !== "CONNECTING" && (
                                                <div className="flex gap-2">
                                                    <button className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-black rounded-xl shadow-sm hover:bg-[#4F5B75] hover:text-white hover:border-[#4F5B75] transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
                                                        <Headphones size={14} /> 실시간 청취 (Listen)
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 ring-1 ring-slate-200/50">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-5">대기 중인 현장 사회복지사</h3>
                                <div className="flex flex-wrap gap-3 mb-5">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-11 w-11 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-sm font-black text-slate-500 shadow-sm ring-1 ring-slate-200">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="h-11 w-11 rounded-full bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 border-2 border-white shadow-sm ring-1 ring-slate-100">
                                        +2
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#5A9A7D]"></div>
                                    <p className="text-xs font-black text-emerald-800">현재 3명의 담당자가 즉시 개입 가능합니다.</p>
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

function InterventionCard({ data }: any) {
    const isEmergency = data.type === "EMERGENCY"

    return (
        <div className={`group rounded-2xl border shadow-sm p-6 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden ${isEmergency
            ? "bg-white border-red-200 shadow-red-50 hover:shadow-lg hover:shadow-red-100/50"
            : "bg-white border-amber-200 shadow-amber-50 hover:shadow-lg hover:shadow-amber-100/50"
            }`}>
            {isEmergency && <div className="absolute top-0 left-0 w-2 h-full bg-[#C05656]" />}
            {!isEmergency && <div className="absolute top-0 left-0 w-2 h-full bg-[#D9A34A]" />}

            {/* Icon & Type */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${isEmergency ? "bg-[#FFF5F5] text-[#C05656] border border-[#FAD2D2]" : "bg-amber-50 text-[#D9A34A] border border-amber-100"
                }`}>
                {isEmergency ? <AlertTriangle size={28} /> : <Bot size={28} />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                    <span className="font-black text-slate-800 text-xl tracking-tight">{data.name} 어르신</span>
                    <span className="text-base font-bold text-slate-400">{data.age}세</span>
                    <span className="text-xs font-black text-slate-400 px-2 py-1 bg-slate-100 rounded ml-2 uppercase tracking-widest">{data.time}</span>
                </div>

                <div className="text-base font-black mb-3">
                    <span className={isEmergency ? "text-[#C05656]" : "text-[#D9A34A]"}>
                        {data.reason}
                    </span>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-2 font-black uppercase tracking-tight">
                    <BrainCircuit size={14} className="text-[#4F5B75] opacity-50" /> AI 분석 신뢰도: <span className="text-[#4F5B75]">{data.aiConfidence}%</span>
                    {data.manager && <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg ml-3 flex items-center gap-1.5"><StatusDot status="ANALYZING" /> 담당자 {data.manager} 확인 중</span>}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0 relative z-10 font-sans">
                <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-black shadow-sm hover:bg-slate-50 transition uppercase tracking-widest flex items-center justify-center gap-2">
                    <Headphones size={18} /> 모니터링
                </button>
                <button className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-black text-white shadow-lg flex items-center justify-center gap-2 transition uppercase tracking-widest ${isEmergency ? "bg-[#C05656] hover:bg-[#A84A4A] shadow-red-100" : "bg-[#4F5B75] hover:bg-[#3D475C] shadow-slate-100"
                    }`}>
                    <Phone size={18} /> 직통 전화
                </button>
            </div>
        </div>
    )
}

function StatCard({ label, value, unit, trend, trendUp, icon: Icon, color, active }: any) {
    return (
        <div className={`bg-white rounded-[2rem] p-7 shadow-sm border-2 transition-all relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 ${active ? "border-slate-200 bg-slate-50/50" : "border-slate-100"}`}>
            {active && <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-bl-full -mr-16 -mt-16 animate-pulse" />}

            <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={28} />
                </div>
                <p className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm ${trendUp ? "text-emerald-800 bg-emerald-50 border border-emerald-100" : "text-[#C05656] bg-[#FFF5F5] border border-[#FAD2D2]"}`}>
                    {trend}
                </p>
            </div>
            <div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.1em] mb-2">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{value}</h3>
                    <span className="text-lg font-bold text-slate-400">{unit}</span>
                </div>
            </div>
        </div>
    )
}

function StatusDot({ status }: { status: string }) {
    if (status === "TALKING") {
        return (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-tight ring-1 ring-blue-100">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                대화 중
            </span>
        )
    }
    if (status === "ANALYZING") {
        return (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-tight border border-slate-200">
                <Bot size={12} className="text-slate-400" />
                분석 중
            </span>
        )
    }
    return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-tight border border-slate-100">
            대기 중
        </span>
    )
}
