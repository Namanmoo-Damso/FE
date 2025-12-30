'use client';

import { useRouter } from 'next/navigation';
import { UserPlus, LogIn } from 'lucide-react';

export default function LoginSelectionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F9F2] py-16 px-10">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
            환영합니다
          </h1>
          <p className="text-xl text-[#6E7F4F] font-medium italic">
            처음 등록하시나요, 아니면 기존 등록 정보가 있으신가요?
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* 처음 등록 Card */}
          <button
            onClick={() => router.push('/onboarding/institution/register/new-registration')}
            className="group bg-white p-10 rounded-3xl shadow-sm border-2 border-[#E1EAD3] hover:border-[#8FA963] hover:shadow-md transition-all hover:scale-[1.02] text-left"
          >
            <div className="space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#F7F9F2] flex items-center justify-center group-hover:bg-[#E9F0DF] transition-colors">
                <UserPlus className="w-8 h-8 text-[#8FA963]" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-[#4A5D23]">
                  처음 등록
                </h2>
                <p className="text-base text-[#6E7F4F] leading-relaxed">
                  새로운 계정을 만들고 기관 정보를 등록합니다
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2 pt-4 border-t border-[#E1EAD3]">
                <div className="flex items-start gap-2">
                  <span className="text-[#8FA963] mt-0.5">✓</span>
                  <span className="text-sm text-[#7B8C5A]">새 계정 생성</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#8FA963] mt-0.5">✓</span>
                  <span className="text-sm text-[#7B8C5A]">기관 정보 등록</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#8FA963] mt-0.5">✓</span>
                  <span className="text-sm text-[#7B8C5A]">즉시 서비스 이용 가능</span>
                </div>
              </div>
            </div>
          </button>

          {/* 기존 기관 Card */}
          <button
            onClick={() => router.push('/onboarding/institution/register/existing-user')}
            className="group bg-white p-10 rounded-3xl shadow-sm border-2 border-[#E1EAD3] hover:border-[#8FA963] hover:shadow-md transition-all hover:scale-[1.02] text-left"
          >
            <div className="space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#F7F9F2] flex items-center justify-center group-hover:bg-[#E9F0DF] transition-colors">
                <LogIn className="w-8 h-8 text-[#8FA963]" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-[#4A5D23]">
                  기존 기관
                </h2>
                <p className="text-base text-[#6E7F4F] leading-relaxed">
                  이미 등록된 기관 번호로 새로운 계정을 만듭니다
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2 pt-4 border-t border-[#E1EAD3]">
                <div className="flex items-start gap-2">
                  <span className="text-[#8FA963] mt-0.5">✓</span>
                  <span className="text-sm text-[#7B8C5A]">기관 번호 입력</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#8FA963] mt-0.5">✓</span>
                  <span className="text-sm text-[#7B8C5A]">개인 계정 생성</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#8FA963] mt-0.5">✓</span>
                  <span className="text-sm text-[#7B8C5A]">기관 정보 자동 연결</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-[#F7F9F2] p-6 rounded-2xl border border-[#E1EAD3]">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="text-sm text-[#6E7F4F] leading-relaxed">
                <span className="font-bold text-[#4A5D23]">처음 등록</span>은 새로운 기관을 처음 등록하는 경우 선택하세요.
                <span className="font-bold text-[#4A5D23] ml-2">기존 기관</span>은 이미 등록된 기관에 속한 직원이 계정을 만드는 경우 선택하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
