export default function PartyModal({ onClose }) {
  const members = ['HERO','Liana','Selene'];
  const candidates = ['Marcus','Eira','Goran'];
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-2">── 이번 주 파티 ──</div>
      <div className="grid grid-cols-4 gap-1 mb-2">
        {[...members.map(m=>({name:m,filled:true})),{name:'+',filled:false}].map(m=>(
          <div key={m.name} className={`aspect-[3/4] rounded flex items-end justify-center pb-0.5 text-[7px] text-white ${m.filled?'bg-slate-500':'bg-slate-300 text-slate-500'}`}>{m.name}</div>
        ))}
      </div>
      <div className="text-[7px] italic mb-1 text-slate-600">여관 체류 동료에서 선택</div>
      <div className="grid grid-cols-3 gap-1">
        {candidates.map(c=>(
          <div key={c} className="bg-slate-300 rounded p-1 text-center text-[7px]">
            <div className="aspect-square bg-slate-500 rounded mb-0.5" />{c}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-around">
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">취소</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-600 text-white text-[8px] rounded">저장</button>
      </div>
    </div>
  );
}
