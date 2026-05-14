import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';

// ── 목 캐릭터 데이터 ──────────────────────────────────────────
const CHAR = {
  name: 'HERO',
  archetype: '전략가',       // INTJ의 게임 내 호칭
  race: '인간',
  age: 14,
  birthday: '3월 15일',
  affinity: '마법소녀',
  personality: '진중함',
};

// ── 능력치 ────────────────────────────────────────────────────
const STATS = [
  { name: '물공',    val: 65, max: 100, color: 'bg-red-400'    },
  { name: '마공',    val: 43, max: 100, color: 'bg-violet-400' },
  { name: '물방',    val: 50, max: 100, color: 'bg-slate-500'  },
  { name: '마방',    val: 45, max: 100, color: 'bg-blue-400'   },
  { name: '명중',    val: 57, max: 100, color: 'bg-green-500'  },
  { name: '회피',    val: 38, max: 100, color: 'bg-teal-400'   },
  { name: '마나',    val: 71, max: 100, color: 'bg-indigo-400' },
  { name: '스태미나', val: 67, max: 100, color: 'bg-orange-400' },
];

// ── 특성 ─────────────────────────────────────────────────────
// 등급: 'common-pos' | 'rare-pos' | 'special-pos' | 'common-neg' | 'rare-neg' | 'cursed'
const TRAITS = [
  // INTJ 초기 특성
  {
    name: '치밀한 계산',
    grade: 'rare-pos',
    gradeLabel: '희귀',
    src: 'MBTI',
    effect: '교육 스케줄 최종 스탯 수치 +5%',
  },
  {
    name: '통찰',
    grade: 'rare-pos',
    gradeLabel: '희귀',
    src: 'MBTI',
    effect: '마법 명중률 +5%',
  },
  {
    name: '냉담',
    grade: 'common-neg',
    gradeLabel: '일반',
    src: 'MBTI',
    effect: '아군에게 받는 버프 -10%',
  },
  // 플레이 중 획득
  {
    name: '근육질',
    grade: 'rare-pos',
    gradeLabel: '희귀',
    src: '훈련',
    effect: '교육 완벽 결과 시 물공 추가 +1',
  },
  {
    name: '모범생',
    grade: 'common-pos',
    gradeLabel: '일반',
    src: '일과',
    effect: '교육 완벽 성공률 +5%',
  },
  {
    name: '사고뭉치',
    grade: 'common-neg',
    gradeLabel: '일반',
    src: '광산 사고',
    effect: '아르바이트 실패 확률 +10%',
  },
];

// ── 등급별 스타일 ─────────────────────────────────────────────
const GRADE_STYLE = {
  'special-pos': { bar: 'border-amber-400',  bg: 'bg-amber-50',  badge: 'bg-amber-200 text-amber-800',   dot: 'bg-amber-400'  },
  'rare-pos':    { bar: 'border-blue-400',   bg: 'bg-blue-50',   badge: 'bg-blue-200 text-blue-800',     dot: 'bg-blue-400'   },
  'common-pos':  { bar: 'border-slate-400',  bg: 'bg-slate-100', badge: 'bg-slate-300 text-slate-700',   dot: 'bg-slate-400'  },
  'common-neg':  { bar: 'border-rose-300',   bg: 'bg-rose-50',   badge: 'bg-rose-200 text-rose-700',     dot: 'bg-rose-400'   },
  'rare-neg':    { bar: 'border-rose-400',   bg: 'bg-rose-100',  badge: 'bg-rose-300 text-rose-800',     dot: 'bg-rose-500'   },
  'cursed':      { bar: 'border-purple-400', bg: 'bg-purple-50', badge: 'bg-purple-200 text-purple-800', dot: 'bg-purple-400' },
};

