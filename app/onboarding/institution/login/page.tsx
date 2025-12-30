'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, AlertCircle, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: 추후 axios로 리팩토링
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '로그인에 실패했습니다');
      }

      // TODO: 토큰을 localStorage 또는 상태관리에 저장
      // localStorage.setItem('accessToken', data.accessToken);
      // localStorage.setItem('refreshToken', data.refreshToken);

      // 성공 시 대시보드로 이동
      router.push('/institution/workspace/dashboard');
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        email: error.message || '로그인 중 오류가 발생했습니다',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-[#F7F9F2] py-16 px-10">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
            로그인
          </h1>
          <p className="text-xl text-[#6E7F4F] font-medium italic">
            이메일과 비밀번호로 로그인하세요
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#E1EAD3]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#4A5D23] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                이메일 <span className="text-[#8FA963]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="example@email.com"
                className={`w-full px-4 py-4 rounded-xl border-2 bg-[#F7F9F2] focus:outline-none focus:border-[#8FA963] transition-colors ${
                  errors.email ? 'border-red-300' : 'border-[#E1EAD3]'
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#4A5D23] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                비밀번호 <span className="text-[#8FA963]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className={`w-full px-4 py-4 rounded-xl border-2 bg-[#F7F9F2] focus:outline-none focus:border-[#8FA963] transition-colors pr-12 ${
                    errors.password ? 'border-red-300' : 'border-[#E1EAD3]'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B8C5A] hover:text-[#4A5D23] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  // TODO: 비밀번호 찾기 페이지로 이동
                  console.log('Forgot password clicked');
                }}
                className="text-sm font-bold text-[#8FA963] hover:text-[#7A9351] transition-colors underline"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-[#F7F9F2] p-5 rounded-2xl border border-[#E1EAD3]">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔐</span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-bold text-[#4A5D23]">안전한 로그인</p>
                  <p className="text-xs text-[#6E7F4F] leading-relaxed">
                    회원가입 시 등록한 이메일과 비밀번호로 로그인하세요. 계정 정보는 안전하게 보호됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full h-16 text-lg font-bold rounded-2xl shadow-md transition-all ${
                  isFormValid && !isLoading
                    ? 'bg-[#8FA963] text-white hover:bg-[#7A9351] hover:scale-[1.01]'
                    : 'bg-[#D7E3C5] text-[#7B8C5A] cursor-not-allowed opacity-70'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    로그인 중...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="w-5 h-5" />
                    로그인
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="w-full h-14 text-base font-bold rounded-2xl border-2 border-[#E1EAD3] text-[#6E7F4F] hover:bg-[#F7F9F2] transition-all"
                disabled={isLoading}
              >
                이전으로
              </button>
            </div>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="bg-white p-6 rounded-2xl border border-[#E1EAD3] shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-bold text-[#4A5D23]">아직 계정이 없으신가요?</p>
              <p className="text-xs text-[#6E7F4F] leading-relaxed">
                새로운 계정을 만들어 서비스를 이용하세요.
              </p>
              <button
                type="button"
                onClick={() => router.push('/onboarding/institution/register/new-registration')}
                className="text-sm font-bold text-[#8FA963] hover:text-[#7A9351] transition-colors underline"
              >
                회원가입 하기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
