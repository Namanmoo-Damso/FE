"use client"

import { useState } from "react"
import {
    BrainCircuit,
    Save,
    Bot,
    MessageSquare,
    Play,
    Plus,
    Clock,
    Wand2,
    Settings,
    ChevronRight,
    Search,
    BookOpen
} from "lucide-react"

// --- Mock Data ---

const SCRIPTS = [
    { id: 1, name: "오전 안부 확인 (정기)", lastEdited: "2024.05.20", usage: 1240, active: true },
    { id: 2, name: "퇴원 후 사후 관리", lastEdited: "2024.05.15", usage: 145, active: true },
    { id: 3, name: "복약 이행도 설문", lastEdited: "2024.05.12", usage: 890, active: false },
    { id: 4, name: "정신 건강 자가 진단", lastEdited: "2024.05.01", usage: 312, active: true },
]

export default function AiConfigPage() {
    const [selectedTab, setSelectedTab] = useState<"PERSONA" | "SCRIPTS" | "SCHEDULING">("PERSONA")

    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10 font-sans">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        AI 케어 관제 설정 <span className="text-xs font-black bg-[#4F5B75] text-white px-2 py-0.5 rounded shadow-sm uppercase tracking-widest">기관용 v2.4</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-0.5 font-semibold">AI 페르소나, 시나리오 스크립트 및 케어 스케줄 설정 관리</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-3">
                        <Play size={18} className="text-[#4F5B75]" /> 시뮬레이션 실행 (Draft)
                    </button>
                    <button className="bg-[#4F5B75] hover:bg-[#3D475C] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-100 transition-all flex items-center gap-3 font-sans">
                        <Save size={18} /> 설정 전체 배포
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#F5F7FA]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">

                    {/* Left Navigation Tabs */}
                    <div className="w-full lg:w-80 flex-shrink-0 space-y-3 font-sans">
                        <TabButton
                            icon={Wand2}
                            label="페르소나 및 어조"
                            active={selectedTab === "PERSONA"}
                            onClick={() => setSelectedTab("PERSONA")}
                            desc="목소리, 성격 및 첫 인사 스타일 설정"
                        />
                        <TabButton
                            icon={BookOpen}
                            label="스크립트 라이브러리"
                            active={selectedTab === "SCRIPTS"}
                            onClick={() => setSelectedTab("SCRIPTS")}
                            desc="대화 흐름 및 질의응답 로직 관리"
                        />
                        <TabButton
                            icon={Clock}
                            label="통합 스케줄링"
                            active={selectedTab === "SCHEDULING"}
                            onClick={() => setSelectedTab("SCHEDULING")}
                            desc="자동 통화 시간대 및 트리거 설정"
                        />

                        <div className="mt-10 p-8 bg-[#4F5B75] rounded-[2rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-12 -mt-12 rotate-12 transition-transform group-hover:scale-110" />
                            <Bot size={40} className="mb-6 text-white opacity-80" />
                            <h4 className="text-base font-black mb-1.5 uppercase tracking-tight">AI 엔진 서버 상태</h4>
                            <p className="text-xs text-white/70 font-bold mb-5 leading-relaxed">현재 리소스 부하: 12%<br />평균 응답 속도: 45ms</p>
                            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-1/4 h-full bg-white/60 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Right Configuration Content */}
                    <div className="flex-1 space-y-10">
                        {selectedTab === "PERSONA" && (
                            <div className="space-y-10">
                                <div className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm ring-1 ring-slate-200/50">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10 border-b border-slate-50 pb-5 font-sans">AI 정체성 정의 (Identity)</h3>

                                    <div className="space-y-12">
                                        <ConfigGroup label="AI 이름 (서비스 표시 명칭)">
                                            <input type="text" defaultValue="담소 어시스턴트" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-black shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100 font-sans" />
                                        </ConfigGroup>

                                        <ConfigGroup label="AI 핵심 성격 및 대화 규칙 (Systems Prompt)">
                                            <textarea
                                                rows={7}
                                                className="w-full px-5 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold leading-relaxed shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100 text-slate-700 font-sans"
                                                defaultValue="당신의 이름은 담소이며, 어르신들을 위한 친절하고 따뜻한 사회복지사 페르소나를 가집니다. 항상 정중한 존댓말을 사용하세요. 공감과 경청에 집중하십시오. 어르신이 신체적 통증을 언급하면 구체적인 추가 질문을 던지고, 담당자 확인이 필요함을 표시하십시오. 어르신들이 이해하기 쉽게 문장은 짧고 명확하게 구성하십시오."
                                            />
                                            <p className="text-xs font-black text-[#4F5B75] uppercase tracking-wide mt-3 flex items-center gap-2">✨ 프로 팁: 구체적인 예시(Few-shot)를 프롬프트에 포함하면 AI의 품질이 비약적으로 향상됩니다.</p>
                                        </ConfigGroup>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans">
                                            <ConfigGroup label="TTS 보이스 페르소나">
                                                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-black shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100 appearance-none font-sans">
                                                    <option>부드러운 여성상 (헤이즐)</option>
                                                    <option>지적인 남성상 (주드)</option>
                                                    <option>차분한 중성 음성 (알렉스)</option>
                                                </select>
                                            </ConfigGroup>
                                            <ConfigGroup label="발화 속도 (Velocity)">
                                                <div className="flex items-center gap-5 py-4">
                                                    <input type="range" className="flex-1 accent-[#4F5B75] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                                                    <span className="text-xs font-black text-slate-400 uppercase tracking-tight">0.9x (어르신 맞춤형)</span>
                                                </div>
                                            </ConfigGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedTab === "SCRIPTS" && (
                            <div className="space-y-8 font-sans">
                                <div className="flex justify-between items-center font-sans">
                                    <div className="relative w-96">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 font-black" />
                                        <input
                                            type="text"
                                            placeholder="스크립트 시나리오 검색..."
                                            className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-black transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
                                        />
                                    </div>
                                    <button className="px-6 py-3.5 bg-[#4F5B75] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#3D475C] shadow-xl shadow-slate-100 flex items-center gap-3 transition-all font-sans">
                                        <Plus size={18} /> 신규 스크립트 제작
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                                    {SCRIPTS.map((script) => (
                                        <ScriptCard key={script.id} script={script} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

// --- Sub Components ---

function TabButton({ icon: Icon, label, active, onClick, desc }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full p-6 rounded-[2rem] flex flex-col items-start gap-2 transition-all text-left font-sans ${active
                ? "bg-white border-2 border-[#4F5B75] shadow-2xl shadow-slate-100 ring-4 ring-slate-50"
                : "bg-white/50 border border-slate-200 hover:bg-white hover:shadow-lg grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                }`}
        >
            <div className={`p-3 rounded-2xl mb-2 shadow-sm ${active ? "bg-[#4F5B75] text-white" : "bg-slate-100 text-slate-400"}`}>
                <Icon size={24} />
            </div>
            <p className={`text-sm font-black uppercase tracking-wider ${active ? "text-slate-900" : "text-slate-500"}`}>{label}</p>
            <p className="text-xs font-bold text-slate-400 mt-1 leading-normal italic">{desc}</p>
        </button>
    )
}

function ConfigGroup({ label, children }: any) {
    return (
        <div className="space-y-5 font-sans">
            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] flex items-center gap-2">
                <Settings size={16} /> {label}
            </label>
            {children}
        </div>
    )
}

function ScriptCard({ script }: any) {
    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-2xl transition-all group relative ring-1 ring-slate-200/50 font-sans">
            <div className="flex justify-between items-start mb-8">
                <div className={`p-3 rounded-2xl shadow-sm ${script.active ? "bg-slate-50 text-[#4F5B75]" : "bg-slate-50 text-slate-300"}`}>
                    <MessageSquare size={24} />
                </div>
                {script.active ? (
                    <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-emerald-50 text-[#5A9A7D] border border-emerald-100 uppercase tracking-widest">운영 배포 중</span>
                ) : (
                    <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-slate-50 text-slate-400 border border-slate-100 uppercase tracking-widest">초안/보관</span>
                )}
            </div>
            <h4 className="font-black text-slate-900 text-lg tracking-tight mb-4 group-hover:text-[#4F5B75] transition-colors font-sans">{script.name}</h4>
            <div className="flex items-center gap-10 pt-6 border-t border-slate-50 font-sans">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 font-sans">마지막 수정일</p>
                    <p className="text-xs font-black text-slate-700 tracking-tighter font-sans">{script.lastEdited}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 font-sans">총 통화 데이터</p>
                    <p className="text-xs font-black text-slate-700 tracking-tighter font-sans">{script.usage.toLocaleString()} 건</p>
                </div>
            </div>
            <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                <ChevronRight size={28} className="text-[#4F5B75]" />
            </div>
        </div>
    )
}