function StatBar({ name, val, max, color }) {
  const pct = Math.min((val / max) * 100, 100);
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="w-8 text-right text-[7px] text-slate-600 shrink-0">{name}</span>
      <div className="flex-1 h-2 bg-slate-200 rounded overflow-hidden">
        <div className={`h-full rounded ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[7px] font-bold text-slate-700 w-5 text-right shrink-0">{val}</span>
    </div>
  );
}

function TraitCard({ trait, onTap }) {
  const s = GRADE_STYLE[trait.grade] ?? GRADE_STYLE['common-pos'];
  const isNeg = trait.grade.includes('neg') || trait.grade === 'cursed';
  return (
    <button
      onClick={onTap}
      className={`w-full text-left rounded border-l-2 px-2 py-1.5 ${s.bar} ${s.bg}`}
    >
      <div className="flex items-center gap-1.5">
        <span className={`text-[6px] px-1 py-0.5 rounded font-bold ${s.badge}`}>{trait.gradeLabel}</span>
        <span className={`text-[8px] font-bold ${isNeg ? 'text-rose-700' : 'text-slate-800'}`}>{trait.name}</span>
        <span className="ml-auto text-[6px] text-slate-400 shrink-0">{trait.src}</span>
      </div>
      <div className={`text-[7px] mt-0.5 ${isNeg ? 'text-rose-600' : 'text-slate-600'}`}>
        {trait.effect}
      </div>
    </button>
  );
}

export default function StatsScreen() {
  const { openModal, navigate } = useGame();

  const positiveCount = TRAITS.filter(t => t.grade.includes('pos')).length;
  const negativeCount = TRAITS.length - positiveCount;

  return (
    <>
      <Header />
      <div className="relative flex items-center px-3 h-6 bg-slate-200 border-b border-slate-300 flex-shrink-0">
        <button onClick={() => navigate('main-hub')} className="text-[13px] text-slate-500 font-bold pr-3">‹</button>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-600">스탯</span>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col bg-slate-100">

        {/* ── 프로필 (컴팩트) ── */}
        <div className="bg-slate-200 border-b border-slate-300 flex items-center gap-2.5 px-3 py-2 shrink-0">
          <div className="w-9 h-11 bg-slate-400 rounded shrink-0 flex items-end justify-center pb-0.5">
            <span className="text-[6px] text-white">일러</span>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] font-bold text-slate-800">{CHAR.name}</span>
              <span className="text-[8px] font-bold text-amber-600">{CHAR.archetype}</span>
            </div>
            <div className="text-[7px] text-slate-600 leading-tight">
              {CHAR.race} · {CHAR.age}세 · {CHAR.birthday}
            </div>
            <div className="text-[7px] text-slate-500 leading-tight">
              인연: {CHAR.affinity} · 성격: {CHAR.personality}
            </div>
          </div>
        </div>

        {/* ── 능력치 바 차트 ── */}
        <div className="bg-slate-100 px-3 pt-3 pb-2 border-b border-slate-200 shrink-0">
          <div className="text-[10px] font-bold text-slate-600 mb-2">능력치</div>
          {STATS.map(s => <StatBar key={s.name} {...s} />)}
          {/* 색상 범례 */}
          <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1.5 justify-end">
            {STATS.map(s => (
              <span key={s.name} className="flex items-center gap-0.5 text-[6px] text-slate-500">
                <span className={`inline-block w-2 h-1.5 rounded-sm ${s.color}`} />{s.name}
              </span>
            ))}
          </div>
        </div>

        {/* ── 특성 ── */}
        <div className="bg-slate-300 px-3 pt-3 pb-3">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-700">보유 특성</span>
            <span className="text-[7px] text-slate-500">
              버프 {positiveCount} · 너프 {negativeCount}
            </span>
          </div>
          <div className="space-y-1">
            {TRAITS.map(t => (
              <TraitCard key={t.name} trait={t} onTap={() => openModal('mbti')} />
            ))}
          </div>
        </div>

      </div>
      <Nav />
    </>
  );
}
