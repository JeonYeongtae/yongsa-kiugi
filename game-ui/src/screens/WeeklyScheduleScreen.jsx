import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
import SchedulePickModal from '../modals/SchedulePickModal';

const WEEKS = ['1주차', '2주차', '3주차', '4주차'];
const SLOT_COUNT = 3;

const GRADE_COLORS = {
  '초급': 'bg-slate-200 text-slate-600',
  '중급': 'bg-blue-100 text-blue-700',
  '상급': 'bg-amber-100 text-amber-700',
};

export default function WeeklyScheduleScreen() {
  const { navigate, openModal, startScheduleExec } = useGame();

  // slots[week][slot] = null | { name, grade, tab, mainStat, ... }
  const [slots, setSlots] = useState(
    Array.from({ length: 4 }, () => Array(SLOT_COUNT).fill(null))
  );
  const [picking, setPicking] = useState(null); // { week, slot }

  function openPicker(week, slot) {
    setPicking({ week, slot });
  }

  function handleSelect(schedule) {
    if (!picking) return;
    setSlots(prev => {
      const next = prev.map(w => [...w]);
      next[picking.week][picking.slot] = schedule;
      return next;
    });
    setPicking(null);
  }

  function removeSlot(week, slot) {
    setSlots(prev => {
      const next = prev.map(w => [...w]);
      next[week][slot] = null;
      return next;
    });
  }

  const totalPlaced = slots.flat().filter(Boolean).length;

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* 타이틀 바 */}
        <div className="relative flex items-center px-2 py-1 bg-slate-200 border-b border-slate-300">
          <button onClick={() => navigate('main-hub')} className="text-[10px] text-slate-500 w-5 h-5 flex items-center justify-center">‹</button>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[8px] font-bold text-slate-700">월간 스케줄 배분</span>
          </div>
          <div className="ml-auto text-[7px] text-slate-500">{totalPlaced}/12 배치됨</div>
        </div>

        {/* 주차 카드 그리드 */}
        <div className="flex-1 overflow-y-auto bg-slate-200 p-1.5 grid grid-cols-2 gap-1.5 content-start">
          {WEEKS.map((weekLabel, wi) => (
            <div key={wi} className="bg-slate-300 rounded p-1.5 flex flex-col gap-1">
              <div className="text-[7px] font-bold text-slate-600 mb-0.5">{weekLabel}</div>
              {Array.from({ length: SLOT_COUNT }, (_, si) => {
                const item = slots[wi][si];
                if (item) {
                  return (
                    <div key={si} className="bg-slate-100 rounded p-1 relative">
                      <button
                        onClick={() => removeSlot(wi, si)}
                        className="absolute top-0.5 right-0.5 text-slate-400 text-[9px] leading-none"
                      >✕</button>
                      <div className="text-[7px] font-bold text-slate-800 pr-2 leading-tight">{item.name}</div>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        <span className={`text-[6px] px-0.5 rounded ${GRADE_COLORS[['초급','중급','상급'][item.grade]]}`}>
                          {['초급','중급','상급'][item.grade]}
                        </span>
                        <span className="text-[6px] text-slate-500">{item.mainStat}↑</span>
                        {item.tab === '교육' && (
                          <span className="text-[6px] text-slate-400">{item.cost[item.grade]}G</span>
                        )}
                        {item.tab === '아르바이트' && (
                          <span className="text-[6px] text-green-600">+{item.income[item.grade]}G</span>
                        )}
                      </div>
                    </div>
                  );
                }
                return (
                  <button
                    key={si}
                    onClick={() => openPicker(wi, si)}
                    className="bg-slate-200 rounded flex items-center justify-center border border-dashed border-slate-400"
                    style={{ minHeight: 32 }}
                  >
                    <span className="text-slate-400 text-[10px]">+</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-3 py-2 bg-slate-200 border-t border-slate-300">
          <button
            onClick={() => {
              startScheduleExec({ year: 1, month: 1, allSlots: slots.map(w => w.map(s => s ?? null)) });
              navigate('schedule-exec');
            }}
            className="w-full py-1.5 bg-slate-600 text-white text-[8px] rounded font-bold"
          >한 달 시작 ▸</button>
        </div>
      </div>

      {/* 파티 편성 버튼은 Header 우측에 위임 (미구현 시 임시 위치) */}

      {/* 스케줄 선택 모달 */}
      {picking && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-[260px]">
            <SchedulePickModal
              onClose={() => setPicking(null)}
              onSelect={handleSelect}
            />
          </div>
        </div>
      )}

      <Nav />
    </>
  );
}
