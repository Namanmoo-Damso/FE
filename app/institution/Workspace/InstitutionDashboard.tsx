"use client"

import { useState } from "react"
import {
    Phone,
    Users,
    Bot,
    AlertTriangle,
    ArrowRight,
    LayoutDashboard,
    Video,
    UserCog,
    Bell,
    BarChart3,
    Database,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    User,
    Headphones,
    Radio,
    Mic2,
    BrainCircuit,
    History
} from "lucide-react"

// --- Mock Data ---

const SIDEBAR_MENU = [
    { label: "대시보드", icon: LayoutDashboard, href: "/institution/dashboard", active: true },
    { label: "실시간 모니터링", icon: Video, href: "/institution/monitoring", active: false },
    { label: "대상자 관리", icon: Users, href: "/institution/users", active: false },
    { label: "담당자 관리", icon: UserCog, href: "/institution/staff", active: false },
    { label: "AI 설정 및 스크립트", icon: BrainCircuit, href: "/institution/ai-config", active: false }, // AI 관련 메뉴 추가
    { label: "알림 · 대응 기록", icon: Bell, href: "/institution/alerts", active: false },
    { label: "통계 · 성과", icon: BarChart3, href: "/institution/stats", active: false },
    { label: "기관 설정", icon: Settings, href: "/institution/settings", active: false },
]

