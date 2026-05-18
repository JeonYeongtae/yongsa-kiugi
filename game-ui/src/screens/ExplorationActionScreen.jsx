import { useGame } from '../context/GameContext';
import Header from '../components/Header';
import Nav from '../components/Nav';

// 목 조건 — 추후 GameContext 연동
const HAS_PASS_ITEM = false;
const BOSS_READY    = false;
const SPECIAL_EVENT = false;

const AREA_NAME = '엘프 마을';
const AREA_DESC = '오랜 나무들 사이로 자리잡은 엘프 마을에 도착했다. 숲 특유의 고요함 속에서 엘프들이 저마다의 일상을 보내고 있다.';

export default function ExplorationActionScreen() {
  const { navigate, setCurrentExplorationEvent } = useGame();

  const handleAction = (type) => {
    setCurrentExplorationEvent(type);
    navigate('exploration-event');
  };

  const choices = [
    { type: 'recruit', label: '사람을 만날래',   active: true },
    { type: 'item',    label: '물건을 찾아볼래', active: true },
    { type: 'explore', label: '그냥 돌아다닐래', active: true },
    {
      type:   SPECIAL_EVENT ? 'special' : 'boss',
      label:  SPECIAL_EVENT ? '특수 상황 발생' : '준비됐어, 토벌 가자',
      active: BOSS_READY || SPECIAL_EVENT,
      locked: true,
    },
  ];

  const activeCount = choices.filter(c => c.active).length;

  return (
    <>
      <Header showEnergy />
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* 타이틀 바 */}
        <div className="relative flex items-center px-3 h-6 bg-slate-200 border-b border-slate-300 flex-shrink-0">
          <button
            onClick={() => navigate('world-map')}
            className="text-[13px] text-slate-500 font-bold pr-3"
          >‹</button>
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-600">
            {AREA_NAME}
          </span>
        </div>

        {/* 스크롤 피드 */}
        <div className="flex-1 overflow-y-auto bg-stone-100 px-4 pt-4 pb-6">

          {/* 지역 CG */}
          <div
            className="w-full bg-slate-300 rounded mb-4 flex items-center justify-center"
            style={{ aspectRatio: '16 / 9' }}
          >
            <span className="text-[8px] text-slate-500">AREA ART</span>
          </div>

          {/* 내러티브 */}
          <p className="text-[8.5px] text-stone-700 leading-[1.7] mb-5">
            {AREA_DESC}
          </p>

          {/* 구분선 + 선택지 수 */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-stone-300" />
            <span className="text-[7px] text-stone-400 tracking-widest">{activeCount}</span>
            <div className="flex-1 h-px bg-stone-300" />
          </div>

          {/* 선택지 텍스트 나열 */}
          <div className="flex flex-col">
            {choices.map((c) =>
              c.active ? (
                <button
                  key={c.type}
                  onClick={() => handleAction(c.type)}
                  className="text-left py-1.5 text-[9px] text-stone-700 font-medium active:text-amber-700 transition-colors"
                >
                  <span className="mr-2 text-stone-400">✦</span>{c.label}
                  {c.type === 'recruit' && HAS_PASS_ITEM && (
                    <span className="ml-2 text-[6px] text-amber-600 font-bold">★ 프리패스</span>
                  )}
                </button>
              ) : c.locked ? (
                <div key={c.type} className="py-1.5 text-[9px] text-stone-400">
                  <span className="mr-2 text-stone-300">✦</span>{c.label}
                  <span className="ml-2 text-[6px]">(조건 미충족)</span>
                </div>
              ) : null
            )}
          </div>
        </div>

      </div>
      <Nav />
    </>
  );
}
