# 용사키우기 — UI 디자인 기준서

## 프로젝트 개요

- **경로**: `game-ui/` (Vite + React + Tailwind CSS v3)
- **라우팅**: React Router v7, `GameContext`의 `navigate()` 사용
- **디바이스 프레임**: 데스크톱 `50vh × 100vh` 폰 목업 / 모바일 2× scale 전체화면
- **아이콘**: 라이브러리 없음 — unicode 문자만 사용 (lucide 등 미설치)
- **게임 내 화면 구조**: `<Header />` → content → `<Nav />` (MainHubScreen 이후 모든 화면)
- **pre-game 화면** (SaveLoad, CharCreate, Prologue): Header/Nav 없이 자체 타이틀 바 구현

---

## 1. 비주얼 스타일 — 와이어프레임 유지

**색상, 폰트 크기, 카드 형태는 바꾸지 않는다.**

| 항목 | 기준 |
|---|---|
| 배경색 | `bg-slate-100` ~ `bg-slate-700` |
| 강조색 | amber 계열 |
| 폰트 크기 | `text-[7px]` ~ `text-[10px]` |
| 카드 | `bg-slate-300` 라운드 박스 |

바꾸는 것은 **인터랙션 패턴과 UI 배치 방식**이다.

---

## 2. 핵심 금지 패턴

### ❌ 웹페이지식 하단 버튼 바

```jsx
// ❌ 절대 하지 말 것 — 버튼 3~4개 가로 나열
<div className="bg-slate-300 flex items-center justify-around py-2">
  <button>장착</button>
  <button>사용</button>
  <button>버리기</button>
</div>
```

### ❌ 모달 하단 "계속보기 / 닫기" 버튼

```jsx
// ❌ 하지 말 것
<div className="flex justify-around mt-3">
  <button onClick={onClose}>계속 보기</button>
  <button>확인</button>
</div>
```

---

## 3. 올바른 패턴

### 버튼 역할별 위치

| 역할 | 위치 |
|---|---|
| 뒤로가기 | 타이틀 바 좌측 `‹` 화살표 |
| 삭제 / 보조 액션 | 해당 카드 우측 인라인 `✕` 아이콘 |
| 선택 / 불러오기 | 카드 자체를 탭 → 즉시 실행 |
| 주요 CTA 1개 | 콘텐츠 영역 최하단 full-width 단독 버튼 |
| 탭 / 필터 전환 | 상단 탭 바 |
| 정보 보기 | 카드 탭 → 모달 직접 오픈 (별도 "정보" 버튼 없음) |

### 모달 닫기

- 모달 좌측 상단 `✕` 버튼으로 닫기
- "계속보기" / "닫기" 텍스트 버튼 사용 금지

```jsx
// ✅ 올바른 모달 구조
<div className="bg-slate-100 rounded p-3 relative">
  <button onClick={onClose} className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>
  {/* 내용 */}
  <div className="mt-3 flex justify-center">
    <button>주요 액션 ▸</button>  {/* CTA 1개만 */}
  </div>
</div>
```

### 내러티브 화면 (비주얼 노벨 / 스토리)

- **스크롤 피드 방식**: 탭할 때마다 새 블록이 아래에 추가됨
- 위로 스크롤해서 이전 내용 재열람 가능
- `chapter-header` / `image` 블록은 자동 연속 출력, `text` 블록만 탭에서 멈춤
- `▼ 탭하여 계속` 힌트는 스크롤 영역 밖 하단 고정 위치
- **스피커 레이블 없음**: "▸ 나레이터" 같은 화자 표시 제거
- 하단 컨트롤 바: Skip · 진행도 · 메뉴 (Log 버튼 없음)

---

## 4. 높이 통일 기준

| 요소 | 데스크톱 | 모바일 CSS 클래스 |
|---|---|---|
| `Header` | `style={{ height: '20%' }}` | `.header-bar` → `40px` |
| `Nav` | `style={{ height: '20%' }}` | `.nav-bar` → `40px` |
| 화면 내 타이틀 바 | `py-2` 패딩 기반 | — |

