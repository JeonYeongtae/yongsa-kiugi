export default function MentorModal({ onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-2">── 인연의 스승을 골라라 ──</div>
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {Array(12).fill(0).map((_,i)=>(
          <div key={i} className={`aspect-square rounded flex items-center justify-center text-[10px] text-white ${i===4?'bg-slate-600':'bg-slate-500'}`}>⚔</div>
        ))}
      </div>
      <div className="text-[8px] text-slate-700 italic">"합독 12권을 가진 → 1회 영구 적용"</div>
      <div className="text-[8px] text-slate-600">여마술사리: 근력 +15%, 크리티컬 +5%</div>
      <div className="mt-2 flex justify-around">
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">취소</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-600 text-white text-[8px] rounded">선택 ▸</button>
      </div>
    </div>
  );
}
