import { useGame } from '../context/GameContext';
export default function CharCreateScreen() {
  const { navigate, openModal } = useGame();
  return (
    <div className="flex-1 flex flex-col">

      {/* 타이틀 바 — 뒤로가기 화살표 + 제목 */}
      <div className="bg-slate-400 py-2 flex items-center px-2">
        <button
          onClick={() => navigate('save-load')}
          className="w-5 h-5 flex items-center justify-center text-slate-700 text-[14px] leading-none"
        >
          ‹
        </button>
        <div className="flex-1 text-center text-[10px] font-bold text-slate-800 pr-5">
          CREATE YOUR HERO
        </div>
      </div>

      {/* 캐릭터 미리보기 */}
      <div className="bg-slate-200 flex items-center justify-center gap-2" style={{ height: '32%' }}>
        <button className="text-slate-500 text-[10px]">◀</button>
        <div className="w-20 h-24 bg-slate-500 rounded flex items-end justify-center pb-1 text-[8px] text-white text-center">
          남주<br />고전 이상형
        </div>
        <button className="text-slate-500 text-[10px]">▸</button>
      </div>

      {/* 설정 폼 */}
      <div className="flex-1 bg-slate-100 px-3 pt-3 flex flex-col gap-1.5 text-[9px] text-slate-700 overflow-y-auto">
        <div>
          <div className="text-[8px] text-slate-500 mb-0.5">성별 (이미지 자동 변경)</div>
          <div className="flex gap-1">
            <button className="flex-1 py-1 bg-slate-600 text-white rounded text-[8px]">♂ 남</button>
            <button className="flex-1 py-1 bg-slate-200 border border-slate-400 rounded text-[8px]">♀ 여</button>
          </div>
        </div>
        <div>
          <div className="text-[8px] text-slate-500 mb-0.5">종족</div>
          <div className="flex gap-1">
            {['인간', '엘프', '드워프', '다크엘프'].map(r => (
              <button key={r} className="flex-1 py-1 bg-slate-200 border border-slate-400 rounded text-[7px]">{r}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[8px] text-slate-500 mb-0.5">생일 (4주 28일 자체 달력)</div>
          <button onClick={() => openModal('calendar')} className="w-full py-1.5 bg-white border border-slate-400 rounded text-[8px] flex items-center justify-between px-2">
            <span>1주차 7일</span><span>📅</span>
          </button>
        </div>
        <div>
          <div className="text-[8px] text-slate-500 mb-0.5">MBTI (능력치·특성 변화)</div>
          <button onClick={() => openModal('mbti')} className="w-full py-1.5 bg-white border border-slate-400 rounded text-[8px] flex items-center justify-between px-2">
            <span className="font-bold text-slate-700">INTJ</span>
            <span className="text-[7px] text-green-700">지능+10 매력-3 ▸</span>
          </button>
        </div>
        <div className="text-[7px] text-slate-500 italic">※ 이름은 메인 스토리에서 NPC가 부여</div>

        {/* 시작하기 — 콘텐츠 하단 단독 CTA */}
        <button
          onClick={() => navigate('prologue')}
          className="mt-auto mb-2 w-full py-2 bg-slate-600 text-white text-[9px] font-bold rounded"
        >
          시작하기 ▸
        </button>
      </div>

    </div>
  );
}
