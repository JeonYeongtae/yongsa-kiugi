import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';


function ScheduleModeModal({ onClose, onSelect }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.65)' }}>
      <div className="bg-slate-100 rounded p-3 w-4/5 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px] leading-none"
        >
          ✕
        </button>
        <div className="text-[9px] font-bold text-center text-slate-700 mb-3 mt-1">
          ── 스케줄 시작 방식 ──
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onSelect('monthly')}
            className="w-full py-2.5 bg-slate-600 text-white text-[8px] font-bold rounded flex items-center justify-between px-3 active:scale-95 transition-transform"
          >
            <span>월간 처리</span>
            <span className="text-slate-300 font-normal">4주 일괄 배분 ▸</span>
          </button>
          <button
            onClick={() => onSelect('weekly')}
            className="w-full py-2.5 bg-slate-500 text-white text-[8px] font-bold rounded flex items-center justify-between px-3 active:scale-95 transition-transform"
          >
            <span>주간 처리</span>
            <span className="text-slate-300 font-normal">1주씩 순차 진행 ▸</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MainHubScreen() {
  const { navigate, setScheduleMode } = useGame();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const handleScheduleSelect = (mode) => {
    setScheduleMode(mode);
    setScheduleModalOpen(false);
    navigate('weekly-schedule');
  };

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="bg-slate-200 flex items-center justify-center" style={{height:'32%'}}>
          <div className="w-3/4 h-3/4 bg-slate-400 rounded flex items-center justify-center text-[9px] text-slate-700">EVENT CG (28%)</div>
        </div>
        <div className="flex-1 bg-slate-100 px-3 pt-5 text-[9px] text-slate-700">
          <div className="font-bold">▸ 당신</div>
          <div>"이번 주는... 어디를 보내줄까. 무리하지 않았으면 좋겠는데."</div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            <button onClick={() => navigate('world-map')} className="py-1.5 bg-slate-300 rounded text-[8px]">▸ 탐험</button>
            <button onClick={() => setScheduleModalOpen(true)} className="py-1.5 bg-slate-300 rounded text-[8px]">▸ 스케줄</button>
          </div>
        </div>

        {/* 스케줄 방식 선택 모달 */}
        {scheduleModalOpen && (
          <ScheduleModeModal
            onClose={() => setScheduleModalOpen(false)}
            onSelect={handleScheduleSelect}
          />
        )}
      </div>
      <Nav />
    </>
  );
}
