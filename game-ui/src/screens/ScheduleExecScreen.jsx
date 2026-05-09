import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
import { buildSlotResult, rollResult, RESULT_STYLE, GRADE_LABELS } from '../utils/scheduleUtils';

export default function ScheduleExecScreen() {
  const { navigate, scheduleExec, saveWeekResult } = useGame();
  const { year, month, currentWeek, allSlots } = scheduleExec;
  const weekSlots = allSlots?.[currentWeek - 1] ?? [null, null, null];

  // 이번 주 3슬롯 결과를 마운트 시 1회 결정
  const results = useMemo(
    () => weekSlots.map(slot => buildSlotResult(slot, rollResult())),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentWeek]
  );

  const [active, setActive] = useState(0);
  const result = results[active];
  const rs = RESULT_STYLE[result.grade];
  const isLast = active === 2;

  const slotName = (i) => weekSlots[i]?.name ?? `슬롯${i + 1}`;

  function handleNext() {
    if (!isLast) {
      setActive(a => a + 1);
    } else {
      saveWeekResult(results);
      navigate('weekly-report');
    }
  }

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* 연도/월/주차 */}
        <div className="bg-slate-200 border-b border-slate-300 flex items-center justify-center py-1 shrink-0">
          <span className="text-[7px] font-bold text-slate-500 tracking-wide">
            {year}년 {month}월 {currentWeek}주차 진행 중
          </span>
        </div>

        {/* 슬롯 탭 — 활동명만 표시 */}
        <div className="flex bg-slate-200 border-b border-slate-300 shrink-0">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-1 py-1.5 text-[7px] font-bold transition-colors truncate px-1 ${
                active === i ? 'bg-slate-600 text-white' : 'text-slate-500 hover:bg-slate-300'
              }`}
            >
              {slotName(i)}
            </button>
          ))}
        </div>

        {/* 활동 일러스트 */}
        <div className="bg-slate-200 flex items-center justify-center shrink-0" style={{ height: '30%' }}>
          <div className="w-3/4 h-3/4 bg-slate-400 rounded flex items-end justify-center pb-1 text-[8px] text-white">
            활동 일러스트
          </div>
        </div>

        {/* 결과 텍스트 + CTA */}
        <div className="flex-1 bg-slate-100 px-3 pt-3 pb-2 flex flex-col justify-between overflow-hidden">
          <div>
            <div className={`font-bold text-[11px] ${rs.color}`}>{rs.label}</div>
            <div className="mt-1 text-[9px] text-slate-700 leading-relaxed">
              {result.lines.map((l, i) => <div key={i}>{l}</div>)}
            </div>
            <div className="mt-2 text-[8px] flex gap-2">
              {result.statGain && (
                <span className="text-green-700">{result.statGain.name} +{result.statGain.amount}</span>
              )}
              {result.goldDelta !== 0 && (
                <span className={result.goldDelta > 0 ? 'text-amber-600' : 'text-slate-500'}>
                  {result.goldDelta > 0 ? `+${result.goldDelta}G` : `${result.goldDelta}G`}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-2 bg-slate-600 text-white text-[9px] font-bold rounded mt-3"
          >
            {isLast ? '주차 결과 보기 ▸' : '다음 활동으로 ▸'}
          </button>
        </div>
      </div>
      <Nav />
    </>
  );
}
