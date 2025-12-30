'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, AlertCircle, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function ExistingUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    institutionId: '',
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

    if (!formData.institutionId.trim()) {
      newErrors.institutionId = '기관 ID를 입력해주세요';
    }

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
      // TODO: API 호출로 기관 ID 검증 및 계정 생성
      console.log('Form submitted:', formData);

      // 임시: 성공 시 다음 단계로 이동
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // router.push('/dashboard');

    } catch (err) {
      setErrors(prev => ({ ...prev, institutionId: '유효하지 않은 기관 ID입니다' }));
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

  const isFormValid = formData.institutionId && formData.name && formData.email &&
                      formData.password && formData.confirmPassword &&
                      Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-[#F7F9F2] py-16 px-10">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-[#4A5D23] leading-tight">
            기존 기관 계정 만들기
          </h1>
          <p className="text-xl text-[#6E7F4F] font-medium italic">
            기관 ID와 개인 정보를 입력하여 계정을 생성하세요
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#E1EAD3]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Institution ID Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#4A5D23] flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                기관 ID <span className="text-[#8FA963]">*</span>
              </label>
              <input
                type="text"
                value={formData.institutionId}
                onChange={(e) => handleChange('institutionId', e.target.value)}
                placeholder="기관 고유 ID를 입력하세요"
                className={`w-full px-4 py-4 rounded-xl border-2 bg-[#F7F9F2] focus:outline-none focus:border-[#8FA963] transition-colors ${
                  errors.institutionId ? 'border-red-300' : 'border-[#E1EAD3]'
                }`}
                disabled={isLoading}
              />
              {errors.institutionId && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.institutionId}
                </div>
              )}
            </div>

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
                disabled={isLoading}
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
                  placeholder="최소 8자 이상"
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
                  disabled={isLoading}
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

            {/* Info Boxes */}
            <div className="space-y-4">
              {/* Institution ID Info */}
              <div className="bg-[#F7F9F2] p-5 rounded-2xl border border-[#E1EAD3]">
                <div className="flex items-start gap-3">
                  <span className="text-xl">ℹ️</span>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-[#4A5D23]">기관 ID란?</p>
                    <p className="text-xs text-[#6E7F4F] leading-relaxed">
                      기관 등록 시 발급된 고유 식별 번호입니다. 기관 관리자에게 문의하여 확인할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Info */}
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

        {/* Help Section */}
        <div className="bg-white p-6 rounded-2xl border border-[#E1EAD3] shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-bold text-[#4A5D23]">기관 ID를 모르시나요?</p>
              <p className="text-xs text-[#6E7F4F] leading-relaxed">
                기관 관리자 또는 시스템 담당자에게 문의하여 기관 ID를 확인하세요. 기관 ID는 계정 생성에 필수입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
