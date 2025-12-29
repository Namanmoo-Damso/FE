"use client"

import { useState } from "react"
// TODO: LiveKit 관련 훅 및 타입 임포트 (useLiveKitRoom, VideoTrack 등)
import { Phone, Mic, ScanFace, Video, X, Maximize2, Search } from "lucide-react"

type AlertType = "EMERGENCY" | "CAUTION" | "NORMAL"
type MonitoringFilter = AlertType | "ALL"
type MonitoringSearch = string

interface AiAnalysis {
    type: "FACE" | "VOICE" | "NONE"
    message: string
    timestamp: string
}

interface MonitoredUser {
    id: string
    name: string
    age: number
    status: AlertType
    aiAnalysis: AiAnalysis
    isOnline: boolean
}

const FILTER_OPTIONS: { value: MonitoringFilter; label: string }[] = [
    { value: "ALL", label: "전체" },
    { value: "EMERGENCY", label: "긴급" },
]

const MOCK_USERS: MonitoredUser[] = Array.from({ length: 16 }).map((_, i) => ({
    id: `U-10${i}`,
    name: i === 0 ? "박영자" : i === 1 ? "김철수" : `어르신 ${i + 1}`,
    age: 70 + (i % 15),
    status: i === 0 ? "EMERGENCY" : (i % 5 === 0 ? "CAUTION" : "NORMAL"),
    isOnline: i !== 15,
    aiAnalysis: {
        type: i === 0 ? "VOICE" : (i % 5 === 0 ? "FACE" : "NONE"),
        message: i === 0 ? "비명 소리 감지" : (i % 5 === 0 ? "안면 비대칭 감지" : "특이사항 없음"),
        timestamp: "방금 전",
    },
}))

export default function InstitutionMonitoringPage() {
    const [filter, setFilter] = useState<MonitoringFilter>("ALL")
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<MonitoringSearch>("")

    const filteredUsers = getFilteredUsers(MOCK_USERS, filter, searchTerm).slice(0, 16)
    const selectedUser = MOCK_USERS.find((user) => user.id === selectedId) ?? null

    return (
        <div className="relative flex flex-col h-screen bg-white overflow-hidden">
            <MonitoringHeader 
                filter={filter} 
                onFilterChange={setFilter} 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
            />
            <MonitoringGrid
                users={filteredUsers}
                onSelect={(userId) => {
                    setSelectedId(userId)
                    // TODO: 확대 시 해당 트랙의 구독 품질을 HIGH로 변경
                    // trackReference.setSubscribedQuality(VideoQuality.HIGH);
                }}
            />
            <ZoomOverlay
                user={selectedUser}
                onClose={() => {
                    setSelectedId(null)
                    // TODO: 축소 시 해당 트랙의 구독 품질을 LOW로 복구하여 대역폭 절약
                    // trackReference.setSubscribedQuality(VideoQuality.LOW);
                }}
            />
        </div>
    )
}

function getFilteredUsers(users: MonitoredUser[], filter: MonitoringFilter, search: MonitoringSearch) {
    return users.filter((user) => {
        const matchesFilter = filter === "ALL" || user.status === filter
        const matchesSearch = search ? user.name.includes(search) : true
        return matchesFilter && matchesSearch
    })
}

