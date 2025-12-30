'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  Bot,
  LayoutDashboard,
  Video,
  UserCog,
  Bell,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  BrainCircuit,
} from 'lucide-react';

const SIDEBAR_MENU = [
  {
    label: '대시보드',
    icon: LayoutDashboard,
    href: '/institution/workspace/dashboard',
  },
  {
    label: '실시간 모니터링',
    icon: Video,
    href: '/institution/workspace/monitoring',
  },
  { label: '대상자 관리', icon: Users, href: '/institution/workspace/users' },
  { label: '담당자 관리', icon: UserCog, href: '/institution/workspace/staff' },
  {
    label: 'AI 설정 및 스크립트',
    icon: BrainCircuit,
    href: '/institution/workspace/ai-config',
  },
  {
    label: '알림 · 대응 기록',
    icon: Bell,
    href: '/institution/workspace/alerts',
  },
  {
    label: '통계 · 성과',
    icon: BarChart3,
    href: '/institution/workspace/stats',
  },
  {
    label: '기관 설정',
    icon: Settings,
    href: '/institution/workspace/settings',
  },
];

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F5F7FA] font-sans text-slate-800 overflow-hidden">
      {/* 1. Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 flex flex-col transition-all duration-300 relative z-20 flex-shrink-0`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-8 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 text-slate-500 z-50 transition-colors"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
        </button>

        {/* Logo Area */}
        <div
          className={`h-16 flex items-center border-b border-slate-100 ${
            isSidebarOpen ? 'px-6' : 'justify-center'
          }`}
        >
          <div className="w-8 h-8 bg-[#4F5B75] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
            <Bot className="text-white" size={20} />
          </div>
          {isSidebarOpen && (
            <span className="font-black text-slate-800 text-xl tracking-tight ml-3 animate-in fade-in duration-300">
              담소 AI 센터
            </span>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {SIDEBAR_MENU.map(item => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-semibold transition-all group ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                } ${!isSidebarOpen && 'justify-center'}`}
                title={!isSidebarOpen ? item.label : ''}
              >
                <item.icon
                  size={22}
                  className={`flex-shrink-0 ${
                    isActive ? 'text-[#4F5B75]' : 'group-hover:text-slate-700'
                  }`}
                />
                {isSidebarOpen && (
                  <span className="whitespace-nowrap animate-in slide-in-from-left-2 duration-300">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Area */}
        <div
          className={`p-4 border-t border-slate-100 ${
            !isSidebarOpen && 'flex justify-center'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
              <User size={16} />
            </div>
            {isSidebarOpen && (
              <div className="text-sm truncate overflow-hidden animate-in fade-in duration-300">
                <p className="font-black text-slate-700">관리자 김돌봄</p>
                <p className="text-slate-400 text-xs font-bold">
                  시스템 정상 가동 중
                </p>
              </div>
            )}
            {isSidebarOpen && (
              <Link
                href="/logout"
                className="ml-auto text-slate-400 hover:text-red-500 transition-colors"
              >
                <LogOut size={14} />
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* 2. Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
