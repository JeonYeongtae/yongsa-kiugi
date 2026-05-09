export default function ShopModal({ onClose }) {
  const items = [{name:'강철 검',effect:'공격 +12',price:'300G'},{name:'롱소드',effect:'공격 +18',price:'520G'},{name:'미스릴 단검',effect:'공격 +9',price:'750G'}];
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-1">── 무기 상점 · 1240G ──</div>
      <div className="flex gap-1 mb-2">
        {['구매','판매'].map((t,i)=>(
          <button key={t} className={`flex-1 py-1 text-[8px] rounded ${i===0?'bg-slate-600 text-white':'bg-slate-300 text-slate-600'}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-1 text-[8px] text-slate-700">
        {items.map(i=>(
          <div key={i.name} className="bg-slate-300 rounded p-1 flex justify-between">
            <span><b>{i.name}</b> · {i.effect}</span><span>{i.price}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-around">
        <button className="px-3 py-1 bg-slate-500 text-white text-[8px] rounded">구매</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">취소</button>
      </div>
    </div>
  );
}
