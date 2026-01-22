# 🪙 Coin Master - 3D 동전 던지기

> 최첨단 3D 물리 엔진 기반의 온라인 동전 던지기 시뮬레이터

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-amber?style=for-the-badge)](https://coin-flip-web.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Coin Master Preview" width="800" />
</div>

## ✨ 주요 기능

- 🎯 **리얼리스틱 3D 동전** - Three.js 기반 실시간 3D 렌더링
- ⚡ **물리 엔진 시뮬레이션** - 실제 물리 법칙을 적용한 동전 회전
- ✏️ **커스텀 텍스트** - 앞면/뒷면 텍스트 자유롭게 설정
- 📊 **히스토리 기록** - 최근 동전 던지기 결과 자동 저장
- 🌐 **다국어 지원** - 7개 언어 자동 감지 및 선택 (한국어, 영어, 일본어, 중국어, 스페인어, 독일어, 프랑스어)
- 📱 **반응형 디자인** - 모바일, 태블릿, 데스크톱 완벽 지원
- 🎨 **Aurora 배경 효과** - 아름다운 오로라 애니메이션 배경

## 🛠️ 기술 스택

| 기술 | 용도 |
|------|------|
| **React 19** | UI 프레임워크 |
| **TypeScript** | 타입 안정성 |
| **Three.js** | 3D 그래픽 렌더링 |
| **React Three Fiber** | React에서 Three.js 사용 |
| **Tailwind CSS** | 스타일링 |
| **Vite** | 빌드 도구 |
| **Vercel** | 배포 |

## 🚀 로컬에서 실행하기

### 필수 요구사항
- Node.js 18 이상

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 📁 프로젝트 구조

```
coin-flip-web/
├── App.tsx              # 메인 앱 컴포넌트
├── index.html           # 진입점 HTML
├── index.tsx            # React 진입점
├── components/
│   └── Coin3D.tsx       # 3D 동전 컴포넌트
├── services/
│   ├── audioService.ts  # 효과음 서비스
│   └── i18n.ts          # 다국어 지원
├── blog/                # 블로그 콘텐츠
│   ├── index.html
│   ├── coin-flip-probability.html
│   ├── decision-making-tips.html
│   └── ...
├── about.html           # 서비스 소개
├── contact.html         # 문의하기
├── privacy.html         # 개인정보처리방침
└── terms.html           # 이용약관
```

## 🌍 지원 언어

| 언어 | 코드 |
|------|------|
| 🇰🇷 한국어 | `ko` |
| 🇺🇸 English | `en` |
| 🇯🇵 日本語 | `ja` |
| 🇨🇳 中文 | `zh` |
| 🇪🇸 Español | `es` |
| 🇩🇪 Deutsch | `de` |
| 🇫🇷 Français | `fr` |

## 📝 블로그 콘텐츠

- [동전 던지기 확률의 수학적 원리](/blog/coin-flip-probability.html)
- [결정장애 극복하는 5가지 방법](/blog/decision-making-tips.html)
- [동전 던지기의 역사](/blog/history-of-coin-flip.html)
- [랜덤 선택의 심리학](/blog/psychology-of-randomness.html)
- [역사를 바꾼 유명한 동전 던지기](/blog/famous-coin-flips.html)
- [동전 던지기 활용법 10가지](/blog/coin-flip-uses.html)

## 🔗 링크

- **🌐 라이브 데모:** [https://coin-flip-web.vercel.app](https://coin-flip-web.vercel.app)
- **📚 블로그:** [https://coin-flip-web.vercel.app/blog](https://coin-flip-web.vercel.app/blog)

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/bearslap223">bearslap223</a></p>
  <p>⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!</p>
</div>