---

## 5. 화면별 완료 현황

### ✅ 완료

#### `Nav` (`components/Nav.jsx`)
- 와이어프레임 원본 스타일 유지: `bg-slate-600`, 활성 탭 `yellow-400` 정사각형 + 텍스트
- 높이 `20%` 통일만 적용, 비주얼은 변경 없음

#### `Header` (`components/Header.jsx`)
- 높이 `24%` → `20%` 통일

#### `SaveLoadScreen`
- 타이틀 바 좌측 `‹` → main-menu
- 슬롯 카드 탭 → 로드
- 카드 우측 `✕` → 삭제
- 하단 버튼 바 제거

#### `CharCreateScreen`
- 타이틀 바 좌측 `‹` → save-load
- `시작하기` → 콘텐츠 최하단 full-width 단독 버튼
- 하단 버튼 바 제거

#### `PrologueScreen`
- 스크롤 피드 방식으로 전면 재구성
- 탭 → 새 텍스트/이미지 블록이 아래에 추가
- 챕터 전환 시 chapter-header + image 자동 출력
- 챕터 끝에서 선택 모달 등장: 성별 → 호칭 → 스탯/성격/특성
- 스피커 레이블("▸ 나레이터") 없음
- `▼ 탭하여 계속` 스크롤 영역 밖 고정
- Log 버튼 없음

#### `SkipModal`
- 좌측 상단 `✕`로 닫기
- `건너뛰기 ▸` 단독 CTA

#### `WeeklyScheduleScreen` + `SchedulePickModal`
- 달력 그리드 방식 폐기 → 4주차 카드(2×2) × 슬롯 3개 세로 배치로 전면 재구성
- 타이틀 바: 좌측 `‹` 뒤로가기(→ main-hub) · 중앙 제목 absolute 정렬 · 우측 배치 카운터
- 빈 슬롯(`+`) 탭 → `SchedulePickModal` 오픈, 배치된 슬롯 우측 `✕`로 제거
- 하단 `한 달 시작 ▸` full-width 단독 CTA (하단 버튼 바 제거)
- `SchedulePickModal`: 교육/아르바이트 탭, 초급/중급/상급 등급 선택, 미리보기 영역 항상 표시
- "한 달 시작" 클릭 시 `GameContext.startScheduleExec({ year, month, week, slots })` 호출 후 이동

#### `ScheduleExecScreen`
- 상단: `N년 M월 K주차 진행 중` 텍스트 표시
- 상단 탭 바: 슬롯 3개를 활동명으로 표시 (결과 등급은 탭에 표시 안 함)
- 순차 진행: 슬롯 1→2→3 순서로 CTA 버튼으로 이동
  - 슬롯 1·2: `다음 활동으로 ▸` (탭 전환)
  - 슬롯 3: `다음 주차로 ▸` (→ weekly-report)
- 결과(PERFECT/GOOD/BAD)는 콘텐츠 내에서만 표시
- 결과 롤은 `useMemo`로 마운트 1회 고정 (탭 전환 시 유지)
- `GameContext.scheduleExec`에서 year/month/week/slots 읽음

#### `WeeklyReportScreen`
- 상단 타이틀 바: `N년 M월 K주차 주간 보고` (GameContext.scheduleExec 읽음)
- 전체를 단일 스크롤 영역으로 구성, 하단 독립 버튼 바 없음
- **스탯 변화 그래프**: 스탯마다 `bg-slate-500` 기존 수치 + `bg-amber-400` 증가분 이어붙인 bar
  - 우측에 기존 수치 숫자 + `+N` 증가분 별도 표기
  - 범례(기존 / 이번 주 증가) 우측 하단
- **이벤트 로그**: 카드형 행 (`bg-slate-200 rounded`), 아이콘 심볼(`✦` `!` `★`) + 텍스트
- **HERO의 성장 일지**: 육아 일지 톤의 서술형 텍스트 (이번 주를 돌아보는 코멘트)
  - `border-l-2 border-amber-400` 카드, 하단에 "가장 성장한 능력" 한 줄 자동 코멘트
