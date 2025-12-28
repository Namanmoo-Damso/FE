"use client"

import { useState } from "react"
import {
    Users,
    Search,
    Plus,
    MoreHorizontal,
    Bot,
    MapPin,
    FileText,
    Phone,
    ArrowRight
} from "lucide-react"
import Link from "next/link"

// --- Mock Data ---

type RiskLevel = "HIGH" | "MEDIUM" | "LOW"

interface CareUser {
    id: string
    name: string
    age: number
    gender: "남" | "여"
    address: string
    riskLevel: RiskLevel
    mainCondition: string
    aiSchedule: string
    lastAiReport: string
    manager: string
}

const USER_LIST: CareUser[] = [
    {
        id: "U-1024", name: "김영희", age: 82, gender: "여", address: "성북구 정릉동 102-3",
        riskLevel: "HIGH", mainCondition: "고혈압, 독거", aiSchedule: "매일 14:00 (주 7회)",
        lastAiReport: "목소리 쉼/어지러움 감지 (오늘)", manager: "박지훈"
    },
    {
        id: "U-1025", name: "이철수", age: 79, gender: "남", address: "성북구 길음동 504",
        riskLevel: "MEDIUM", mainCondition: "당뇨, 관절염", aiSchedule: "월/수/금 10:00",
        lastAiReport: "특이사항 없음 (어제)", manager: "최은지"
    },
    {
        id: "U-1026", name: "박순자", age: 75, gender: "여", address: "성북구 돈암동 201",
        riskLevel: "LOW", mainCondition: "초기 치매", aiSchedule: "매일 16:00",
        lastAiReport: "긍정적인 기분 (오늘)", manager: "김민수"
    },
    {
        id: "U-1027", name: "최경식", age: 88, gender: "남", address: "성북구 삼선동 33",
        riskLevel: "HIGH", mainCondition: "거동 불편", aiSchedule: "매일 09:00 / 18:00",
        lastAiReport: "통화 미응답 (2회)", manager: "박지훈"
    }
]

export default function UserManagementPage() {
    const [filterType, setFilterType] = useState<"ALL" | "HIGH">("ALL")

    const filteredUsers = USER_LIST.filter(user => {
        if (filterType === "ALL") return true
        if (filterType === "HIGH") return user.riskLevel === "HIGH"
        return true
    })

    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">대상자 관리</h1>
                    <p className="text-slate-500 text-sm mt-0.5 font-semibold">관리 대상자 목록 및 AI 케어 레포트 통합 관리</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-[#4F5B75] hover:bg-[#3D475C] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-100 transition-all flex items-center gap-2">
                        <Plus size={18} /> 신규 대상자 등록
                    </button>
                </div>
            </header>

            {/* Toolbar */}
            <div className="px-8 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 flex-shrink-0">
                <div className="flex bg-slate-100 p-2 rounded-2xl border border-slate-200 shadow-inner">
                    <FilterButton
                        label="전체 대상자"
                        count={USER_LIST.length}
                        active={filterType === "ALL"}
                        onClick={() => setFilterType("ALL")}
                    />
                    <FilterButton
                        label="중점 관리"
                        count={USER_LIST.filter(u => u.riskLevel === "HIGH").length}
                        active={filterType === "HIGH"}
                        onClick={() => setFilterType("HIGH")}
                        isCritical
                    />
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 font-black" />
                    <input
                        type="text"
                        placeholder="이름, 주소, 담당자 검색..."
                        className="w-full pl-12 pr-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ring-1 ring-slate-200/50">
                    <div className="overflow-x-auto font-sans">
                        <table className="w-full text-left border-collapse min-w-[1100px]">
                            <thead className="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">대상자 정보</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">상태 및 위험도</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">AI 케어 스케줄</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">담당 사회복지사</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400 text-center">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-base border-2 border-white shadow-sm group-hover:bg-[#4F5B75] group-hover:text-white transition-all uppercase">
                                                    {user.name[0]}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-black text-slate-800 text-base tracking-tight truncate">
                                                        {user.name} <span className="font-bold text-xs text-slate-400 bg-slate-50 px-2 py-0.5 border rounded ml-1.5">{user.age}세/{user.gender}</span>
                                                    </p>
                                                    <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-1.5 truncate">
                                                        <MapPin size={14} className="text-slate-300" /> {user.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <RiskTag level={user.riskLevel} />
                                            <p className="text-sm text-slate-500 mt-2.5 font-medium truncate max-w-[220px]" title={user.mainCondition}>
                                                질환: {user.mainCondition}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Bot size={16} className="text-[#4F5B75]" />
                                                <span className="text-xs font-black text-slate-700 tracking-tight uppercase">{user.aiSchedule}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <FileText size={14} className="text-slate-300 mt-0.5" />
                                                <span className="text-xs font-bold text-slate-400 truncate max-w-[240px] italic">{user.lastAiReport}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-block px-4 py-1.5 bg-slate-100 text-xs font-black text-slate-600 rounded-xl uppercase tracking-wider border border-slate-200">
                                                {user.manager} 사회복지사
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center gap-3">
                                                <Link href={`/institution/workspace/users/${user.id}`}>
                                                    <button className="p-2.5 text-slate-400 hover:text-[#4F5B75] hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-200 transition-all font-bold" title="상세보기">
                                                        <ArrowRight size={20} />
                                                    </button>
                                                </Link>
                                                <button className="p-2.5 text-slate-400 hover:text-emerald-700 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-emerald-100 transition-all" title="직통전화">
                                                    <Phone size={20} />
                                                </button>
                                                <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-200 transition-all">
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="p-24 text-center bg-slate-50/50 uppercase tracking-widest">
                            <Users size={64} className="mx-auto mb-6 text-slate-200" />
                            <p className="text-sm font-black text-slate-400">검색 결과가 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

// --- Sub Components ---

function FilterButton({ label, count, active, onClick, isCritical }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-3 ${active
                ? (isCritical ? "bg-[#C05656] text-white shadow-lg shadow-red-100" : "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200")
                : "text-slate-500 hover:text-slate-900"
                }`}
        >
            {label}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${active ? "bg-black/10 text-white" : "bg-slate-200 text-slate-600"}`}>
                {count}
            </span>
        </button>
    )
}

function RiskTag({ level }: { level: RiskLevel }) {
    if (level === "HIGH") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest bg-[#FFF5F5] text-[#C05656] border border-[#FAD2D2]">
                중점 관리 (High)
            </span>
        )
    }
    if (level === "MEDIUM") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest bg-amber-50 text-[#D9A34A] border border-amber-100">
                관찰 요망 (Mid)
            </span>
        )
    }
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100">
            안정 중 (Low)
        </span>
    )
}
