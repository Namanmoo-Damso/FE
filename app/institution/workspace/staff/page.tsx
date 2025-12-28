"use client"

import { useState } from "react"
import {
    UserCog,
    Plus,
    Search,
    Mail,
    Phone,
    UserCheck,
    Shield,
    MoreVertical,
    Calendar,
    Briefcase,
    Users
} from "lucide-react"

// --- Mock Data ---

type AdminRole = "SUPER_ADMIN" | "SUPERVISOR" | "CARE_STAFF"

interface AdminMember {
    id: string
    name: string
    role: AdminRole
    department: string
    email: string
    phone: string
    lastLogin: string
    status: "ACTIVE" | "INACTIVE"
    assignedUsers: number
}

const ADMIN_LIST: AdminMember[] = [
    {
        id: "A-001", name: "김돌봄", role: "SUPER_ADMIN", department: "운영본부",
        email: "care.kim@damso.com", phone: "010-1234-5678", lastLogin: "방금 전",
        status: "ACTIVE", assignedUsers: 0
    },
    {
        id: "A-005", name: "박지훈", role: "SUPERVISOR", department: "정릉1동 케어팀",
        email: "park.jh@damso.com", phone: "010-2222-3333", lastLogin: "3시간 전",
        status: "ACTIVE", assignedUsers: 24
    },
    {
        id: "A-008", name: "최은지", role: "CARE_STAFF", department: "정릉1동 케어팀",
        email: "choi.ej@damso.com", phone: "010-4444-5555", lastLogin: "어제",
        status: "ACTIVE", assignedUsers: 18
    },
    {
        id: "A-012", name: "김민수", role: "CARE_STAFF", department: "돈암2동 케어팀",
        email: "kim.ms@damso.com", phone: "010-7777-8888", lastLogin: "2일 전",
        status: "INACTIVE", assignedUsers: 15
    }
]

export default function StaffManagementPage() {
    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10 font-sans">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">전담 담당자 관리</h1>
                    <p className="text-slate-500 text-sm mt-0.5 font-semibold">기관 관리자 계정 및 담당 구역 배정 통합 관리</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-[#4F5B75] hover:bg-[#3D475C] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-100 transition-all flex items-center gap-2 font-sans">
                        <Plus size={18} /> 신규 담당자 초대 (Invite)
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#F5F7FA]">
                <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-200/50">
                            <div className="h-14 w-14 bg-slate-50 text-[#4F5B75] rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner overflow-hidden">
                                <UserCog size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">전체 담당 인력</p>
                                <p className="text-3xl font-black text-slate-800 tracking-tighter">{ADMIN_LIST.length} <span className="text-sm text-slate-400 font-bold ml-1">명</span></p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-200/50">
                            <div className="h-14 w-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-inner">
                                <UserCheck size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">현재 접속/근무 중</p>
                                <p className="text-3xl font-black text-slate-800 tracking-tighter">3 <span className="text-sm text-slate-400 font-bold ml-1">명</span></p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 ring-1 ring-slate-200/50">
                            <div className="h-14 w-14 bg-amber-50 text-[#D9A34A] rounded-2xl flex items-center justify-center border border-amber-100 shadow-inner">
                                <Shield size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">슈퍼바이저/팀 리더</p>
                                <p className="text-3xl font-black text-slate-800 tracking-tighter">1 <span className="text-sm text-slate-400 font-bold ml-1">명</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:w-96 font-sans">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 font-black" />
                            <input
                                type="text"
                                placeholder="성함, 직함 또는 소속 팀으로 검색..."
                                className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-black transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
                            />
                        </div>
                        <div className="flex items-center gap-3 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200 shadow-inner font-sans">
                            <button className="px-6 py-2 bg-white text-xs font-black uppercase text-slate-900 rounded-xl tracking-widest shadow-sm ring-1 ring-slate-200">운영본부팀</button>
                            <button className="px-6 py-2 text-xs font-black uppercase text-slate-400 rounded-xl tracking-widest hover:bg-white/50 transition-all">현장 관리팀</button>
                        </div>
                    </div>

                    {/* Staff Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {ADMIN_LIST.map((member) => (
                            <StaffCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

// --- Sub Components ---

function StaffCard({ member }: { member: AdminMember }) {
    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 relative ring-1 ring-slate-200/50 group font-sans">

            {/* Design Element */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-bl-full -mr-20 -mt-20 group-hover:bg-slate-100 transition-colors" />

            <div className="p-10 pb-8 relative z-10 flex items-start justify-between bg-white/50">
                <div className="flex gap-5">
                    <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center text-slate-300 font-black text-2xl group-hover:bg-[#4F5B75] group-hover:text-white transition-all duration-300 uppercase">
                        {member.name[0]}
                    </div>
                    <div>
                        <h3 className="font-black text-slate-900 text-xl tracking-tight group-hover:text-[#4F5B75] transition-colors mt-1">{member.name}</h3>
                        <RoleBadge role={member.role} />
                    </div>
                </div>
                <button className="p-2.5 text-slate-300 hover:text-slate-800 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100 shadow-sm">
                    <MoreVertical size={24} />
                </button>
            </div>

            <div className="px-10 space-y-5 relative z-10 mt-2 font-sans">
                <div className="space-y-3 font-sans">
                    <div className="flex items-center gap-3 text-sm font-black text-slate-600">
                        <Briefcase size={18} className="text-slate-400" />
                        주요 소속: {member.department}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-black text-slate-600">
                        <Mail size={18} className="text-slate-400" />
                        {member.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-black text-slate-600">
                        <Phone size={18} className="text-slate-400" />
                        {member.phone}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 font-sans">
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 font-sans">
                            <Calendar size={12} /> LAST LOGIN
                        </p>
                        <p className="text-sm font-black text-slate-700 tracking-tighter truncate font-sans">{member.lastLogin}</p>
                    </div>
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 font-sans">
                            <Users size={12} /> ASSIGNED USERS
                        </p>
                        <p className="text-sm font-black text-slate-700 tracking-tighter font-sans">{member.assignedUsers} <span className="text-[10px] font-bold">명</span></p>
                    </div>
                </div>
            </div>

            <div className="p-8 mt-6 relative z-10 font-sans">
                <button className={`w-full py-4 rounded-[1.25rem] text-xs font-black uppercase tracking-widest transition-all shadow-sm ${member.status === 'ACTIVE'
                    ? 'bg-slate-100 text-slate-700 hover:bg-[#4F5B75] hover:text-white border border-slate-200'
                    : 'bg-[#FFF5F5] text-[#C05656] border border-[#FAD2D2]'
                    }`}>
                    {member.status === 'ACTIVE' ? '담당 인력 성과 리포트' : '계정 접근 정지됨'}
                </button>
            </div>
        </div>
    )
}

function RoleBadge({ role }: { role: AdminRole }) {
    if (role === "SUPER_ADMIN") {
        return <span className="text-[10px] font-black bg-[#4F5B75] text-white px-3 py-1 rounded-lg shadow-md inline-block uppercase tracking-wider mt-2">최고 권한 관리자</span>
    }
    if (role === "SUPERVISOR") {
        return <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-lg border border-slate-200 inline-block uppercase tracking-wider mt-2">운영 팀 리더 / SV</span>
    }
    return <span className="text-[10px] font-black bg-slate-50 text-slate-500 px-3 py-1 rounded-lg border border-slate-100 inline-block uppercase tracking-wider mt-2">현장 실무 담당자</span>
}
