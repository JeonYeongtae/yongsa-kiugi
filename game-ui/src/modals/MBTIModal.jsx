const MBTIS = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
export default function MBTIModal({ onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center text-slate-800 mb-1">── 성격 유형 선택 ──</div>
      <div className="grid grid-cols-4 gap-1 mb-2 text-[7px] text-center">
        {MBTIS.map((m,i)=>(
          <div key={m} className={`rounded py-1 font-bold ${i===2?'bg-amber-200 text-amber-800 border border-amber-500':'bg-slate-200 text-slate-600'}`}>{m}</div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-300 rounded p-1.5 text-[8px] text-slate-700 mb-2">
        <div className="font-bold text-amber-800 mb-0.5">ENTJ – 지도자형</div>
        <div className="flex gap-2"><span className="text-green-700">↑ 지능+8</span><span className="text-green-700">↑ 매력+5</span><span className="text-red-600">↓ 의지-3</span></div>
        <div className="text-[7px] text-slate-500 mt-0.5">특성: [분석가] [카리스마]</div>
      </div>
      <div className="flex justify-around">
        <button onClick={onClose} className="px-3 py-1 bg-slate-400 text-white text-[8px] rounded">취소</button>
        <button onClick={onClose} className="px-3 py-1 bg-slate-600 text-white text-[8px] rounded">선택 ▸</button>
      </div>
    </div>
  );
}
