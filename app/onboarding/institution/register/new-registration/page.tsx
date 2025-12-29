'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, User, Lock, AlertCircle } from 'lucide-react';

export default function NewRegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '회원가입에 실패했습니다');
      }

      // 성공 시 다음 단계로 이동
      router.push('/onboarding/institution/step1-criteria');
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        email: error.message || '회원가입 중 오류가 발생했습니다',
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

  const isFormValid = formData.name && formData.email && formData.password &&
                      formData.confirmPassword && Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-[#F7F9F2] py-16 px-10">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
            새 계정 만들기
          </h1>
          <p className="text-xl text-[#6E7F4F] font-medium italic">
            기본 정보를 입력하여 계정을 생성하세요
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#E1EAD3]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#4A5D23] flex items-center gap-2">
                <User className="w-4 h-4" />
                이름 <span className="text-[#8FA963]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className={`w-full px-4 py-4 rounded-xl border-2 bg-[#F7F9F2] focus:outline-none focus:border-[#8FA963] transition-colors ${
                  errors.name ? 'border-red-300' : 'border-[#E1EAD3]'
                }`}
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
            </div>

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
                  placeholder="최소 8자 이상"
                  className={`w-full px-4 py-4 rounded-xl border-2 bg-[#F7F9F2] focus:outline-none focus:border-[#8FA963] transition-colors pr-12 ${
                    errors.password ? 'border-red-300' : 'border-[#E1EAD3]'
                  }`}
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#4A5D23] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                비밀번호 확인 <span className="text-[#8FA963]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  className={`w-full px-4 py-4 rounded-xl border-2 bg-[#F7F9F2] focus:outline-none focus:border-[#8FA963] transition-colors pr-12 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-[#E1EAD3]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B8C5A] hover:text-[#4A5D23] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </div>
              )}
              {!errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="flex items-center gap-2 text-sm text-[#8FA963]">
                  <AlertCircle className="w-4 h-4" />
                  비밀번호가 일치합니다
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-[#F7F9F2] p-5 rounded-2xl border border-[#E1EAD3]">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔒</span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-bold text-[#4A5D23]">비밀번호 안내</p>
                  <ul className="text-xs text-[#6E7F4F] space-y-1">
                    <li>• 최소 8자 이상 입력해주세요</li>
                    <li>• 영문, 숫자, 특수문자 조합을 권장합니다</li>
                    <li>• 안전한 비밀번호로 계정을 보호하세요</li>
                  </ul>
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
                    계정 생성 중...
                  </div>
                ) : (
                  '계정 만들기'
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
      </div>
    </div>
  );
}
