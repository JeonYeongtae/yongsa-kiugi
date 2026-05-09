export default function CalendarModal({ onClose }) {
  const weeks = ['1주','2주','3주','4주'];
  const days = Array.from({length:7},(_,i)=>i+1);
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center text-slate-800 mb-2">── 생일 선택 ──</div>
      <div className="grid grid-cols-7 gap-1 text-[7px] text-center text-slate-700 mb-1">
        {days.map(d=><div key={d} className="font-bold">{d}일</div>)}
      </div>
      {weeks.map(w=>(
        <div key={w} className="grid grid-cols-7 gap-1 mb-0.5">
          {days.map(d=>(
            <button key={d} className="bg-slate-300 rounded py-1 text-[7px] text-slate-700">{w}</button>
          ))}
        </div>
      ))}
      <div className="text-[8px] text-slate-600 mt-2 text-center">※ 1년 = 4주 × 7일 = 28일</div>
      <div className="mt-3 flex justify-around">
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">취소</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-600 text-white text-[8px] rounded">확인</button>
      </div>
    </div>
  );
}