- `다음 주 시작 ▸` / `1달 종합 보고 ▸` — currentWeek에 따라 CTA 분기
  - 주차 < 4: `nextWeek()` + navigate('schedule-exec')
  - 주차 === 4: navigate('monthly-report')

#### `MonthlyReportScreen`
- 상단 타이틀 바: `N년 M월 — 1달 종합 보고`
- **이달의 성과 카드**: PERFECT·GOOD·BAD·총 활동 수 4칸 수평 집계
- **한 달 스탯 변화 그래프**: 4주 전체 delta 합산, StatBar 동일 컴포넌트
- **주차별 활동 로그**: 주차별 섹션 (`bg-slate-300` 헤더), 슬롯명 + 결과 등급 한 줄씩
- **HERO의 한 달 성장 일지**: 한 달 회고 서술 + "이달 가장 성장한 능력" 코멘트
- `다음 달로 ▸` full-width CTA → main-hub

#### `GameContext` 공유 스케줄 상태
- `scheduleExec: { year, month, currentWeek, allSlots[4][3] }` — 실행 화면 간 공유
- `weeklyResults`: 주차별 완료 결과 배열 (buildSlotResult 반환값 × 3) × 4주
- `startScheduleExec({ year, month, allSlots })` — WeeklyScheduleScreen "한 달 시작" 시 호출, weeklyResults 초기화
- `saveWeekResult(results)` — ScheduleExecScreen 마지막 슬롯 완료 시 호출
- `nextWeek()` — WeeklyReportScreen CTA 시 currentWeek +1
- 기본값(목 데이터 4주)으로 직접 URL 접근 시에도 동작
- 공유 유틸: `src/utils/scheduleUtils.js` — rollResult, buildSlotResult, aggregateStats, BASE_STATS

#### 게임 흐름
- `save-load` → `prologue` 직행 (CharCreateScreen 우회)
- 캐릭터 생성 정보(성별, 호칭, 스탯, 성격, 특성)를 프롤로그 내에서 수집

#### `StatsScreen`
- **프로필 영역**: 아바타 + 이름/직함/종족·나이·인연·성격을 3줄 컴팩트 카드 (`py-2`) — 하단 버튼 바 없음
  - MBTI 직접 표기 대신 게임 내 호칭 표시 (예: INTJ → `전략가`)
- **능력치 영역**: 스와이프 제거 → 8개 전체 스탯(`물공/마공/물방/마방/명중/회피/마나/스태미나`) 바 차트로 전체 표시
  - 스탯별 색상 분리 + 우측 숫자, 하단 색상 범례
- **특성 영역**: 보유 특성 카드형 리스트
  - 등급별 왼쪽 테두리 색상: 특수(amber) / 희귀(blue) / 일반+(slate) / 일반-(rose) / 저주(purple)
  - 각 카드: 등급 배지 + 특성명 + 출처 태그 + 효과 설명
  - 탭 시 상세 모달 오픈 (`openModal('mbti')`)
  - 긍정/부정 카운터 상단 표기
- 특성 데이터 기준: 첨부된 특성 문서 기반 (MBTI 초기 특성 + 플레이 중 획득 특성 혼합)

---

### 🔲 미완료

#### `InventoryScreen`
```jsx
// ❌ 현재 하단 바
<div className="bg-slate-300 flex items-center justify-around py-2">
  <button>장착</button><button>사용</button><button>버리기</button>
</div>
```
→ 아이템 탭 시 카드 내부에 inline 액션 등장  
→ `버리기`: 카드 우측 상단 `✕` 아이콘  
→ 미선택 시 액션 버튼 숨김

