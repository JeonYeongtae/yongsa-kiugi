# 탐험 시스템 — UI/UX 구현 인수인계

## 개요

지도에서 지역을 클릭하면 탐험이 시작됩니다. 탐험은 세 단계로 구성됩니다.

```
WorldMapScreen (지역 클릭)
  │
  ├─ 첫 방문 지역 → ElfVillageIntroScreen (1회성 입장 이벤트)
  │                       │
  │                       └─ ExplorationActionScreen
  │
  └─ 재방문 지역 → ExplorationActionScreen (무엇을 할까?)
                          │
                          └─ ExplorationEventScreen (선택지별 이벤트)
```

---

## 화면별 구조

### 1. `WorldMapScreen.jsx`

**변경 내용**
- 지역 노드 클릭 시 `area.town` 분기 제거 → 모든 활성 지역이 탐험 흐름으로 진입
- `area.id` + `area.introEvent` 프로퍼티 추가로 첫 방문 이벤트 지원
- `GameContext`의 `hasVisitedArea` / `markAreaVisited` 연동

**현재 introEvent 설정 지역**

| area.id | area.introEvent | 지역명 |
|---|---|---|
| `elf-village` | `elf-village-intro` | 엘프 마을 |

**새 지역 추가 방법**

```javascript
// REGIONS 배열 내 해당 area 객체에 추가
{ name: '새 지역', unlock: 1, active: true, id: 'new-area', introEvent: 'new-area-intro' }
```

---

### 2. `ElfVillageIntroScreen.jsx` _(신규)_

**경로**: `#/exploration/elf-intro`

**역할**: 엘프 마을 첫 방문 시 1회만 재생되는 비주얼 노벨 이벤트

**구조**

```
Header (showEnergy)
타이틀 바: "아피카르 첫 입장" + ‹ 뒤로가기
스크롤 피드 (bg-stone-100)
  - 비트 순서대로 표시 (탭 진행)
  - image / scene 비트: 자동 출력
  - narration / dialogue 비트: 타이핑 애니메이션 후 탭 대기
  - 완료 후: "끝" 구분선 + "✦ 엘프 마을 입장" 버튼
우측 하단 플로팅 원형 버튼: Skip / ×2
Nav
```

**비트 타입**

| type | 설명 |
|---|---|
| `image` | 지역 CG 플레이스홀더, 자동 출력 |
| `scene` | 씬 전환 구분선, 자동 출력 |
| `narration` | 지문 텍스트, 타이핑 후 탭 대기 |
| `dialogue` | 대화 (speaker amber 표시), 타이핑 후 탭 대기 |
| `end` | 이벤트 종료 → `exploration-action` 이동 |

**스크립트 구성** (BEATS 배열, 파일 상단)

```
1막: 마을 경계 — 경비 엘프 조우, 정령 등장
2막: 마을 중심부 — 장로와 만남, 입장 허가
```

**완료 후 이동**: `exploration-action`

---

### 3. `ExplorationActionScreen.jsx`

**경로**: `#/exploration`

**역할**: 탐험 지역에서 "무엇을 할까?" 행동 선택

**레이아웃**

```
Header (showEnergy)
타이틀 바: 지역명 + ‹ 뒤로가기(world-map)
스크롤 피드 (bg-stone-100)
  - 지역 CG (16:9 비율)
  - 짧은 지역 설명 (2문장)
  - 구분선 + 활성 선택지 수
  - ✦ 선택지 텍스트 나열
Nav
```

**선택지 → 이벤트 매핑**

| type | 레이블 | 연결 이벤트 |
|---|---|---|
| `recruit` | 사람을 만날래 | `RECRUIT_EVENT` (파티원 만남) |
| `item` | 물건을 찾아볼래 | `ITEM_EVENT` (무기 획득) |
| `explore` | 그냥 돌아다닐래 | `RECRUIT2_EVENT` (동료 영입) |
| `boss` / `special` | 준비됐어 토벌 가자 / 특수 상황 | 미구현 (조건부 비활성) |

**조건 플래그** (파일 상단 상수, 추후 GameContext 연동)

```javascript
const HAS_PASS_ITEM = false;  // true: "사람을 만날래"에 ★ 프리패스 뱃지 표시
const BOSS_READY    = false;  // true: 토벌 버튼 활성화
const SPECIAL_EVENT = false;  // true: "특수 상황 발생"으로 레이블 변경
```

**선택 시 동작**

```javascript
setCurrentExplorationEvent(type); // GameContext에 이벤트 키 저장
navigate('exploration-event');
```

---

### 4. `ExplorationEventScreen.jsx` _(신규)_

**경로**: `#/exploration/event`

**역할**: 선택지에 따라 다른 스크립트를 실행하는 범용 VN 이벤트 엔진

**레이아웃**

