export default function ActivityModal({ onClose }) {
  const categories = ['전체','교육','아르바이트','특수'];
  const activities = [
    {name:'검술 도장',cat:'교육',effect:'근력+3 체력-2',cost:'50G'},
    {name:'마법 학원',cat:'교육',effect:'지능+3 MP+2',cost:'80G'},
    {name:'도장 아르바이트',cat:'아르바이트',effect:'근력 10 / +30G',cost:'-'},
    {name:'🔒 왕립 아카데미',cat:'교육',disabled:true},
  ];
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center text-slate-800 mb-2">── 활동일 · 낮 활동 ──</div>
      <div className="flex gap-1 mb-2">
        {categories.map((c,i)=>(
          <button key={c} className={`px-2 py-0.5 rounded-full text-[7px] font-bold ${i===0?'bg-slate-600 text-white':'border border-slate-400 text-slate-600'}`}>{c}</button>
        ))}
      </div>
      <div className="space-y-1 text-[9px] text-slate-700">
        {activities.map(a=>(
          <div key={a.name} className={`rounded p-1.5 flex justify-between ${a.disabled?'bg-slate-400 opacity-50':'bg-slate-300'}`}>
            <span><b>{a.name}</b> {a.cat&&<span className="text-[7px] text-blue-600">[{a.cat}]</span>}<br/><span className="text-[7px]">{a.effect||''}</span></span>
            {a.cost&&<span className="text-[8px]">{a.cost}</span>}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-around">
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">취소</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-600 text-white text-[8px] rounded">배치 ▸</button>
      </div>
    </div>
  );
}