// KPI: AI의 활동 성과 위주
const KPI_DATA = [
    { label: "AI 금일 통화 수행", value: "120", unit: "건", trend: "진행률 85%", trendUp: true, icon: Bot, color: "bg-indigo-500" },
    { label: "AI 케어 성공(종료)", value: "113", unit: "건", trend: "특이사항 없음", trendUp: true, icon: History, color: "bg-emerald-500" },
    { label: "사람 개입 필요", value: "8", unit: "건", trend: "즉시 확인 요망", trendUp: false, icon: AlertTriangle, color: "bg-red-500", alert: true },
    { label: "현재 AI 통화 중", value: "42", unit: "명", trend: "실시간 세션", trendUp: true, icon: Radio, color: "bg-blue-500", active: true },
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
        status: "WAITING", // 담당자 배정 대기
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

// 실시간 AI 활동 (그냥 잘 돌아가고 있다는 것을 보여주는 용도)
const AI_ACTIVITY_FEED = [
    { name: "박민수", status: "TALKING", topic: "복약 여부 확인 중", sentiment: "POSITIVE" },
    { name: "최옥분", status: "TALKING", topic: "식사 메뉴 대화", sentiment: "NEUTRAL" },
    { name: "한석규", status: "ANALYZING", topic: "답변 분석 중...", sentiment: "NEUTRAL" },
    { name: "윤정희", status: "CONNECTING", topic: "연결 시도 중", sentiment: "NONE" },
    { name: "강동원", status: "TALKING", topic: "병원 일정 안내", sentiment: "POSITIVE" },
]

export default function AI_InstitutionDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen bg-[#F5F7FA] font-sans text-slate-800 overflow-hidden">

            {/* 1. Sidebar (Toggleable) */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-white border-r border-slate-200 flex flex-col transition-all duration-300 relative z-20 flex-shrink-0`}
            >
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-8 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 text-slate-500 z-50"
                >
                    {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>

                <div className={`h-16 flex items-center border-b border-slate-100 ${isSidebarOpen ? "px-6" : "justify-center"}`}>
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bot className="text-white" size={20} />
                    </div>
                    <span className={`font-bold text-slate-800 text-xl tracking-tight ml-3 transition-opacity duration-200 ${isSidebarOpen ? "opacity-100 block" : "opacity-0 hidden"
                        }`}>
                        담소 AI 센터
                    </span>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {SIDEBAR_MENU.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${item.active
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                } ${!isSidebarOpen && "justify-center"}`}
                            title={!isSidebarOpen ? item.label : ""}
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            <span className={`whitespace-nowrap transition-all duration-200 ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
                                }`}>
                                {item.label}
                            </span>
                        </a>
                    ))}
                </nav>

                <div className={`p-4 border-t border-slate-100 ${!isSidebarOpen && "flex justify-center"}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                            <User size={16} />
                        </div>
                        {isSidebarOpen && (
                            <div className="text-xs truncate overflow-hidden">
                                <p className="font-bold text-slate-700">관리자 김돌봄</p>
                                <p className="text-slate-400">시스템 정상 가동 중</p>
                            </div>
                        )}
                        {isSidebarOpen && <LogOut size={14} className="ml-auto text-slate-400 cursor-pointer hover:text-slate-600" />}
                    </div>
                </div>
            </aside>

            {/* 2. Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">AI 관제 대시보드</h1>
                        <p className="text-slate-500 text-xs mt-0.5">AI가 어르신들의 안부를 확인하고 있습니다.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* System Status Indicator */}
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-slate-600">AI Server Online</span>
                        </div>
                    </div>
                </header>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto space-y-8">

                        {/* KPI Cards (AI Focused) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {KPI_DATA.map((kpi, idx) => (
                                <StatCard key={idx} {...kpi} />
                            ))}
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                            {/* [LEFT] Priority Intervention Queue (Human Task List) */}
                            <div className="xl:col-span-2 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                        개입 필요 알림
                                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                            {INTERVENTION_QUEUE.length}건
                                        </span>
                                    </h2>
                                </div>

                                {/* Intervention Cards */}
                                <div className="space-y-3">
                                    {INTERVENTION_QUEUE.map((item) => (
                                        <InterventionCard key={item.id} data={item} />
                                    ))}
                                    {INTERVENTION_QUEUE.length === 0 && (
                                        <div className="bg-white rounded-xl p-8 text-center text-slate-400 border border-slate-200 border-dashed">
                                            <p>현재 개입이 필요한 건이 없습니다.</p>
                                            <p className="text-xs mt-1">AI가 모든 통화를 원만하게 진행 중입니다.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* [RIGHT] Live AI Activity Feed */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                                        <Radio className="text-blue-500" size={20} />
                                        실시간 AI 활동
                                    </h2>
                                    <span className="text-xs text-slate-500 font-mono">LIVE</span>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500">현재 통화 세션</span>
                                        <span className="text-xs font-mono text-indigo-600 font-bold">42 Active</span>
                                    </div>
                                    <ul className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
                                        {AI_ACTIVITY_FEED.map((session, idx) => (
                                            <li key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-700">{session.name}</span>
                                                        <StatusDot status={session.status} />
                                                    </div>
                                                    <span className="text-[10px] text-slate-400">{session.sentiment === "POSITIVE" ? "😄 원만" : session.sentiment === "NEUTRAL" ? "😐 평이" : "😶 대기"}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 mb-2 truncate">
                                                    AI: {session.topic}
                                                </p>

                                                {/* Monitoring Actions */}
                                                {session.status !== "CONNECTING" && (
                                                    <div className="flex gap-2">
                                                        <button className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition flex items-center justify-center gap-1">
                                                            <Headphones size={12} /> 청취
                                                        </button>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Staff Availability for Escalation */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                                    <h3 className="text-sm font-bold text-slate-600 mb-3">개입 가능 담당자</h3>
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 ring-2 ring-white">
                                            +2
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">현재 3명이 즉시 연결 가능합니다.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

// --- Sub Components ---

function InterventionCard({ data }: any) {
    const isEmergency = data.type === "EMERGENCY"

    return (
        <div className={`rounded-xl border shadow-sm p-5 transition-all flex flex-col md:flex-row gap-4 items-start md:items-center ${isEmergency
                ? "bg-white border-red-200 shadow-red-100"
                : "bg-white border-amber-200 shadow-amber-50"
            }`}>

            {/* Icon & Type */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isEmergency ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                }`}>
                {isEmergency ? <AlertTriangle size={20} /> : <Bot size={20} />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800 text-lg">{data.name}</span>
                    <span className="text-sm text-slate-400">({data.age}세)</span>
                    <span className="text-xs text-slate-400 px-2 border-l border-slate-200">{data.time}</span>
                </div>

                <div className="text-sm font-medium mb-1">
                    <span className={isEmergency ? "text-red-600" : "text-amber-600"}>
                        {data.reason}
                    </span>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1">
                    <BrainCircuit size={12} /> AI 판단 신뢰도: {data.aiConfidence}%
                    {data.manager && <span className="text-indigo-600 ml-2 font-bold">· {data.manager} 확인 중</span>}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2">
                    <Headphones size={16} /> 모니터링
                </button>
                <button className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold text-white shadow-sm flex items-center justify-center gap-2 transition ${isEmergency ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}>
                    <Phone size={16} /> 직접 통화(개입)
                </button>
            </div>
        </div>
    )
}

function StatCard({ label, value, unit, trend, trendUp, icon: Icon, color, active }: any) {
    return (
        <div className={`bg-white rounded-xl p-5 shadow-sm border relative overflow-hidden ${active ? "border-blue-200" : "border-slate-200"}`}>
            {active && <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full -mr-8 -mt-8 animate-pulse" />}

            <div className="flex justify-between items-start mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm ${color}`}>
                    <Icon size={20} />
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <div className="flex items-baseline gap-1 mt-1">
                    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                    <span className="text-sm text-slate-400">{unit}</span>
                </div>
                <p className={`text-xs mt-2 font-medium ${trendUp ? "text-emerald-600" : "text-red-600"}`}>
                    {trend}
                </p>
            </div>
        </div>
    )
}

function StatusDot({ status }: { status: string }) {
    if (status === "TALKING") {
        return (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                대화 중
            </span>
        )
    }
    if (status === "ANALYZING") {
        return (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px] font-bold">
                <Bot size={10} />
                분석 중
            </span>
        )
    }
    return (
        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
            연결 중
        </span>
    )
}
