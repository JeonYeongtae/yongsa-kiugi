import { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SCREEN_PATHS = {
  'splash':           '/',
  'main-menu':        '/menu',
  'save-load':        '/save-load',
  'char-create':      '/create',
  'prologue':         '/prologue',
  'main-hub':         '/hub',
  'weekly-schedule':  '/schedule',
  'schedule-exec':    '/schedule/exec',
  'weekly-report':    '/report',
  'monthly-report':   '/report/monthly',
  'stats':            '/stats',
  'inventory':        '/inventory',
  'skills':           '/skills',
  'monthly-event':    '/event/monthly',
  'world-map':        '/map',
  'town':             '/town',
  'event-choice':     '/event/choice',
  'battle-main':      '/battle',
  'skill-submenu':    '/battle/skills',
  'target-select':    '/battle/target',
  'game-over':        '/game-over',
  'final-boss':       '/final-boss',
  'ending-branch':    '/ending/branch',
  'ending':           '/ending',
  'encyclopedia':     '/encyclopedia',
  'formation':        '/formation',
  'collection':       '/collection',
};

const PATH_TO_SCREEN = Object.fromEntries(
  Object.entries(SCREEN_PATHS).map(([k, v]) => [v, k])
);

const GameContext = createContext(null);

// 목 데이터 — URL 직접 접근 시 폴백
const MOCK_ALL_SLOTS = [
  [
    { name: '입립 기사단 훈련', tab: '교육',      grade: 0, mainStat: '물공', cost: [30,60,100] },
    { name: '광산 채굴',       tab: '아르바이트', grade: 0, mainStat: '물공', income: [40,80,135] },
    { name: '마법사 길드 강의', tab: '교육',      grade: 1, mainStat: '마공', cost: [30,60,100] },
  ],
  [
    { name: '기사단 방어/연수', tab: '교육',      grade: 0, mainStat: '물방', cost: [30,60,100] },
    { name: '마법 서적 정리',  tab: '아르바이트', grade: 0, mainStat: '마나', income: [25,55,95] },
    { name: '입립 기사단 훈련', tab: '교육',      grade: 1, mainStat: '물공', cost: [30,60,100] },
  ],
  [
    { name: '암습 사격/회피',  tab: '교육',      grade: 0, mainStat: '명중', cost: [30,60,100] },
    { name: '성벽 야간 경비',  tab: '아르바이트', grade: 1, mainStat: '물방', income: [30,65,115] },
    { name: '마법사 길드 강의', tab: '교육',      grade: 0, mainStat: '마공', cost: [30,60,100] },
  ],
  [
    { name: '화마법 전문 연구', tab: '교육',      grade: 1, mainStat: '더버화', cost: [30,60,100] },
    { name: '사냥터 가이드',   tab: '아르바이트', grade: 0, mainStat: '명중', income: [35,75,125] },
    { name: '기사단 방어/연수', tab: '교육',      grade: 2, mainStat: '물방', cost: [30,60,100] },
  ],
];

const MOCK_EXEC = {
  year: 1, month: 1, currentWeek: 1,
  allSlots: MOCK_ALL_SLOTS,
};

const INITIAL_WEAPON = {
  name: '강철 검', type: '근접', icon: '⚔', grade: 1,
  stat: '공격 +12', desc: '공격력 +12 · 근력 보정 +5%',
  compatSkills: ['강화 Lv.3', '회전 베기 Lv.2', '방어 막기 Lv.1'],
};

export function GameProvider({ children }) {
  const rrNavigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [scheduleMode, setScheduleMode] = useState('monthly'); // 'monthly' | 'weekly'
  const [scheduleExec, setScheduleExec] = useState(MOCK_EXEC);
  // weeklyResults[i] = 해당 주차 슬롯 결과 배열 (buildSlotResult 반환값 × 3)
  const [weeklyResults, setWeeklyResults] = useState([]);
  const [equippedWeapon, setEquippedWeapon] = useState(INITIAL_WEAPON);
  const [equippedSkills, setEquippedSkills] = useState(['강화 Lv.3', '회전 베기 Lv.2', '방어 막기 Lv.1']);

  const screen = PATH_TO_SCREEN[location.pathname] ?? 'splash';

  const navigate = (s) => {
    setModal(null);
    rrNavigate(SCREEN_PATHS[s] ?? '/');
  };
  const openModal = (m, data = null) => { setModal(m); setModalData(data); };
  const closeModal = () => { setModal(null); setModalData(null); };

  // WeeklyScheduleScreen: "한 달 시작" 시 호출 (월간 모드 — 4주 전체 세팅)
  const startScheduleExec = ({ year, month, allSlots }) => {
    setScheduleExec({ year, month, currentWeek: 1, allSlots });
    setWeeklyResults([]);
  };

  // WeeklyScheduleScreen: "이번 주 시작" 시 호출 (주간 모드 — 현재 주차 슬롯만 업데이트)
  const startWeekSchedule = ({ weekSlots }) => {
    setScheduleExec(prev => {
      const next = [...(prev.allSlots ?? Array.from({ length: 4 }, () => [null, null, null]))];
      next[prev.currentWeek - 1] = weekSlots;
      return { ...prev, allSlots: next };
    });
  };

  // ScheduleExecScreen: 마지막 슬롯 완료 후 호출
  const saveWeekResult = (results) => {
    setWeeklyResults(prev => [...prev, results]);
  };

  // WeeklyReportScreen: "다음 주 시작" 시 호출
  const nextWeek = () => {
    setScheduleExec(prev => ({ ...prev, currentWeek: prev.currentWeek + 1 }));
  };

  // 장비 교체: 장비군이 다르면 장착 스킬 전체 해제
  const equipWeapon = (weapon) => {
    if (equippedWeapon && equippedWeapon.type !== weapon.type) {
      setEquippedSkills([]);
    }
    setEquippedWeapon(weapon);
  };

  return (
    <GameContext.Provider value={{
      screen, modal, modalData, navigate, openModal, closeModal,
      scheduleMode, setScheduleMode,
      scheduleExec, weeklyResults,
      startScheduleExec, startWeekSchedule, saveWeekResult, nextWeek,
      equippedWeapon, equippedSkills, equipWeapon,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
