'use client';

import { useState, useRef } from 'react';
import {
  X,
  UserPlus,
  Upload,
  AlertCircle,
  Loader2,
  CheckCircle2,
  User,
  MapPin,
  Stethoscope,
  CalendarDays,
  Info,
} from 'lucide-react';
import Papa from 'papaparse';
import { useAuth } from '@/app/context/AuthContext';
import { fetchWithAuth } from '@/lib/api';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type RegistrationMode = 'SINGLE' | 'CSV';
type Gender = '남' | '여';

interface SingleRegistration {
  name: string;
  age: string;
  gender: Gender;
  address: string;
  mainCondition: string;
  aiSchedule: string;
}

interface CsvRow extends SingleRegistration {
  isInvalid: boolean;
}

const DEFAULT_AI_SCHEDULE = '매일 14:00';
const GENDERS: Gender[] = ['남', '여'];

const INITIAL_SINGLE_DATA: SingleRegistration = {
  name: '',
  age: '',
  gender: '남',
  address: '',
  mainCondition: '',
  aiSchedule: DEFAULT_AI_SCHEDULE,
};

const isRowInvalid = (row: SingleRegistration) =>
  !row.name.trim() || !row.age || !row.address.trim();

const normalizeCsvRow = (row: Partial<Record<string, string>>): CsvRow => {
  const normalized: SingleRegistration = {
    name: row['이름']?.trim() ?? '',
    age: row['나이']?.toString() ?? '',
    gender: (row['성별'] as Gender) ?? '남',
    address: row['주소']?.trim() ?? '',
    mainCondition: row['상태']?.trim() ?? '',
    aiSchedule: DEFAULT_AI_SCHEDULE,
  };

  return {
    ...normalized,
    isInvalid: isRowInvalid(normalized),
  };
};

