import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';

const REGIONS = [
  { id: 'elf',    name: '엘프의 숲',   emoji: '🌲', areas: [
    { name: '엘프 마을',  unlock: 1, active: true,  town: true },
    { name: '정령의 샘',  unlock: 2, active: true,  town: false },
    { name: '고대 유적',  unlock: 3, active: false, town: false },
  ]},
  { id: 'castle', name: '왕성',         emoji: '🏰', areas: [
    { name: '번화하는 왕성',     unlock: 1, active: false, town: false },
    { name: '외곽 뒷골목',       unlock: 2, active: false, town: false },
    { name: '지하 불법 투기장',  unlock: 3, active: false, town: false },
  ]},
  { id: 'dwarf',  name: '드워프 광산', emoji: '⛏', areas: [
    { name: '길드',               unlock: 1, active: false, town: false },
    { name: '용암이 끓는 지하 대협곡', unlock: 2, active: false, town: false },
    { name: '대금광',             unlock: 3, active: false, town: false },
  ]},
  { id: 'beast',  name: '수인 부락',   emoji: '🐾', areas: [
    { name: '열대 우림',          unlock: 1, active: false, town: false },
    { name: '대산맥',             unlock: 2, active: false, town: false },
    { name: '작열하는 대사막',    unlock: 3, active: false, town: false },
  ]},
  { id: 'demon',  name: '마족 영지',   emoji: '🌑', areas: [
    { name: '백은 설원',          unlock: 1, active: false, town: false },
    { name: '잿빛 경계지역',      unlock: 2, active: false, town: false },
    { name: '심연 회랑',          unlock: 3, active: false, town: false },
  ]},
];

const COMMON_AREAS = [
  { name: '태초의 숲', active: true, special: true },
  { name: '초기 사냥터', active: true },
  { name: '중기 사냥터', active: false },
  { name: '후기 사냥터', active: false },
];

// 삼각형 배치: 위 중앙 1개, 아래 좌·우 2개
const NODE_POSITIONS = [
  { top: '15%', left: '50%', transform: 'translate(-50%, 0)' },
  { top: '55%', left: '22%', transform: 'translate(-50%, 0)' },
  { top: '55%', left: '78%', transform: 'translate(-50%, 0)' },
];

export default function WorldMapScreen() {
  const { navigate } = useGame();
  const [regionIdx, setRegionIdx] = useState(0);

  const region = REGIONS[regionIdx];

  const handleNodeTap = (area) => {
    if (!area.active) return;
    if (area.town) {
      navigate('town');
    } else {
      navigate('exploration-action');
    }
  };

  const handleCommonTap = (area) => {
    if (!area.active) return;
    if (area.special) {
      navigate('town');
    } else {
      navigate('exploration-action');
    }
  };

  return (
    <>
      <Header showEnergy />
      <div className="relative flex items-center px-3 h-6 bg-slate-200 border-b border-slate-300 flex-shrink-0">
        <button onClick={() => navigate('main-hub')} className="text-[13px] text-slate-500 font-bold pr-3">‹</button>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-600">세계 지도</span>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* 대권역 지도 영역 */}
        <div className="flex-1 bg-slate-300 relative overflow-hidden">

          {/* 현재 대권역 배지 */}
          <div className="absolute top-2 right-2 z-10 bg-slate-700/80 text-white text-[7px] font-bold px-2 py-0.5 rounded-full">
            {region.emoji} {region.name}
          </div>

          {/* 좌측 화살표 */}
          {regionIdx > 0 && (
            <button
              onClick={() => setRegionIdx(i => i - 1)}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-slate-600/70 text-white rounded-full flex items-center justify-center text-[12px] font-bold"
            >
              ‹
            </button>
          )}

          {/* 우측 화살표 */}
          {regionIdx < REGIONS.length - 1 && (
            <button
              onClick={() => setRegionIdx(i => i + 1)}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-slate-600/70 text-white rounded-full flex items-center justify-center text-[12px] font-bold"
            >
              ›
            </button>
          )}

          {/* 지역 노드 삼각형 배치 */}
          {region.areas.map((area, i) => {
            const pos = NODE_POSITIONS[i];
            return (
              <button
                key={area.name}
                onClick={() => handleNodeTap(area)}
                className={`absolute flex flex-col items-center gap-0.5 ${!area.active ? 'opacity-50 cursor-default' : 'active:scale-95 transition-transform'}`}
                style={{ top: pos.top, left: pos.left, transform: pos.transform }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${area.active ? 'bg-slate-600' : 'bg-slate-400'}`}>
                  {area.active ? (area.unlock) : '🔒'}
                </div>
                <span className="text-[6px] text-slate-700 font-bold bg-slate-100/80 px-1 rounded whitespace-nowrap">
                  {area.name}
                </span>
              </button>
            );
          })}

          {/* 대권역 인디케이터 */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {REGIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => setRegionIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === regionIdx ? 'bg-slate-700' : 'bg-slate-400'}`}
              />
            ))}
          </div>
        </div>

        {/* 하단 공용 지역 바 */}
        <div className="bg-slate-200 border-t border-slate-300 flex items-center gap-1.5 px-2 py-1.5 flex-shrink-0">
          {COMMON_AREAS.map((area) => (
            <button
              key={area.name}
              onClick={() => handleCommonTap(area)}
              className={`flex-1 py-1 rounded text-[6px] font-bold text-center transition-colors ${
                area.active
                  ? area.special
                    ? 'bg-amber-400 text-slate-800'
                    : 'bg-slate-500 text-white'
                  : 'bg-slate-300 text-slate-400 opacity-60'
              }`}
            >
              {area.active ? area.name : `🔒 ${area.name}`}
            </button>
          ))}
        </div>
      </div>
      <Nav />
    </>
  );
}