```
Header (showEnergy)
타이틀 바: 이벤트 제목 + ‹ 뒤로가기(exploration-action)
스크롤 피드 (bg-stone-100)
  - DoneBlock: 완료된 비트 렌더링
  - TypingBlock: 현재 타이핑 중인 비트
  - ChoiceBlock: 선택지 대기 중 (✦ 버튼 나열)
  - 완료 후: "끝" 구분선 + "✦ 탐험으로 돌아가기"
우측 하단 플로팅 버튼: Skip / ×2
Nav
```

**비트 타입**

| type | 설명 |
|---|---|
| `image` | CG 플레이스홀더, 자동 출력 |
| `scene` | 씬 전환 구분선, 자동 출력 |
| `system` | 결과 표시 (`〈결과〉` + `+ 항목` 녹색), 자동 출력 |
| `narration` | 지문, 타이핑 후 탭 대기 |
| `dialogue` | 대화 (speaker amber 표시), 타이핑 후 탭 대기 |
| `choice` | 선택지 분기 — 선택 시 해당 `beats` 배열이 현재 위치에 삽입됨 |
| `end` | 이벤트 종료 → `exploration-action` 이동 |

**분기 처리 방식**

```
choice beat 도달 시:
  → 탭 잠금, ✦ 옵션 버튼 표시
  → 선택 시: option.beats를 현재 beatIdx 위치에 삽입 후 계속 진행
  → 중첩 choice (choice 안의 choice)도 동일하게 처리됨
```

**system beat 다중 항목**

```javascript
// label에 \n으로 구분하면 여러 줄로 표시
{ type: 'system', label: '골드 +10\n경험치 +1\n영아 합류' }
```

---

## 이벤트 스크립트 목록

`ExplorationEventScreen.jsx` 상단 `EXPLORATION_EVENTS` 객체에 모든 스크립트 포함

| 키 | 이벤트명 | 분기 구조 |
|---|---|---|
| `recruit` | 파티원 만남 (영아 첫 조우) | 1단계 choice: 인사 / 무기 이야기 |
| `item` | 무기 획득 | 2단계 choice: 건드려본다 → 무력 / 기도 |
| `explore` | 동료 영입 (영아) | 1단계 choice: 금화 / 결연한 의지 |

**새 이벤트 추가 방법**

```javascript
// 1. EXPLORATION_EVENTS에 키-스크립트 추가
const MY_EVENT = {
  title: '이벤트 제목',
  beats: [
    { type: 'image', label: 'CG 이름' },
    { type: 'narration', content: '지문 텍스트' },
    { type: 'dialogue', speaker: '캐릭터명', content: '"대사"' },
    { type: 'choice', options: [
      { label: '선택지 A', beats: [ ... ] },
      { label: '선택지 B', beats: [ ... ] },
    ]},
    { type: 'system', label: '결과 항목' },
    { type: 'end' },
  ],
};

export const EXPLORATION_EVENTS = {
  ...,
  myEvent: MY_EVENT,
};

// 2. ExplorationActionScreen의 choices 배열에 연결
{ type: 'myEvent', label: '새 선택지', active: true }
```

---

## GameContext 추가 상태

| 상태 | 타입 | 역할 |
|---|---|---|
| `visitedAreas` | `{ [areaId]: boolean }` | 지역 첫 방문 여부 추적 |
| `currentExplorationEvent` | `string` | 현재 재생할 이벤트 키 |

| 함수 | 역할 |
|---|---|
| `hasVisitedArea(areaId)` | 방문 여부 확인 |
| `markAreaVisited(areaId)` | 방문 처리 |
| `setCurrentExplorationEvent(key)` | 이벤트 설정 후 `exploration-event`로 이동 시 호출 |

---

## 라우트 목록

| 키 | 경로 | 화면 |
|---|---|---|
| `exploration-action` | `/exploration` | ExplorationActionScreen |
| `elf-village-intro` | `/exploration/elf-intro` | ElfVillageIntroScreen |
| `exploration-event` | `/exploration/event` | ExplorationEventScreen |

---

## 미구현 / 추후 연동 필요

- [ ] `HAS_PASS_ITEM` / `BOSS_READY` / `SPECIAL_EVENT` — GameContext 인벤토리/조건 연동
- [ ] `system` beat — 실제 GameContext 데이터 변경 (아이템 추가, 동료 합류 등)
- [ ] `visitedAreas` — localStorage 영속화 (현재 세션 리셋 시 초기화됨)
- [ ] 지역별 `AREA_NAME` / `AREA_DESC` — WorldMapScreen에서 클릭한 지역 정보를 GameContext로 전달
- [ ] `AREA_DESC` 및 이벤트 스크립트 — 현재 엘프 마을 하드코딩, 지역별 동적 분기 필요
- [ ] 판정 시스템 — `choice` 분기에 성공/실패 랜덤 롤 또는 스탯 조건 연동
- [ ] CG 이미지 — 현재 전부 플레이스홀더, 실제 이미지 에셋 교체 필요
