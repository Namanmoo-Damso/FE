'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react';

// 1. 저장할 키 정의 (userName 추가)
const STORAGE_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  institutionId: 'institutionId',
  userName: 'userName',
} as const;

const LOGIN_ROUTE = '/onboarding/institution/login';

interface AuthContextType {
  institutionId: string | null;
  userName: string | null; // ✅ 추가
  setAuthInfo: (
    accessToken: string,
    refreshToken: string,
    institutionId: string,
    userName: string, // ✅ 파라미터 추가
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [institutionId, setInstitutionId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // ✅ 이름 상태 추가

  const isClient = useCallback(() => typeof window !== 'undefined', []);

  // 2. 스토리지 초기화 로직
  const clearStoredAuth = useCallback(() => {
    if (!isClient()) return;
    // 요청하신 대로 모든 localStorage를 비우려면 clear()가 가장 확실합니다.
    localStorage.clear();
  }, [isClient]);

  // 3. 앱 로드 시 스토리지에서 정보 복구
  useEffect(() => {
    if (!isClient()) return;
    const storedId = localStorage.getItem(STORAGE_KEYS.institutionId);
    const storedName = localStorage.getItem(STORAGE_KEYS.userName);

    if (storedId) setInstitutionId(storedId);
    if (storedName) setUserName(storedName);
  }, [isClient]);

  // 4. 로그인 정보 저장 로직 (문법 오류 수정)
  const setAuthInfo = useCallback(
    (accessToken: string, refreshToken: string, id: string, name: string) => {
      if (!isClient()) return;

      localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
      localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
      localStorage.setItem(STORAGE_KEYS.institutionId, id);
      localStorage.setItem(STORAGE_KEYS.userName, name); // ✅ 이름 저장 완성

      setInstitutionId(id);
      setUserName(name); // ✅ 상태 업데이트
    },
    [isClient],
  );

  // 5. 로그아웃 로직
  const logout = useCallback(() => {
    clearStoredAuth();
    setInstitutionId(null);
    setUserName(null); // ✅ 상태 초기화
    if (isClient()) {
      window.location.href = LOGIN_ROUTE; // 로그인 페이지로 이동
    }
  }, [clearStoredAuth, isClient]);

  const value = useMemo(
    () => ({ institutionId, userName, setAuthInfo, logout }), // ✅ userName 포함
    [institutionId, userName, logout, setAuthInfo],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
