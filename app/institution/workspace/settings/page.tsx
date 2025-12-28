"use client"

import {
    Settings,
    Shield,
    Database,
    Bell,
    Globe,
    Lock,
    Clock,
    User,
    Save,
    Trash2,
    Key,
    Smartphone
} from "lucide-react"

export default function SettingsPage() {
    return (
        <>
            {/* Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10 font-sans">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">기관 글로벌 설정</h1>
                    <p className="text-slate-500 text-sm mt-0.5 font-semibold">보안 정책, 데이터 가용성 및 기관 프로필 통합 관리</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-[#4F5B75] hover:bg-[#3D475C] text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.1em] shadow-xl shadow-slate-100 transition-all flex items-center gap-3 font-sans">
                        <Save size={18} /> 설정 전체 배포 (Sync)
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#F5F7FA]">
                <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">

                    {/* Section 1: Institutional Profile */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden ring-1 ring-slate-200/50 font-sans">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/30 font-sans">
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 font-sans">
                                <User size={18} /> 기관 기본 프로필
                            </h2>
                        </div>
                        <div className="p-10 space-y-8 font-sans">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans">
                                <SettingItem label="기관 공식 명칭">
                                    <input type="text" defaultValue="담소 시니어 케어 센터 (성북본점)" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-black shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100 font-sans" />
                                </SettingItem>
                                <SettingItem label="사업자 등록 정보">
                                    <input type="text" defaultValue="120-81-12345" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-black shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100 font-sans" />
                                </SettingItem>
                            </div>
                            <SettingItem label="사업장 소재지 주소">
                                <div className="flex gap-4 font-sans">
                                    <input type="text" defaultValue="서울특별시 성북구 보문로 123, 담소빌딩 4층" className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-black shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-100 font-sans" />
                                    <button className="px-6 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-[#4F5B75] hover:bg-slate-50 transition-all shadow-sm">인증 조회</button>
                                </div>
                            </SettingItem>
                        </div>
                    </div>

                    {/* Section 2: Security & Access Control */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden ring-1 ring-slate-200/50 font-sans">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/30 font-sans">
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 font-sans">
                                <Shield size={18} /> 정보 보안 및 계정 관리
                            </h2>
                        </div>
                        <div className="p-10 divide-y divide-slate-100 font-sans">
                            <SettingRow
                                icon={Smartphone}
                                title="다중 요소 인증 (MFA) 의무화"
                                desc="모든 운영 담당자의 로그인 시 OTP 또는 SMS 추가 인증을 필수적으로 요구합니다."
                            >
                                <Toggle active />
                            </SettingRow>
                            <SettingRow
                                icon={Clock}
                                title="휴면 세션 자동 종료 시간"
                                desc="일정 시간 동안 플랫폼 내 활동이 감지되지 않으면 보안을 위해 강제 로그아웃됩니다."
                            >
                                <select className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-widest focus:outline-none ring-2 ring-slate-100 font-sans shadow-sm">
                                    <option>15 Minute</option>
                                    <option>30 Minute</option>
                                    <option>1 Hour</option>
                                </select>
                            </SettingRow>
                            <SettingRow
                                icon={Globe}
                                title="접근 화이트리스트 IP 제한"
                                desc="기관 내 특정 네트워크 대역에서만 관제 워크스페이스에 접근 가능하도록 제한합니다."
                            >
                                <button className="text-xs font-black text-[#4F5B75] uppercase tracking-widest hover:text-[#2E3747] transition-all border-b-2 border-[#4F5B75]/20 hover:border-[#4F5B75] pb-0.5">IP 정책 설정</button>
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 3: Data & Privacy Policy */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden ring-1 ring-slate-200/50 font-sans">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/30 font-sans">
                            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 font-sans">
                                <Database size={18} /> 데이터 보존 및 민감도 관리
                            </h2>
                        </div>
                        <div className="p-10 divide-y divide-slate-100 font-sans">
                            <SettingRow
                                icon={Lock}
                                title="통화 원본 로그 보관 주기"
                                desc="AI 안부 전화의 녹음 데이터 및 발화 큐 기록의 서버 내 보관 기간을 명시합니다."
                            >
                                <select className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-widest focus:outline-none ring-2 ring-slate-100 font-sans shadow-sm">
                                    <option>1 Year</option>
                                    <option>3 Year</option>
                                    <option>Semi-Permanent</option>
                                </select>
                            </SettingRow>
                            <SettingRow
                                icon={Bell}
                                title="위험 감지 AI 스코어 감도"
                                desc="알고리즘이 '긴급'으로 판단하는 임계치를 조절합니다. 높아질수록 리포트 빈도가 증가합니다."
                            >
                                <div className="flex flex-col items-end gap-3 font-sans">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-slate-400">저민감</span>
                                        <div className="w-48 h-2 bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                                            <div className="absolute inset-0 bg-[#4F5B75] w-3/4 shadow-lg" />
                                        </div>
                                        <span className="text-[10px] font-black text-[#4F5B75]">고민감 (High)</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-300">현재 설정: 최적 정밀도 (Balanced)</p>
                                </div>
                            </SettingRow>
                        </div>
                    </div>

                    {/* Section 4: Critical Zone */}
                    <div className="bg-[#FFF5F5] rounded-[2rem] border border-[#FAD2D2] p-10 flex flex-col md:flex-row items-center justify-between gap-8 group font-sans shadow-sm">
                        <div className="flex gap-6 items-start font-sans">
                            <div className="p-4 bg-white text-[#C05656] rounded-2xl group-hover:rotate-12 transition-transform shadow-xl ring-2 ring-red-50">
                                <Trash2 size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-[#8B3D3D] tracking-tight">기관 계정 해지 및 데이터 영구 파기</h3>
                                <p className="text-sm font-bold text-[#C05656]/70 mt-2 max-w-md leading-relaxed">기관 소유의 모든 대상자 기록, 통화 이력, 관리자 데이터를 즉시 삭제하며 이는 어떠한 경우에도 복구될 수 없습니다.</p>
                            </div>
                        </div>
                        <button className="whitespace-nowrap px-8 py-4 bg-white border border-[#FAD2D2] text-[#C05656] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#C05656] hover:text-white transition-all shadow-xl">해지 프로세스 시작</button>
                    </div>

                </div>
            </div>
        </>
    )
}

// --- Sub Components ---

function SettingItem({ label, children }: any) {
    return (
        <div className="space-y-4 font-sans">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
            {children}
        </div>
    )
}

function SettingRow({ icon: Icon, title, desc, children }: any) {
    return (
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 first:pt-0 last:pb-0 font-sans">
            <div className="flex gap-6 max-w-xl">
                <div className="mt-1 p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 shadow-inner group-hover:bg-white transition-all">
                    <Icon size={24} />
                </div>
                <div className="font-sans">
                    <h3 className="font-black text-slate-900 text-lg tracking-tight font-sans">{title}</h3>
                    <p className="text-sm font-bold text-slate-500 mt-1.5 leading-relaxed font-sans">{desc}</p>
                </div>
            </div>
            <div className="w-full sm:w-auto flex justify-end">
                {children}
            </div>
        </div>
    )
}

function Toggle({ active }: { active?: boolean }) {
    return (
        <div className={`w-14 h-7 rounded-full relative transition-colors cursor-pointer border shadow-inner ${active ? 'bg-[#4F5B75] border-[#3D475C]' : 'bg-slate-200 border-slate-300'}`}>
            <div className={`absolute top-1 w-4.5 h-4.5 bg-white rounded-full transition-all shadow-md ${active ? 'left-8' : 'left-1'}`} />
        </div>
    )
}