#### `SkillsScreen`
```jsx
// ❌ 현재 하단 바
<div className="bg-slate-300 flex items-center justify-around py-2">
  <button>편성 변경</button><button>정보</button>
</div>
```
→ 스킬 카드 탭 → `openModal('skill-detail')` 직접 오픈  
→ `편성 변경`: 헤더 우측 아이콘 버튼

#### 기타 (`TownScreen`, `EventChoiceScreen` 등)
- 하단 버튼 나열 패턴 발견 시 위 원칙 동일 적용

---

## 6. 스케줄 & 탐험 시스템 설계

### 핵심 구분: 두 가지 행동 방식

| 구분 | 소모 자원 | 특성 |
|---|---|---|
| **스케줄** | 시간 (주 단위) | 배분 후 자동 진행, 확정적 보상 |
| **탐험** | 행동력(AP) | 즉시 소모, 선택형 이벤트 |

스케줄과 탐험은 **완전히 독립된 시스템**이다. 탐험에서 행동력을 다 써도 스케줄 슬롯은 유지되고, 반대도 동일.

---

### 스케줄 시스템

#### 구조
- **1달 = 4주차**, 주차마다 스케줄 슬롯 3개
- 각 슬롯에 일정 하나를 배치 → 달 시작 시 자동 실행
- 슬롯 미배치 상태로 달을 시작할 수 있음 (빈 슬롯 = 해당 주 자유 시간)

#### 일정 종류

**교육 (시간 소모, 금화 지출)**

| 분야 | 주력 스탯 | 보조 스탯 | 등급 비용(초/중/상) |
|---|---|---|---|
| 입립 기사단 훈련 | 물공 +2/+4/+7 | 스태미나 +1/+2/+3 | 30/60/100 |
| 마법사 길드 강의 | 마공 +2/+4/+7 | 마나 +1/+2/+3 | 30/60/100 |
| 도성비 찬사/성가 | 화마/번화 +2/+4/+7 | 마나 +1/+2/+3 | 30/60/100 |
| 암습 사격/회피 | 명중/회피 +2/+4/+7 | 스태미나 +1/+2/+3 | 30/60/100 |
| 기사단 방어/연수 | 물방/마방 +2/+4/+7 | 스태미나 +1/+2/+3 | 30/60/100 |
| 화마법 전문 연구 | 더버화 +2/+4/+7 | 마공 +1/+2/+3 | 30/60/100 |

교육 결과는 성공률에 따라 **실패/보통/완벽** 3단계로 분기:
- 실패: 최소 스탯 보장 (비용 대비 손해)
- 보통: 기준 수치 지급
- 완벽: 주력+1, 보조+1 추가

**아르바이트 (시간 소모, 금화 획득 + 스탯 변동)**

| 아르바이트 | 수입(초/중/상) | 상승 스탯 | 하락 스탯 | 사고 확률 |
|---|---|---|---|---|
| 광산 채굴 | 40/80/135G | 물공 | 마공 | 5/10/15% |
| 성벽 야간 경비 | 30/65/115G | 물방 | 명중 | 3/7/12% |
| 마법 서적 정리 | 25/55/95G | 마나 | 물공 | 1/3/5% |
| 사냥터 가이드 | 35/75/125G | 명중 | 화마 | 4/8/14% |
| 공돌머지 관리 | 45/90/145G | 더버화 | 번화 | 6/12/18% |
| 중소 시장 업무 | 35/75/130G | 이(주) | 스태미나 | 3/7/12% |

아르바이트는 스탯 페널티가 있으므로 교육과 조합 전략이 필요.

#### 등급(Grade) 상승 조건

| 현재 등급 | 상급 해금 조건 |
|---|---|
| 초급 | 기본 해금 |
| 중급 | 해당 초급 스케줄 20회 이상 **또는** 적합 점수 60 이상 |
| 상급 | 해당 중급 스케줄 25회 이상 **또는** 적합 점수 100 이상 |

반복 노가다 방지 위해 **횟수 OR 점수** 둘 중 하나 충족 시 해금.

---

### 스케줄 UI 구조 (WeeklyScheduleScreen — 구현 완료)

