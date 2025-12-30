const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

const STORAGE_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  institutionId: 'institutionId',
} as const;

const isClient = () => typeof window !== 'undefined';

const buildUrl = (endpoint: string) => {
  if (endpoint.startsWith('http')) return endpoint;
  const normalized = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalized}`;
};

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const accessToken = isClient()
    ? localStorage.getItem(STORAGE_KEYS.accessToken)
    : null;
  const institutionId = isClient()
    ? localStorage.getItem(STORAGE_KEYS.institutionId)
    : null;

  const headers = new Headers(options.headers ?? {});

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  if (institutionId) {
    headers.set('X-Institution-Id', institutionId);
  }

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(buildUrl(endpoint), {
    ...options,
    headers,
  });

  if (response.status === 401 && isClient()) {
    console.error('인증이 만료되었습니다. 다시 로그인해주세요.');
  }

  return response;
}
