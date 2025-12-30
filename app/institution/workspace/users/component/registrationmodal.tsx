'use client';

import { useState, useRef } from 'react';
import {
  X,
  UserPlus,
  Upload,
  FileText,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import Papa from 'papaparse';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  onSuccess,
}: RegistrationModalProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://4.sodam.store'; // 환경변수 없을 때 기본값
  const INSTITUTION_ID = process.env.NEXT_PUBLIC_INSTITUTION_ID || 'INST-003'; // 로그인 연동 전 임시 기관번호
  const [mode, setMode] = useState<'SINGLE' | 'CSV'>('SINGLE');
  const [loading, setLoading] = useState(false);
  const [csvRows, setCsvRows] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // CSV 파싱 및 초기 유효성 검사 (필수값 누락 체크)
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const parsedData = results.data.map((row: any) => ({
          name: row.이름 || '',
          age: row.나이 || '',
          gender: row.성별 || '남',
          address: row.주소 || '',
          mainCondition: row.상태 || '',
          aiSchedule: '매일 14:00',
          isInvalid: !row.이름 || !row.나이 || !row.주소, // 보정이 필요한지 체크
        }));
        setCsvRows(parsedData);
      },
    });
  };

  // CSV 테이블 내에서 직접 데이터 수정
  const updateCsvRow = (idx: number, field: string, value: string) => {
    const updated = [...csvRows];
    updated[idx][field] = value;
    // 수정 시 실시간 유효성 재검사
    updated[idx].isInvalid =
      !updated[idx].name || !updated[idx].age || !updated[idx].address;
    setCsvRows(updated);
  };

  // 최종 등록 실행
  const handleBulkSubmit = async () => {
    if (csvRows.length === 0) return;
    if (csvRows.some(row => row.isInvalid))
      return alert('⚠️ 누락된 정보를 모두 입력해주세요.');

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/care-users/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Institution-Id': INSTITUTION_ID,
          // "Authorization": `Bearer ${token}` // 로그인 연동 시 사용
        },
        body: JSON.stringify(
          csvRows.map(({ isInvalid, ...rest }) => ({
            ...rest,
            age: Number(rest.age), // 나이는 숫자로 변환
          })),
        ),
      });

      if (response.ok) {
        alert('성공적으로 등록되었습니다.');
        onSuccess();
        onClose();
      } else {
        throw new Error('서버 등록 중 오류가 발생했습니다.');
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-8 border-b flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#4F5B75] text-white rounded-2xl shadow-lg">
              <UserPlus size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              대상자 등록
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={28} className="text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-8 pt-6 gap-2 bg-slate-50/50">
          {['SINGLE', 'CSV'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
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

        <div className="flex-1 overflow-y-auto p-8 border-t border-slate-200">
          {mode === 'CSV' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
                <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                  <FileText size={16} /> CSV 파일을 업로드하여 대량의 데이터를
                  보정 후 등록하세요.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-700 transition-all shadow-sm"
                >
                  <Upload size={18} /> 파일 선택
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
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b">
                      <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest">
                        <th className="px-4 py-3 text-left">이름*</th>
                        <th className="px-4 py-3 text-left">나이*</th>
                        <th className="px-4 py-3 text-left">성별</th>
                        <th className="px-4 py-3 text-left">주소*</th>
                        <th className="px-4 py-3 text-center">상태</th>
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
                              className="w-full p-2 bg-transparent font-bold outline-none focus:bg-white focus:ring-1 ring-slate-200 rounded-lg transition-all"
                            />
                          </td>
                          <td className="px-2 py-1">
                            <input
                              value={row.age}
                              onChange={e =>
                                updateCsvRow(idx, 'age', e.target.value)
                              }
                              className="w-full p-2 bg-transparent font-bold outline-none focus:bg-white focus:ring-1 ring-slate-200 rounded-lg transition-all"
                            />
                          </td>
                          <td className="px-2 py-1">
                            <select
                              value={row.gender}
                              onChange={e =>
                                updateCsvRow(idx, 'gender', e.target.value)
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
                              className="w-full p-2 bg-transparent font-bold outline-none focus:bg-white focus:ring-1 ring-slate-200 rounded-lg transition-all"
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
          ) : (
            <div className="py-12 text-center text-slate-400 font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-3xl">
              개별 등록 폼은 여기에 추가
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
            onClick={handleBulkSubmit}
            disabled={loading || (mode === 'CSV' && csvRows.length === 0)}
            className="flex-[2] py-4 rounded-2xl bg-[#4F5B75] text-white font-black tracking-widest uppercase hover:bg-[#3D475C] shadow-lg shadow-slate-200 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              '등록 완료'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
