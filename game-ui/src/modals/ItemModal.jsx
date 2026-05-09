export default function ItemModal({ onClose }) {
  const items = [{name:'포션 (HP+30)',count:'×5'},{name:'마나포션',count:'×3'},{name:'해독제',count:'×2'},{name:'불꽃석',count:'×1'}];
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-2">── 아이템 사용 ──</div>
      <div className="space-y-1 text-[8px]">
        {items.map(i=>(
          <div key={i.name} className="bg-slate-300 rounded p-1 flex justify-between">
            <span><b>{i.name}</b></span><span>{i.count}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-around">
        <button onClick={onClose} className="px-3 py-1 bg-slate-500 text-white text-[8px] rounded">사용</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">취소</button>
      </div>
    </div>
  );
}
