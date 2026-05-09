export default function CompanionDetailModal({ onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="flex gap-2 mb-2">
        <div className="w-14 h-16 bg-slate-500 rounded" />
        <div className="text-[8px] text-slate-700">
          <div className="font-bold">Liana · 마법사</div>
          <div>호감 72/100 ❤❤❤</div>
          <div className="text-amber-700">💕 사랑 체류</div>
        </div>
      </div>
      <div className="bg-slate-200 rounded p-1.5 text-[7px] mb-2">
        <div className="font-bold mb-0.5">함께한 추억</div>
        <div>· 도서관 만남 (1년 23일)</div>
        <div>· 첫 대화 (2년 14일)</div>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {['대화','선물','스킬','닫기'].map(b=>(
          <button key={b} onClick={b==='닫기'?onClose:undefined} className="py-1 bg-slate-400 text-white text-[7px] rounded">{b}</button>
        ))}
      </div>
    </div>
  );
}
