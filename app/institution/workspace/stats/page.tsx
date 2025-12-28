"use client"

import {
    BarChart3,
    TrendingUp,
    Users,
    PhoneCall,
    CheckCircle2,
    Calendar,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Brain
} from "lucide-react"

// --- Mock Data ---

const PERFORMANCE_KPIS = [
    { label: "전월 대비 통화 성공 건수", value: "3,842", trend: "+12.4%", trendUp: true, icon: CheckCircle2, color: "text-[#5A9A7D]", bg: "bg-emerald-50" },
    { label: "현재 관리 대상자 명단", value: "156", trend: "+4", trendUp: true, icon: Users, color: "text-[#4F5B75]", bg: "bg-slate-50" },
    { label: "평균 AI 감정 인지 점수", value: "8.4/10", trend: "-0.2", trendUp: false, icon: Brain, color: "text-[#D9A34A]", bg: "bg-amber-50" },
    { label: "사회복지사 실질 개입률", value: "4.2%", trend: "-1.1%", trendUp: true, icon: Activity, color: "text-[#C05656]", bg: "bg-[#FFF5F5]" },
]

export default function StatisticsPage() {
    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10 font-sans">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight font-sans">성과 분석 및 통계</h1>
                    <p className="text-slate-500 text-sm mt-0.5 font-semibold">AI 케어 서비스 운영 실적 및 대상자 건강 지표 추이 분석</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-3">
                        <Calendar size={18} /> 최근 30일 (Periodic)
                    </button>
                    <button className="bg-[#4F5B75] hover:bg-[#3D475C] text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl transition-all flex items-center gap-3 font-sans">
                        <Download size={18} /> 종합 PDF 리포트 추출
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#F5F7FA]">
                <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 font-sans">
                        {PERFORMANCE_KPIS.map((kpi, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 ring-1 ring-slate-200/50 group">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-4 rounded-2xl shadow-inner ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <kpi.icon size={28} />
                                    </div>
                                    <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-tight ${kpi.trendUp ? "text-[#5A9A7D]" : "text-[#C05656]"}`}>
                                        {kpi.trendUp ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                                        {kpi.trend}
                                    </div>
                                </div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{kpi.label}</p>
                                <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{kpi.value}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Charts Section (Visual Simulation) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 font-sans">

                        {/* Monthly Call Volume (Simulation) */}
                        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm flex flex-col min-h-[450px] ring-1 ring-slate-200/50 font-sans">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h2 className="text-xl font-black text-slate-800 tracking-tight">AI 케어 서비스 수행량 추이</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5 font-sans">2024년 월별 AI 자동 안부 전화 성공 건수 분석</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-2.5 text-xs font-black text-slate-400 uppercase tracking-widest">
                                        <div className="w-3 h-3 rounded-full bg-[#4F5B75] shadow-sm" /> 성북구 운영 실적
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 flex items-end justify-between gap-5 pb-5">
                                {[45, 62, 58, 75, 90, 82, 95, 110, 105, 120, 115, 130].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                        <div
                                            className="w-full bg-slate-50/50 border border-slate-100/50 rounded-t-2xl group-hover:bg-[#4F5B75] transition-all duration-300 cursor-pointer relative shadow-inner"
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-2xl">
                                                {h * 42}건
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter font-mono">{i + 1}월</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sentiment Distribution (Simulation) */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 p-10 shadow-sm flex flex-col ring-1 ring-slate-200/50 font-sans">
                            <h2 className="text-xl font-black text-slate-800 tracking-tight mb-10">어르신 정서 상태 분포</h2>

                            <div className="flex-1 space-y-10">
                                <SentimentRow label="안정 / 행복" percentage={75} color="bg-[#5A9A7D]" emoji="😄" />
                                <SentimentRow label="일상적임 (Normal)" percentage={18} color="bg-[#4F5B75]" emoji="😐" />
                                <SentimentRow label="고독 / 무기력" percentage={5} color="bg-[#D9A34A]" emoji="☁️" />
                                <SentimentRow label="긴급 우울 / 불안" percentage={2} color="bg-[#C05656]" emoji="🆘" />
                            </div>

                            <div className="mt-10 p-6 bg-slate-50/50 rounded-[1.5rem] border border-slate-100 italic font-sans flex items-start gap-4">
                                <div className="mt-1 text-[#4F5B75]"><Brain size={18} /></div>
                                <p className="text-xs text-slate-600 font-bold leading-relaxed">
                                    "전주 대비 긍정 감정 지표가 4.2% 상향되었습니다. 지역 사회 연계 프로그램 활성화에 따른 정서적 고립감 해소가 원인으로 파악됩니다."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Reports Table */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm ring-1 ring-slate-200/50 font-sans">
                        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white font-sans">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <BarChart3 size={32} className="text-[#4F5B75]" /> 운영 및 감사 통합 레포트 아카이브
                            </h2>
                            <button className="text-xs font-black text-[#4F5B75] hover:text-[#2E3747] uppercase tracking-widest transition-all flex items-center gap-2 font-sans border border-[#4F5B75]/20 px-4 py-2 rounded-xl hover:bg-slate-50">
                                관리 이력 전체 보기 <ArrowUpRight size={18} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead className="bg-slate-50/30 font-sans border-b border-slate-100">
                                    <tr>
                                        <th className="px-10 py-5 text-xs font-black uppercase text-slate-400 tracking-widest">보고서 명칭</th>
                                        <th className="px-10 py-5 text-xs font-black uppercase text-slate-400 tracking-widest">분석 대상</th>
                                        <th className="px-10 py-5 text-xs font-black uppercase text-slate-400 tracking-widest text-center">서비스 가용성</th>
                                        <th className="px-10 py-5 text-xs font-black uppercase text-slate-400 tracking-widest">생성일자</th>
                                        <th className="px-10 py-5 text-xs font-black uppercase text-slate-400 tracking-widest text-center">다운로드</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 font-sans">
                                    {[
                                        { title: "2024년 5월 3주차 성북구 AI 안부 확인 종합 분석 (Draft)", scope: "성북구 관할 전체", rate: "98.2%", date: "2024.05.21" },
                                        { title: "고위험군 대상자 집중 관제 및 에스컬레이션 효율 리포트", scope: "중점 관리군", rate: "92.5%", date: "2024.05.14" },
                                        { title: "사회복지사 현장 개입 및 관제 조치 내역 감사 기록부", scope: "운영 담당 전체", rate: "100%", date: "2024.05.07" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-all duration-300 group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-slate-50 text-slate-400 group-hover:bg-[#4F5B75] group-hover:text-white transition-all shadow-inner rounded-xl">
                                                        <FileSearchIcon size={20} />
                                                    </div>
                                                    <span className="text-base font-black text-slate-800 tracking-tight">{row.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6"><span className="text-[10px] font-black text-slate-500 uppercase bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">{row.scope}</span></td>
                                            <td className="px-10 py-6 text-base font-black text-[#5A9A7D] tracking-tighter text-center">{row.rate}</td>
                                            <td className="px-10 py-6 text-xs font-bold text-slate-400 tabular-nums uppercase">{row.date}</td>
                                            <td className="px-10 py-6 text-center">
                                                <button className="text-[#4F5B75] hover:text-[#3D475C] transition-all hover:scale-125"><Download size={24} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// --- Sub Components ---

function SentimentRow({ label, percentage, color, emoji }: any) {
    return (
        <div className="space-y-4 font-sans">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                <span className="text-slate-600 flex items-center gap-3">{emoji} {label}</span>
                <span className="text-slate-900 text-sm">{percentage}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                <div
                    className={`h-full ${color} transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

function FileSearchIcon({ size, ...props }: any) {
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <circle cx="10" cy="15" r="3" />
            <line x1="12" y1="17" x2="15" y2="20" />
        </svg>
    )
}
