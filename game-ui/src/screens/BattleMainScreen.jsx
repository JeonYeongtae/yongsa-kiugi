import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';

const TURN_ORDER = ['적1', '영웅', '적2', '영웅', '아딘', '적1', '영웅'];

const ALLY_UNITS = [
  { name: 'HERO', hp: 80, maxHp: 100, mp: 60, maxMp: 100 },
  { name: '아딘', hp: 90, maxHp: 100, mp: 40, maxMp: 80  },
  { name: '오시안', hp: 70, maxHp: 100, mp: 55, maxMp: 70 },
  { name: null, hp: 0, maxHp: 100, mp: 0, maxMp: 100 },
];

const ENEMY_UNITS = [
  { name: '고블린1', hp: 60, maxHp: 100, mp: 20, maxMp: 50 },
  { name: '고블린2', hp: 40, maxHp: 80,  mp: 15, maxMp: 50 },
  { name: '오크',    hp: 90, maxHp: 120, mp: 30, maxMp: 60 },
  { name: null, hp: 0, maxHp: 100, mp: 0, maxMp: 100 },
];

const BATTLE_LOG = [
  '영웅의 공격! 고블린1에게 24 데미지.',
  '고블린1의 반격! 영웅에게 8 데미지.',
  '아딘의 턴...',
];

function TurnCard({ label, isCurrent, idx }) {
  const isAlly = label === '영웅' || label === '아딘' || label === '오시안';
  return (
    <div
      className={`flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-[5px] font-bold text-white
        ${isAlly ? 'bg-slate-500' : 'bg-rose-700'}
        ${isCurrent ? 'ring-2 ring-amber-400 scale-110' : ''}`}
    >
      {label.slice(0, 2)}
    </div>
  );
}

function UnitCard({ unit, isAlly }) {
  if (!unit.name) {
    return (
      <div className={`rounded flex-1 ${isAlly ? 'bg-slate-400/30' : 'bg-slate-600/30'} border border-dashed border-slate-500/40`} />
    );
  }
  const hpPct = Math.max(0, (unit.hp / unit.maxHp) * 100);
  const mpPct = Math.max(0, (unit.mp / unit.maxMp) * 100);
  return (
    <div className={`rounded flex-1 relative overflow-hidden ${isAlly ? 'bg-slate-500' : 'bg-slate-700'} flex flex-col`}>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-[5px] text-slate-300 font-bold leading-none">{unit.name}</span>
      </div>
      {/* HP 바 (하단 내부) */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800/60">
        <div className="h-full bg-red-500 transition-all" style={{ width: `${hpPct}%` }} />
      </div>
      {/* MP 바 (HP 위) */}
      <div className="absolute bottom-1.5 left-0 right-0 h-1 bg-slate-800/40">
        <div className="h-full bg-blue-400 transition-all" style={{ width: `${mpPct}%` }} />
      </div>
    </div>
  );
}

export default function BattleMainScreen() {
  const { navigate, openModal } = useGame();

  return (
    <>
      {/* 턴카드 바 */}
      <div className="bg-slate-700 flex items-center gap-1.5 px-2 overflow-x-auto flex-shrink-0" style={{ height: '10%' }}>
        {TURN_ORDER.map((label, i) => (
          <TurnCard key={i} label={label} isCurrent={i === 0} idx={i} />
        ))}
      </div>

      {/* 전투 영역 */}
      <div className="bg-slate-300 flex items-stretch px-2 gap-1 flex-shrink-0" style={{ height: '34%' }}>
        {/* 아군 2×2 */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 py-2">
          {ALLY_UNITS.map((u, i) => (
            <UnitCard key={i} unit={u} isAlly />
          ))}
        </div>

        {/* 중앙 VS */}
        <div className="flex items-center justify-center flex-shrink-0 w-6">
          <span className="text-slate-600 text-[10px] font-bold">⚔</span>
        </div>

        {/* 적군 2×2 */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 py-2">
          {ENEMY_UNITS.map((u, i) => (
            <UnitCard key={i} unit={u} isAlly={false} />
          ))}
        </div>
      </div>

      {/* 전투 로그 (그라데이션) */}
      <div
        className="flex-shrink-0 flex flex-col justify-end px-3 pb-1"
        style={{
          height: '18%',
          background: 'linear-gradient(to top, rgba(241,245,249,0.95) 60%, rgba(241,245,249,0.5) 85%, transparent 100%)',
        }}
      >
        {BATTLE_LOG.map((line, i) => (
          <div key={i} className="text-[7px] text-slate-600 leading-relaxed font-mono">
            ▸ {line}
          </div>
        ))}
      </div>

      {/* 액션 버튼 2×2 */}
      <div className="flex-1 bg-slate-200 px-3 pb-2 pt-1 grid grid-cols-2 gap-1.5">
        <button
          onClick={() => navigate('target-select')}
          className="py-1 bg-slate-400 rounded text-[8px] flex flex-col items-center justify-center leading-tight active:scale-95 transition-transform"
        >
          <span>⚔ 공격</span>
          <span className="text-[6px] text-slate-600 mt-0.5">근접 · 행동력 1</span>
        </button>
        <button
          onClick={() => navigate('skill-submenu')}
          className="py-1 bg-slate-400 rounded text-[8px] flex flex-col items-center justify-center leading-tight active:scale-95 transition-transform"
        >
          <span>✦ 스킬</span>
          <span className="text-[6px] text-slate-600 mt-0.5">MP 소모</span>
        </button>
        <button
          onClick={() => openModal('item')}
          className="py-1.5 bg-slate-400 rounded text-[8px] active:scale-95 transition-transform"
        >
          아이템
        </button>
        <button className="py-1.5 bg-slate-400 rounded text-[8px] active:scale-95 transition-transform">
          🛡 방어
        </button>
      </div>

      <Nav dimmed />
    </>
  );
}
