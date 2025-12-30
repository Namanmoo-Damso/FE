'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Bot,
  MapPin,
  FileText,
  Phone,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useDebounce } from '@/hooks/use-debounce';
import RegistrationModal from './component/registrationmodal';
import { useAuth } from '@/app/context/AuthContext';
import { fetchWithAuth } from '@/lib/api';

// --- API 타입 정의 ---
type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

interface CareUser {
  id: string;
  name: string;
  age: number;
  gender: string;
  address: string;
  riskLevel: RiskLevel;
  mainCondition: string;
  aiSchedule: string;
  lastAiReport: string | null;
  manager: string;
  regType: 'INSTITUTION' | 'PRIVATE';
}

interface FilterButtonProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  isCritical?: boolean;
}

export default function UserManagementPage() {
  const { institutionId } = useAuth();

  const [users, setUsers] = useState<CareUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'HIGH'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 검색 최적화: 타이핑을 멈추고 300ms 후 필터링 반영
  const debouncedSearch = useDebounce(searchTerm, 300);

  const fetchUsers = useCallback(async () => {
    if (!institutionId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetchWithAuth('/api/care-users');

      if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.');

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : '데이터를 불러오는데 실패했습니다.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [institutionId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(
    () =>
      users.filter(user => {
        const matchesFilter = filterType === 'ALL' || user.riskLevel === 'HIGH';
        const matchesSearch =
          user.name.includes(debouncedSearch) ||
          user.address.includes(debouncedSearch) ||
          (user.manager && user.manager.includes(debouncedSearch));

        return matchesFilter && matchesSearch;
      }),
    [debouncedSearch, filterType, users],
  );

  const highRiskCount = useMemo(
    () => users.filter(user => user.riskLevel === 'HIGH').length,
    [users],
  );

  const showInitialLoader = loading && (!users.length || !institutionId);

  if (showInitialLoader)
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-bold uppercase tracking-widest">데이터 로딩 중...</p>
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 flex-shrink-0 z-10 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            대상자 관리
          </h1>
          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
            기관번호: {institutionId || '불러오는 중...'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#4F5B75] hover:bg-[#3D475C] text-white px-8 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-100 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} /> 신규 대상자 등록
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="px-10 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 flex-shrink-0">
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <FilterButton
            label="전체 대상자"
            count={users.length}
            active={filterType === 'ALL'}
            onClick={() => setFilterType('ALL')}
          />
          <FilterButton
            label="중점 관리"
            count={highRiskCount}
            active={filterType === 'HIGH'}
            onClick={() => setFilterType('HIGH')}
            isCritical
          />
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 font-black" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="이름, 주소, 담당자 검색..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-[22px] text-sm font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F5B75]/20"
          />
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-y-auto px-10 pb-10">
        {error ? (
          <div className="p-12 text-center text-red-500 font-bold uppercase">
            {error}
          </div>
        ) : (
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden ring-1 ring-slate-200/50">
            <div className="overflow-x-auto font-sans">
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead className="bg-slate-50/80 border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                      대상자 정보
                    </th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                      상태 및 위험도
                    </th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                      AI 케어 스케줄
                    </th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                      담당자
                    </th>
                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400 text-center">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map(user => (
                    <tr
                      key={user.id}
                      className="group hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-lg border-2 border-white shadow-sm group-hover:bg-[#4F5B75] group-hover:text-white transition-all uppercase">
                            {user.name[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-slate-800 text-base tracking-tight truncate">
                              {user.name}{' '}
                              <span className="font-bold text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 border rounded-lg ml-1.5">
                                {user.age}세/{user.gender}
                              </span>
                            </p>
                            <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-2 truncate">
                              <MapPin size={14} className="text-slate-300" />{' '}
                              {user.address}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <RiskTag level={user.riskLevel} />
                        <p
                          className="text-xs text-slate-400 mt-3 font-bold truncate max-w-[220px]"
                          title={user.mainCondition}
                        >
                          질환: {user.mainCondition}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 mb-2.5">
                          <div className="p-1.5 bg-slate-100 rounded-lg text-[#4F5B75]">
                            <Bot size={14} />
                          </div>
                          <span className="text-xs font-black text-slate-700 tracking-tight uppercase">
                            {user.aiSchedule}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText
                            size={14}
                            className="text-slate-300 mt-0.5"
                          />
                          <span className="text-[11px] font-bold text-slate-400 truncate max-w-[240px] italic">
                            {user.lastAiReport || '리포트 대기 중'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-block px-4 py-2 bg-slate-50 text-[10px] font-black text-slate-600 rounded-xl uppercase tracking-widest border border-slate-100">
                          {user.manager || '미지정'}{' '}
                          {user.regType === 'INSTITUTION'
                            ? '사회복지사'
                            : '보호자'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center gap-3">
                          <Link
                            href={`/institution/workspace/users/${user.id}`}
                          >
                            <button
                              className="p-3 text-slate-400 hover:text-[#4F5B75] hover:bg-white rounded-2xl shadow-sm border border-transparent hover:border-slate-200 transition-all"
                              title="상세보기"
                            >
                              <ArrowRight size={20} />
                            </button>
                          </Link>
                          <button
                            className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-2xl shadow-sm border border-transparent hover:border-emerald-100 transition-all"
                            title="통화"
                          >
                            <Phone size={20} />
                          </button>
                          <button className="p-3 text-slate-400 hover:text-slate-800 hover:bg-white rounded-2xl shadow-sm border border-transparent hover:border-slate-200 transition-all">
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
              <div className="p-32 text-center bg-slate-50/30 uppercase tracking-[0.2em]">
                <Users size={48} className="mx-auto mb-6 text-slate-200" />
                <p className="text-xs font-black text-slate-400">
                  데이터가 존재하지 않습니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 신규 등록 모달 */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchUsers}
      />
    </div>
  );
}

function FilterButton({
  label,
  count,
  active,
  onClick,
  isCritical,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-3 ${
        active
          ? isCritical
            ? 'bg-[#C05656] text-white shadow-lg shadow-red-100'
            : 'bg-[#4F5B75] text-white shadow-lg shadow-slate-200'
          : 'text-slate-400 hover:text-slate-900'
      }`}
    >
      {label}
      <span
        className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
          active ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function RiskTag({ level }: { level: RiskLevel }) {
  if (level === 'HIGH') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 border border-red-100">
        중점 관리 (High)
      </span>
    );
  }
  if (level === 'MEDIUM') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100">
        관찰 요망 (Mid)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
      안정 중 (Low)
    </span>
  );
}
