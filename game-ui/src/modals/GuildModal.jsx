export default function GuildModal({ onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-2">── 모험가 길드 ──</div>
      <div className="space-y-1 text-[8px] text-slate-700">
        {[{name:'고블린 토벌',diff:'★',reward:'80G'},{name:'오크종 의뢰',diff:'★★',reward:'200G'},{name:'🔒 대적 단 지원',note:'길드 랭크 C 필요',locked:true}].map(q=>(
          <div key={q.name} className={`bg-slate-300 rounded p-1.5 ${q.locked?'opacity-60':''}`}>
            <div className="font-bold">{q.name}</div>
            <div className="text-[7px]">난이도 {q.diff||''} · 보수 {q.reward||q.note}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-around">
        <button onClick={onClose} className="px-3 py-1 bg-slate-500 text-white text-[8px] rounded">수락</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">닫기</button>
      </div>
    </div>
  );
}
