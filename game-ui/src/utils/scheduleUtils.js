export const GRADE_LABELS = ['초급', '중급', '상급'];

const STAT_GAIN_TABLE  = { PERFECT: [3, 5, 8], GOOD: [2, 4, 7], BAD: [1, 2, 4] };
const GOLD_BONUS_RATIO = { PERFECT: 0.2, GOOD: 0, BAD: -0.3 };

export function rollResult() {
  const r = Math.random();
  if (r < 0.25) return 'PERFECT';
  if (r < 0.70) return 'GOOD';
  return 'BAD';
}

// Returns a structured result object usable for both display and stat aggregation.
export function buildSlotResult(slot, grade) {
  if (!slot) {
    return {
      grade,
      slotName: null,
      lines: ['(빈 슬롯 — 자유 시간)', ''],
      statGain: null,
      goldDelta: 0,
    };
  }

  const gradeLabel = GRADE_LABELS[slot.grade] ?? '초급';
  const resultLine =
    grade === 'PERFECT' ? '완벽하게 해결했습니다!"'
    : grade === 'GOOD'  ? '성실하게 임했습니다."'
    :                     '아쉬운 결과를 냈습니다."';

  const lines = [
    `"HERO이(가) ${slot.name}(${gradeLabel})을 진행했습니다.`,
    resultLine,
  ];

  let statGain = null;
  let goldDelta = 0;

  if (slot.tab === '교육') {
    const amount = STAT_GAIN_TABLE[grade][slot.grade] ?? 2;
    statGain = { name: slot.mainStat, amount };
    goldDelta = -((slot.cost ?? [30, 60, 100])[slot.grade] ?? 30);
  } else if (slot.tab === '아르바이트') {
    const base = (slot.income ?? [40, 80, 135])[slot.grade] ?? 40;
    goldDelta = Math.max(0, Math.round(base * (1 + GOLD_BONUS_RATIO[grade])));
    statGain = { name: slot.mainStat, amount: 1 };
  }

  return { grade, slotName: slot.name, lines, statGain, goldDelta };
}

// Aggregate stat gains from an array of slot results (one week or all weeks).
export function aggregateStats(slotResults) {
  const map = {};
  slotResults.forEach(r => {
    if (r.statGain) {
      map[r.statGain.name] = (map[r.statGain.name] ?? 0) + r.statGain.amount;
    }
  });
  return map; // { '물공': 5, '마공': 3, ... }
}

export const RESULT_STYLE = {
  PERFECT: { label: '★ PERFECT!', color: 'text-amber-600' },
  GOOD:    { label: '▲ GOOD',     color: 'text-green-700' },
  BAD:     { label: '▼ BAD',      color: 'text-red-500'   },
};

export const BASE_STATS = [
  { name: '물공',    base: 60 },
  { name: '마공',    base: 40 },
  { name: '물방',    base: 50 },
  { name: '마방',    base: 45 },
  { name: '명중',    base: 55 },
  { name: '마나',    base: 70 },
  { name: '스태미나', base: 65 },
];
