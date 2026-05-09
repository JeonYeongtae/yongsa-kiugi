export default function SettingsModal({ onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-2">── SETTINGS ──</div>
      <div className="space-y-2 text-[8px] text-slate-700">
        {['BGM','SFX'].map(s=>(
          <div key={s}>
            <div className="mb-0.5 font-bold">{s}</div>
            <div className="h-2 bg-slate-300 rounded"><div className="h-full bg-slate-600 rounded" style={{width:'70%'}} /></div>
          </div>
        ))}
        <div>
          <div className="mb-0.5 font-bold">텍스트 속도</div>
          <div className="flex gap-1">
            {['느림','보통','빠름'].map((s,i)=>(
              <button key={s} className={`flex-1 py-1 rounded text-[7px] ${i===1?'bg-slate-600 text-white':'bg-slate-200 text-slate-600'}`}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-0.5 font-bold">언어</div>
          <div className="flex gap-1">
            {['한국어','EN'].map((s,i)=>(
              <button key={s} className={`flex-1 py-1 rounded text-[7px] ${i===0?'bg-slate-600 text-white':'bg-slate-200 text-slate-600'}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="text-center mt-1"><button className="px-3 py-1 bg-slate-300 rounded text-[7px]">📜 Credits</button></div>
      </div>
      <div className="mt-3 text-center"><button onClick={onClose} className="px-4 py-1 bg-slate-600 text-white text-[8px] rounded">닫기</button></div>
    </div>
  );
}
