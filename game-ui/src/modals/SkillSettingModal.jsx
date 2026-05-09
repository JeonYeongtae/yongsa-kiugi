export default function SkillSettingModal({ onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-2">── 스킬 편성 (3/3) ──</div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {['강화','회전','방어'].map(s=>(
          <div key={s} className="aspect-square bg-amber-200 border-2 border-amber-500 rounded flex items-center justify-center text-[7px]">{s}</div>
        ))}
      </div>
      <div className="text-[7px] text-slate-600 italic mb-1">활성 스킬 칸에 드래그·탭으로 배치</div>
      <div className="grid grid-cols-4 gap-1">
        {Array(8).fill(0).map((_,i)=>(
          <div key={i} className={`aspect-square rounded ${i<2?'bg-slate-400':'bg-slate-300'}`} />
        ))}
      </div>
      <div className="mt-3 flex justify-around">
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">취소</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-600 text-white text-[8px] rounded">저장</button>
      </div>
    </div>
  );
}
