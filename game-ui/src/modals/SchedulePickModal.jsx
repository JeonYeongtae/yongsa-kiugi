import { useState } from 'react';

const SCHEDULES = {
  교육: [
    { id: 'edu_knight',   name: '입립 기사단 훈련', mainStat: '물공', bonusStat: '스태미나', cost: [30, 60, 100] },
    { id: 'edu_mage',     name: '마법사 길드 강의',  mainStat: '마공', bonusStat: '마나',     cost: [30, 60, 100] },
    { id: 'edu_bard',     name: '도성비 찬사/성가',  mainStat: '화마', bonusStat: '마나',     cost: [30, 60, 100] },
    { id: 'edu_rogue',    name: '암습 사격/회피',    mainStat: '명중', bonusStat: '스태미나', cost: [30, 60, 100] },
    { id: 'edu_guard',    name: '기사단 방어/연수',  mainStat: '물방', bonusStat: '스태미나', cost: [30, 60, 100] },
    { id: 'edu_fire',     name: '화마법 전문 연구',  mainStat: '더버화', bonusStat: '마공',   cost: [30, 60, 100] },
  ],
  아르바이트: [
    { id: 'arb_mine',    name: '광산 채굴',       mainStat: '물공', penalty: '마공',     income: [40, 80, 135],  risk: [5, 10, 15] },
    { id: 'arb_guard',   name: '성벽 야간 경비',  mainStat: '물방', penalty: '명중',     income: [30, 65, 115],  risk: [3, 7, 12] },
    { id: 'arb_library', name: '마법 서적 정리',  mainStat: '마나', penalty: '물공',     income: [25, 55, 95],   risk: [1, 3, 5] },
    { id: 'arb_hunter',  name: '사냥터 가이드',   mainStat: '명중', penalty: '화마',     income: [35, 75, 125],  risk: [4, 8, 14] },
    { id: 'arb_golem',   name: '공돌머지 관리',   mainStat: '더버화', penalty: '번화',   income: [45, 90, 145],  risk: [6, 12, 18] },
    { id: 'arb_market',  name: '중소 시장 업무',  mainStat: '이(주)', penalty: '스태미나', income: [35, 75, 130], risk: [3, 7, 12] },
  ],
};

const GRADE_LABELS = ['초급', '중급', '상급'];

export default function SchedulePickModal({ onClose, onSelect }) {
  const [tab, setTab] = useState('교육');
  const [selectedId, setSelectedId] = useState(null);
  const [grade, setGrade] = useState(0);

  const items = SCHEDULES[tab];
  const selected = items.find(i => i.id === selectedId);

  function handleConfirm() {
    if (!selected) return;
    onSelect({ ...selected, grade, tab });
    onClose();
  }

  return (
    <div className="bg-slate-100 rounded p-2.5 w-full max-w-[260px]">
      <button onClick={onClose} className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>

      <div className="text-[9px] font-bold text-center text-slate-800 mb-2 mt-1">── 일정 선택 ──</div>

      {/* 탭 */}
      <div className="flex gap-1 mb-2">
        {['교육', '아르바이트'].map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setSelectedId(null); }}
            className={`flex-1 py-0.5 rounded text-[7px] font-bold ${tab === t ? 'bg-slate-600 text-white' : 'bg-slate-300 text-slate-600'}`}
          >{t}</button>
        ))}
      </div>

      {/* 일정 목록 */}
      <div className="space-y-0.5 mb-2 max-h-[120px] overflow-y-auto">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`w-full text-left rounded p-1.5 flex justify-between items-center ${selectedId === item.id ? 'bg-amber-200 border border-amber-400' : 'bg-slate-300'}`}
          >
            <div>
              <div className="text-[8px] font-bold text-slate-800">{item.name}</div>
              <div className="text-[6px] text-slate-500">
                {tab === '교육'
                  ? `${item.mainStat}↑ / ${item.bonusStat}↑`
                  : `${item.mainStat}↑ / ${item.penalty}↓ · 사고${item.risk[grade]}%`}
              </div>
            </div>
            <div className="text-[7px] font-bold text-slate-600 shrink-0 ml-1">
              {tab === '교육' ? `${item.cost[grade]}G` : `+${item.income[grade]}G`}
            </div>
          </button>
        ))}
      </div>

      {/* 등급 선택 */}
      <div className="flex gap-0.5 mb-2">
        {GRADE_LABELS.map((l, i) => (
          <button
            key={l}
            onClick={() => setGrade(i)}
            className={`flex-1 py-0.5 rounded text-[7px] ${grade === i ? 'bg-slate-600 text-white font-bold' : 'bg-slate-200 text-slate-500'}`}
          >{l}</button>
        ))}
      </div>

      {/* 선택 미리보기 */}
      <div className="bg-slate-200 rounded p-1.5 mb-2 text-[7px]" style={{ minHeight: 30 }}>
        {selected ? (
          <span className="text-slate-700">
            <span className="font-bold">{selected.name}</span> · {GRADE_LABELS[grade]}
            <br />
            {tab === '교육'
              ? `비용 ${selected.cost[grade]}G · ${selected.mainStat}+${[2,4,7][grade]} / ${selected.bonusStat}+${[1,2,3][grade]}`
              : `수입 +${selected.income[grade]}G · ${selected.mainStat}↑ / ${selected.penalty}↓`}
          </span>
        ) : (
          <span className="text-slate-400">일정을 선택해 주세요<br />&nbsp;</span>
        )}
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selected}
        className={`w-full py-1 rounded text-[8px] font-bold ${selected ? 'bg-slate-600 text-white' : 'bg-slate-300 text-slate-400'}`}
      >배치 ▸</button>
    </div>
  );
}
