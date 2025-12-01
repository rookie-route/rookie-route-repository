# Rookie Route - Frontend

초보 개발자를 위한 AI 기반 코드 분석 및 피드백 시스템의 프론트엔드 애플리케이션입니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구 및 개발 서버
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **Monaco Editor** - VS Code 스타일 코드 에디터
- **React Markdown** - 마크다운 렌더링

## 주요 기능

- ✅ **코드 분석**: 10개 프로그래밍 언어 지원
- ✅ **Monaco Editor**: VS Code 스타일의 코드 에디터
- ✅ **다크 모드**: 라이트/다크 테마 전환
- ✅ **히스토리**: 분석 기록 저장 및 관리
- ✅ **코드 예제**: 언어별 샘플 코드 제공
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 지원

## 시작하기

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. 환경 변수 설정

\`.env.example\`을 복사하여 \`.env\` 파일을 생성하세요:

\`\`\`bash
cp .env.example .env
\`\`\`

필요에 따라 환경 변수를 수정하세요:

\`\`\`env
VITE_API_URL=http://localhost:8000
\`\`\`

### 3. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 http://localhost:5173 으로 접속하세요.

### 4. 프로덕션 빌드

\`\`\`bash
npm run build
\`\`\`

빌드된 파일은 \`dist/\` 폴더에 생성됩니다.

### 5. 프로덕션 미리보기

\`\`\`bash
npm run preview
\`\`\`

## 프로젝트 구조

\`\`\`
frontend/
├── public/              # 정적 파일
│   └── logo.png        # 로고 이미지
├── src/
│   ├── components/     # React 컴포넌트
│   │   ├── Header.jsx
│   │   ├── CodeEditor.jsx
│   │   ├── AnalysisResult.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── HistoryPanel.jsx
│   │   ├── DarkModeToggle.jsx
│   │   └── CodeExamples.jsx
│   ├── data/          # 데이터 파일
│   │   └── codeExamples.js
│   ├── App.jsx        # 메인 앱 컴포넌트
│   ├── index.jsx      # 진입점
│   └── index.css      # 전역 스타일
├── index.html         # HTML 템플릿
├── vite.config.js     # Vite 설정
├── tailwind.config.js # Tailwind CSS 설정
├── .env.example       # 환경 변수 예제
└── package.json       # 프로젝트 메타데이터
\`\`\`

## 설정 파일

### vite.config.js

Vite 빌드 도구 설정:
- 프록시 설정 (CORS 해결)
- 빌드 최적화
- 코드 분할 (code splitting)

### tailwind.config.js

Tailwind CSS 테마 설정:
- 다크 모드 활성화
- 커스텀 색상 팔레트
- 커스텀 애니메이션
- 폰트 설정

### .env

환경 변수 설정:
- \`VITE_API_URL\`: 백엔드 API URL
- \`VITE_MAX_HISTORY_ITEMS\`: 히스토리 최대 저장 개수

## 사용 가능한 스크립트

- \`npm run dev\`: 개발 서버 실행
- \`npm run build\`: 프로덕션 빌드
- \`npm run preview\`: 빌드된 앱 미리보기

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

MIT License

## 기여

기여는 언제나 환영합니다! Pull Request를 보내주세요.