#### 레이아웃

```
┌─────────────────────────────────────┐
│  ‹  월간 스케줄 배분       N/12 배치됨 │  ← 타이틀 바
│─────────────────────────────────────│
│  1주차        2주차                  │
│  ┌───────┐   ┌───────┐              │
│  │ 슬롯1 │   │ 슬롯1 │              │
│  ├───────┤   ├───────┤              │
│  │ 슬롯2 │   │  +  │               │
│  ├───────┤   ├───────┤              │
│  │  +  │   │  +  │               │
│  └───────┘   └───────┘              │
│  3주차        4주차                  │
│  ...          ...                   │
│─────────────────────────────────────│
│          한 달 시작 ▸               │  ← full-width CTA
└─────────────────────────────────────┘
```

- 4주차 카드 2×2 그리드, 각 카드 내 슬롯 3개 세로 배치
- 배치된 슬롯: 일정명 + 등급 배지(초급/중급/상급) + 주력 스탯 + 비용/수입, 우측 `✕` 제거
- 빈 슬롯(`+`) 탭 → `SchedulePickModal` 오픈

#### SchedulePickModal (`modals/SchedulePickModal.jsx`)

- 교육 / 아르바이트 탭 전환 (탭 전환 시 선택 초기화)
- 초급/중급/상급 등급 선택 → 비용·수입·스탯 수치 실시간 갱신
- 미리보기 영역: 항상 표시, 미선택 시 흐린 안내 문구 / 선택 시 상세 정보 (높이 고정)
- `배치 ▸`: 선택된 일정을 슬롯에 반영 후 모달 닫힘
- 이미 배치된 슬롯 탭 → 동일 모달 재오픈 (교체 가능, 미구현)

#### 달 시작 흐름

```
WeeklyScheduleScreen (4주차 슬롯 배분)
  → "한 달 시작 ▸" 버튼 (full-width CTA)
  → ScheduleExecScreen (주차별 결과 순서대로 표시)
  → WeeklyReportScreen (스탯 변화 + 이벤트 로그)
  → (4주차 완료 시) MonthlyEventScreen 또는 다음 달 배분
```

---

### 탐험 시스템 (미구현 — 설계 중)

#### 핵심 원리
- **행동력(AP)** 을 소모해 즉시 이벤트 발생
- 스케줄 시간과 완전 독립 — 탐험해도 월간 스케줄 진행 속도 영향 없음
- 지역(WorldMapScreen)에서 탐험 지점 선택 → 탐험 화면 진입

#### 탐험에서 가능한 행동 (예정)
- 지역 탐색: AP 1~3 소모, 아이템/이벤트 발견
- 전투 돌입: AP 소모 + 전투 화면으로 전환
- NPC 대화: AP 0 (무료) 또는 호감도 조건

#### 행동력 회복
- 스케줄 슬롯 미배치 주간(자유 시간)마다 일부 회복
- 특정 아이템/이벤트로 즉시 회복 가능

---

## 7. 기술 메모

- **중첩 버튼 방지**: 카드 내부 삭제 버튼은 `e.stopPropagation()` 필수
- **스크롤 피드 자동 스크롤**: `useEffect`로 `revealedBlocks.length` 변화 감지 → `scrollRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' })`
- **processFrom 패턴**: 비트 배열을 순회하며 `text`에서 멈추고 `choice`에서 모달 오픈, `chapter-header`/`image`는 자동 연속 (`PrologueScreen` 참조)
- **랜덤 특성 롤**: `useState(() => pickRandom(...))` 초기화 함수로 마운트 1회만 실행
- **타이틀 바 중앙 정렬**: 좌우 요소 너비가 다를 때 `absolute inset-0 flex items-center justify-center pointer-events-none`으로 제목을 부모 기준 정중앙 고정
- **스케줄 슬롯 상태**: `slots[4][3]` 2차원 배열, 불변 갱신 시 `prev.map(w => [...w])` 후 인덱스 직접 수정
