import { useState } from 'react';

const SCHEDULES = {
  교육: [
    { id: 'edu_knight',   name: '입립 기사단 훈련', mainStat: '물공', bonusStat: '스태미나', cost: [30, 60, 100] },
    { id: 'edu_mage',     name: '마법사 길드 강의',  mainStat: '마공', bonusStat: '마나',     cost: [30, 60, 100] },
    { id: 'edu_bard',     name: '도성비 찬사/성가',  mainStat: '마공', bonusStat: '마나',     cost: [30, 60, 100] },
    { id: 'edu_rogue',    name: '암습 사격/회피',    mainStat: '명중', bonusStat: '스태미나', cost: [30, 60, 100] },
    { id: 'edu_guard',    name: '기사단 방어/연수',  mainStat: '물방', bonusStat: '스태미나', cost: [30, 60, 100] },
    { id: 'edu_fire',     name: '화마법 전문 연구',  mainStat: '마공', bonusStat: '마공',     cost: [30, 60, 100] },
  ],
  아르바이트: [
    { id: 'arb_mine',    name: '광산 채굴',       mainStat: '물공', penalty: '마공',     income: [40, 80, 135],  risk: [5, 10, 15] },
    { id: 'arb_guard',   name: '성벽 야간 경비',  mainStat: '물방', penalty: '명중',     income: [30, 65, 115],  risk: [3, 7, 12] },
    { id: 'arb_library', name: '마법 서적 정리',  mainStat: '마공', penalty: '물공',     income: [25, 55, 95],   risk: [1, 3, 5] },
    { id: 'arb_hunter',  name: '사냥터 가이드',   mainStat: '명중', penalty: '화마',     income: [35, 75, 125],  risk: [4, 8, 14] },
    { id: 'arb_golem',   name: '공돌머지 관리',   mainStat: '물공', penalty: '번화',     income: [45, 90, 145],  risk: [6, 12, 18] },
    { id: 'arb_market',  name: '중소 시장 업무',  mainStat: '스태미나', penalty: '스태미나', income: [35, 75, 130], risk: [3, 7, 12] },
  ],
};

const EDU_STAT_FILTERS  = ['전체', '물공', '마공', '물방', '마방', '명중', '회피'];
const ARB_STAT_FILTERS  = ['전체', '물공', '마공', '물방', '명중', '스태미나'];
const GRADE_LABELS = ['초급', '중급', '상급'];

export default function SchedulePickModal({ onClose, onSelect }) {
  const [tab, setTab]           = useState('교육');
  const [selectedKey, setSelectedKey] = useState(null); // "itemId::gradeIdx"
  const [statFilter, setStatFilter] = useState('전체');

  const statFilters = tab === '교육' ? EDU_STAT_FILTERS : ARB_STAT_FILTERS;
  const items = SCHEDULES[tab];

  const filtered = statFilter === '전체'
    ? items
    : items.filter(item => item.mainStat === statFilter || item.bonusStat === statFilter);

  function handleTabChange(newTab) {
    setTab(newTab);
    setSelectedKey(null);
    setStatFilter('전체');
  }

  function handleConfirm() {
    if (!selectedKey) return;
    const sepIdx = selectedKey.lastIndexOf('::');
    const itemId  = selectedKey.slice(0, sepIdx);
    const gradeIdx = Number(selectedKey.slice(sepIdx + 2));
    const item = items.find(i => i.id === itemId);
    onSelect({ ...item, grade: gradeIdx, tab });
    onClose();
  }

  return (
    <div className="relative bg-slate-100 rounded-lg px-3 pt-4 pb-3 w-full max-w-[260px] border border-slate-300">
      <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-400 text-[10px]">✕</button>

      <div className="text-[7px] font-bold text-amber-600 tracking-wider mb-0.5">월간 스케줄</div>
      <div className="text-[9px] font-bold text-slate-800 mb-2.5">일정을 선택하세요.</div>

      {/* 교육/아르바이트 탭 */}
      <div className="flex gap-1 mb-2">
        {['교육', '아르바이트'].map(t => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={`flex-1 py-0.5 rounded text-[7px] font-bold ${tab === t ? 'bg-slate-600 text-white' : 'bg-white text-slate-500 border border-slate-300'}`}
          >{t}</button>
        ))}
      </div>

      {/* 스탯 필터 — 한 줄 가로 스크롤 */}
      <div className="flex gap-0.5 mb-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
        {statFilters.map(f => (
          <button
            key={f}
            onClick={() => { setStatFilter(f); setSelectedKey(null); }}
            className={`flex-shrink-0 px-1.5 py-0.5 rounded-full text-[6px] transition-colors ${
              statFilter === f ? 'bg-amber-400 text-white font-bold' : 'bg-slate-200 text-slate-500'
            }`}
          >{f}</button>
        ))}
      </div>

      {/* 일정 목록 — 종류별 구분선, 각 종류마다 초·중·상 나열 */}
      <div className="mb-2 h-[150px] overflow-y-auto space-y-0.5">
        {filtered.map((item, itemIdx) => (
          <div key={item.id}>
            {itemIdx > 0 && <div className="border-t border-slate-300 my-1" />}
            {GRADE_LABELS.map((label, gradeIdx) => {
              const key = `${item.id}::${gradeIdx}`;
              const isSelected = selectedKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={`w-full text-left rounded px-1.5 py-1 flex justify-between items-center mb-0.5 last:mb-0 ${
                    isSelected ? 'bg-amber-100 border border-amber-400' : 'bg-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-[7px] font-bold text-slate-800">{item.name} · {label}</div>
                    <div className="text-[6px] text-slate-500">
                      {tab === '교육'
                        ? `${item.mainStat}↑ / ${item.bonusStat}↑`
                        : `${item.mainStat}↑ / ${item.penalty}↓ · 사고${item.risk[gradeIdx]}%`}
                    </div>
                  </div>
                  <div className={`text-[7px] font-bold shrink-0 ml-1 ${tab === '교육' ? 'text-red-500' : 'text-green-600'}`}>
                    {tab === '교육' ? `-${item.cost[gradeIdx]}G` : `+${item.income[gradeIdx]}G`}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-[7px] text-slate-400 text-center py-2">해당 스탯 일정 없음</div>
        )}
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selectedKey}
        className={`w-full py-0.5 rounded text-[8px] font-bold ${selectedKey ? 'bg-slate-600 text-white' : 'bg-slate-200 text-slate-400'}`}
      >배치 ▸</button>
    </div>
  );
}
