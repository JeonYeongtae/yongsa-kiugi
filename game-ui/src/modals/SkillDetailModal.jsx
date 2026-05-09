export default function SkillDetailModal({ onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px]">
      <div className="text-[11px] font-bold text-center mb-2">── 스킬 상세 ──</div>
      <div className="flex gap-2 mb-2">
        <div className="w-12 h-12 bg-amber-200 border-2 border-amber-500 rounded flex items-center justify-center text-[14px]">✦</div>
        <div className="text-[9px] text-slate-700">
          <div className="font-bold">강화 Lv.3</div>
          <div className="text-[8px] text-slate-500">근접 계열 · 단일 대상</div>
          <div className="text-[8px] text-slate-500">호환 무기: ⚔ 근접 무기</div>
        </div>
      </div>
      <div className="bg-slate-200 rounded p-1.5 mb-2 text-[8px] text-slate-700 space-y-0.5">
        <div className="flex justify-between"><span>소비 MP</span><span className="font-bold">5</span></div>
        <div className="flex justify-between"><span>기본 대미지</span><span className="font-bold">근력 × 1.8</span></div>
        <div className="flex justify-between"><span>효과</span><span className="font-bold">스턴 15%</span></div>
        <div className="text-[7px] text-slate-500 italic">"강화 일격으로 적을 격파한다."</div>
      </div>
      <div className="bg-slate-200 rounded p-1 mb-2 text-[7px] text-slate-600">Lv.4 업그레이드: 대미지+10% · 필요 근력 50</div>
      <div className="text-center"><button onClick={onClose} className="px-4 py-1 bg-slate-600 text-white text-[8px] rounded">닫기</button></div>
    </div>
  );
}