export default function RegistrationModal({
  isOpen,
  onClose,
  onSuccess,
}: RegistrationModalProps) {
  const { institutionId } = useAuth();
  const [mode, setMode] = useState<RegistrationMode>('SINGLE');
  const [loading, setLoading] = useState(false);

  const [singleData, setSingleData] =
    useState<SingleRegistration>(INITIAL_SINGLE_DATA);
  const [csvRows, setCsvRows] = useState<CsvRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSingleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!institutionId) return alert('기관 정보가 확인되지 않습니다.');

    setLoading(true);
    try {
      const response = await fetchWithAuth('/api/care-users', {
        method: 'POST',
        body: JSON.stringify({
          ...singleData,
          age: Number(singleData.age),
        }),
      });

      if (response.ok) {
        alert('대상자가 등록되었습니다.');
        onSuccess();
        onClose();
        setSingleData(INITIAL_SINGLE_DATA);
      } else {
        const error = await response.json();
        throw new Error(error.message || '등록에 실패했습니다.');
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : '등록 처리 중 문제가 발생했습니다.';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const parsedData = results.data.map(normalizeCsvRow);
        setCsvRows(parsedData.filter(Boolean));
      },
    });
  };

  const updateCsvRow = <K extends keyof SingleRegistration>(
    idx: number,
    field: K,
    value: SingleRegistration[K],
  ) => {
    setCsvRows(prev => {
      if (!prev[idx]) return prev;
      const next = [...prev];
      const updatedRow = {
        ...next[idx],
        [field]: value,
      };

      next[idx] = {
        ...updatedRow,
        isInvalid: isRowInvalid(updatedRow),
      };

      return next;
    });
  };

  const handleBulkSubmit = async () => {
    if (!institutionId) return alert('기관 정보가 없습니다.');
    if (!csvRows.length) return alert('업로드된 CSV 데이터가 없습니다.');
    if (csvRows.some(row => row.isInvalid))
      return alert('⚠️ 빨간색으로 표시된 필수 항목을 입력해주세요.');

    setLoading(true);
    try {
      const response = await fetchWithAuth('/api/care-users/bulk', {
        method: 'POST',
        body: JSON.stringify(
          csvRows.map(({ isInvalid, ...rest }) => ({
            ...rest,
            age: Number(rest.age),
          })),
        ),
      });

      if (response.ok) {
        alert(`${csvRows.length}명의 대상자가 등록되었습니다.`);
        onSuccess();
        onClose();
        setCsvRows([]);
      } else {
        throw new Error('단체 등록 중 서버 오류가 발생했습니다.');
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : '단체 등록 처리 중 문제가 발생했습니다.';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const submitDisabled =
    loading ||
    !institutionId ||
    (mode === 'CSV' &&
      (csvRows.length === 0 || csvRows.some(row => row.isInvalid)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#4F5B75] text-white rounded-2xl shadow-lg">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                대상자 등록
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider">
                기관 코드: {institutionId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={28} className="text-slate-400" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex px-8 pt-6 gap-2 bg-slate-50/50">
          {(['SINGLE', 'CSV'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-6 py-3 rounded-t-2xl text-sm font-black transition-all ${
                mode === m
                  ? 'bg-white border-x border-t border-slate-200 text-[#4F5B75]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {m === 'SINGLE' ? '개별 등록' : 'CSV 단체 등록'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 border-t border-slate-200 bg-white">
          {mode === 'SINGLE' ? (
            <form
              id="single-reg-form"
              onSubmit={handleSingleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 flex items-center gap-2">
                    <User size={14} /> 이름{' '}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    value={singleData.name}
                    onChange={e =>
                      setSingleData({ ...singleData, name: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#4F5B75]/10 outline-none transition-all"
                    placeholder="홍길동"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 flex items-center gap-2">
                    <CalendarDays size={14} /> 나이{' '}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    value={singleData.age}
                    onChange={e =>
                      setSingleData({ ...singleData, age: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#4F5B75]/10 outline-none transition-all"
                    placeholder="80"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500">
                  성별
                </label>
                <div className="flex gap-3">
                  {GENDERS.map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() =>
                        setSingleData({ ...singleData, gender: g })
                      }
                      className={`flex-1 py-3.5 rounded-xl font-black text-sm border-2 transition-all ${
                        singleData.gender === g
                          ? 'border-[#4F5B75] bg-[#4F5B75] text-white'
                          : 'border-slate-100 bg-slate-50 text-slate-400'
                      }`}
                    >
                      {g}성
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 flex items-center gap-2">
                  <MapPin size={14} /> 주소{' '}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  value={singleData.address}
                  onChange={e =>
                    setSingleData({ ...singleData, address: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#4F5B75]/10 outline-none transition-all"
                  placeholder="서울특별시 강남구..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 flex items-center gap-2">
                  <Stethoscope size={14} /> 상태 및 질환
                </label>
                <textarea
                  value={singleData.mainCondition}
                  onChange={e =>
                    setSingleData({
                      ...singleData,
                      mainCondition: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-[#4F5B75]/10 outline-none transition-all resize-none"
                  placeholder="기저질환이나 특이사항을 입력하세요."
                />
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
                <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                  <Info size={16} className="text-[#4F5B75]" /> CSV 파일로 일괄
                  등록할 수 있습니다.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                >
                  <Upload size={18} /> 파일 업로드
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCsvUpload}
                  accept=".csv"
                  className="hidden"
                />
              </div>

              {csvRows.length > 0 && (
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b">
                      <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest">
                        <th className="px-4 py-3 text-left">이름*</th>
                        <th className="px-4 py-3 text-left">나이*</th>
                        <th className="px-4 py-3 text-left">성별</th>
                        <th className="px-4 py-3 text-left">주소*</th>
                        <th className="px-4 py-3 text-center">확인</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {csvRows.map((row, idx) => (
                        <tr
                          key={idx}
                          className={row.isInvalid ? 'bg-red-50/50' : ''}
                        >
                          <td className="px-2 py-1">
                            <input
                              value={row.name}
                              onChange={e =>
                                updateCsvRow(idx, 'name', e.target.value)
                              }
                              className="w-full p-2 bg-transparent font-bold outline-none rounded-lg focus:bg-white"
                            />
                          </td>
                          <td className="px-2 py-1">
                            <input
                              value={row.age}
                              onChange={e =>
                                updateCsvRow(idx, 'age', e.target.value)
                              }
                              className="w-full p-2 bg-transparent font-bold outline-none rounded-lg focus:bg-white"
                            />
                          </td>
                          <td className="px-2 py-1">
                          <select
                            value={row.gender}
                            onChange={e =>
                              updateCsvRow(
                                idx,
                                'gender',
                                e.target.value as '남' | '여',
                              )
                            }
                            className="w-full p-2 bg-transparent font-bold outline-none"
                          >
                            <option value="남">남</option>
                            <option value="여">여</option>
                          </select>
                          </td>
                          <td className="px-2 py-1">
                            <input
                              value={row.address}
                              onChange={e =>
                                updateCsvRow(idx, 'address', e.target.value)
                              }
                              className="w-full p-2 bg-transparent font-bold outline-none rounded-lg focus:bg-white"
                            />
                          </td>
                          <td className="px-4 py-1 text-center">
                            {row.isInvalid ? (
                              <AlertCircle
                                className="text-red-500 mx-auto"
                                size={18}
                              />
                            ) : (
                              <CheckCircle2
                                className="text-emerald-500 mx-auto"
                                size={18}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50 border-t flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl bg-white border border-slate-200 text-slate-500 font-black tracking-widest uppercase hover:bg-slate-100 transition-all"
          >
            취소
          </button>
          <button
            form={mode === 'SINGLE' ? 'single-reg-form' : undefined}
            onClick={mode === 'CSV' ? handleBulkSubmit : undefined}
            disabled={submitDisabled}
            className="flex-[2] py-4 rounded-2xl bg-[#4F5B75] text-white font-black tracking-widest uppercase hover:bg-[#3D475C] shadow-lg shadow-slate-200 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              '등록 완료'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
