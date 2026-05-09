export default function InnModal({ onClose }) {
  const menuItems = [
    {name:'💕 Liana (체류중)',btn:'대화'},
    {name:'💕 Selene (체류중)',btn:'대화'},
    {name:'+ 새 동료 입숙',btn:'100G'},
    {name:'🌙 휴식 (HP+MP)',btn:'50G'},
    {name:'🗺 지역 이동',btn:'이동'},
  ];
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-2">── 여관 ──</div>
      <div className="text-[8px] text-slate-700 mb-2 italic">"동료들이 머물며 함께할 시기를 기다립니다"</div>
      <div className="space-y-1 text-[8px]">
        {menuItems.map(r=>(
          <div key={r.name} className="bg-slate-300 rounded p-1.5 flex justify-between items-center">
            <span>{r.name}</span>
            <button onClick={onClose} className="px-2 py-0.5 bg-slate-500 text-white text-[7px] rounded">{r.btn}</button>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center"><button onClick={onClose} className="px-4 py-1 bg-slate-600 text-white text-[8px] rounded">닫기</button></div>
    </div>
  );
}