function MonitoringHeader({ 
    filter, 
    onFilterChange, 
    searchTerm, 
    onSearchChange 
}: { 
    filter: MonitoringFilter; 
    onFilterChange: (value: MonitoringFilter) => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
}) {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-black text-slate-800 tracking-tight">관제 대시보드</h1>
                <div className="flex gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
                    {FILTER_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onFilterChange(option.value)}
                            className={`px-3 py-1 text-xs font-bold rounded ${filter === option.value
                                ? option.value === "EMERGENCY"
                                    ? "bg-[#C05656] text-white"
                                    : "bg-white shadow-sm text-slate-900 border border-slate-200"
                                : "text-slate-500"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* 어르신 성함 검색창 */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="어르신 성함 검색" 
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                />
            </div>
        </header>
    )
}

function MonitoringGrid({ users, onSelect }: { users: MonitoredUser[]; onSelect: (userId: string) => void }) {
    return (
        <main className="flex-1 p-3 bg-[#F5F7FA] overflow-hidden">
            <div className="grid grid-cols-4 grid-rows-4 gap-3 h-full">
                {users.map((user) => (
                    <CompactUserCard key={user.id} user={user} onExpand={() => onSelect(user.id)} />
                ))}
            </div>
        </main>
    )
}

function ZoomOverlay({ user, onClose }: { user: MonitoredUser | null; onClose: () => void }) {
    if (!user) return null

    return (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="h-16 flex items-center justify-between px-8 border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="text-xl font-black text-slate-800">{user.name} 어르신 상세 모니터링</h2>
                    <span className="text-slate-400 font-bold">UID: {user.id}</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                    <X size={32} />
                </button>
            </div>

            <div className="flex-1 flex p-8 gap-8 overflow-hidden">
                <div className="flex-[3] bg-slate-900 rounded-3xl border border-slate-200 relative overflow-hidden flex items-center justify-center shadow-2xl">
                    {/* TODO: 실제 LiveKit VideoTrack 컴포넌트로 교체 */}
                    {/* <VideoTrack trackRef={selectedUserTrack} /> */}
                    <Video size={120} className="text-white/5 opacity-10" />

                    <div className="absolute top-6 left-6 bg-black/50 px-4 py-2 rounded-full text-white text-sm font-black tracking-widest border border-white/20">
                        LIVE STREAMING
                    </div>

                    {user.status !== "NORMAL" && (
                        <div className="absolute bottom-10 left-10 right-10 bg-[#C05656]/90 p-6 rounded-2xl border border-red-400 backdrop-blur-md animate-bounce">
                            <p className="text-white text-2xl font-black">{user.aiAnalysis.message}</p>
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <h4 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">AI 실시간 분석 로그</h4>
                        <div className="space-y-4 text-slate-800">
                            <div className="flex gap-3">
                                <div className="p-2 bg-blue-500 text-white rounded-lg h-fit"><Mic size={18} /></div>
                                <div>
                                    <p className="text-sm font-bold">음성 패턴 분석 중</p>
                                    <p className="text-[11px] text-slate-400">실시간 연결됨</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-2 bg-emerald-500 text-white rounded-lg h-fit"><ScanFace size={18} /></div>
                                <div>
                                    <p className="text-sm font-bold">안면 인식 활성화</p>
                                    <p className="text-[11px] text-slate-400">정상 감지 중</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-6 bg-[#4F5B75] hover:bg-[#3D475C] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-200">
                        <Phone size={24} />
                        통화 연결 (Intercom)
                    </button>
                </div>
            </div>
        </div>
    )
}

function CompactUserCard({ user, onExpand }: { user: MonitoredUser; onExpand: () => void }) {
    const isEmergency = user.status === "EMERGENCY"

    return (
        <div
            onClick={onExpand}
            className={`group relative bg-white rounded-xl overflow-hidden border-2 cursor-pointer transition-all hover:shadow-lg active:scale-95 ${isEmergency ? "border-[#C05656] ring-2 ring-red-500/10" : "border-slate-200 hover:border-slate-300"
                }`}
        >
            {/* TODO: 여기에 소형 VideoTrack 컴포넌트 삽입 */}
            <div className="absolute inset-0 bg-black flex items-center justify-center">
                <Video size={30} className="text-white/10 group-hover:text-white/20 transition-colors" />
            </div>

            <div className="absolute inset-0 p-3 flex flex-col justify-between bg-gradient-to-t from-slate-900/40 via-transparent to-transparent">
                <div className="flex justify-between items-start">
                    <span className="text-slate-800 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[11px] font-black">{user.name}</span>
                    <div className={`w-2 h-2 rounded-full ${isEmergency ? "bg-red-500 animate-ping" : "bg-emerald-500"}`} />
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                    <Maximize2 className="text-slate-400 w-8 h-8" />
                </div>

                <div className="text-[9px] text-white font-bold opacity-80 tracking-widest">{user.id}</div>
            </div>
        </div>
    )
}
