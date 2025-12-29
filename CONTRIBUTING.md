# CONTRIBUTING

요약
- 브랜치 정책: `dev` 기반 개발, PR → `main` 병합
- 커밋 규칙: `type(scope): subject` (Conventional Commits 권장)

로컬(Next.js)
```bash
cd /home/ubuntu/workspace/FE
npm ci
cp .env.example .env && edit .env
npm run dev
```

Pre-commit
```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files
```

PR 체크리스트
- [ ] pre-commit 통과
- [ ] 변경사항 및 테스트 방법 기재
