import { useGame } from '../context/GameContext';

const SAVE_SLOTS = [
  { slot: 1, name: 'HERO', age: '14세', date: '4년 16일', time: '12시간', full: true },
  { slot: 2, name: 'LIANA', age: '17세', date: '7년 24일', time: '28시간', full: true },
  { slot: 3, name: null, age: null, date: null, time: null, full: false },
];

export default function SaveLoadScreen() {
  const { navigate } = useGame();

  return (
    <div className="flex-1 flex flex-col">

      {/* 타이틀 바 — 뒤로가기 화살표 + 제목 */}
      <div className="bg-slate-600 py-2 flex items-center px-2">
        <button
          onClick={() => navigate('main-menu')}
          className="w-5 h-5 flex items-center justify-center text-slate-200 text-[14px] leading-none"
        >
          ‹
        </button>
        <div className="flex-1 text-center text-[10px] font-bold text-slate-800 pr-5">
          SAVE / LOAD
        </div>
      </div>

      {/* 슬롯 목록 */}
      <div className="flex-1 bg-slate-200 overflow-y-auto px-3 pt-2 flex flex-col gap-2">
        {SAVE_SLOTS.map(s => (
          <div key={s.slot} className="relative">
            {/* 슬롯 카드 — 탭하면 바로 로드 */}
            <button
              onClick={() => navigate('main-hub')}
              className={`w-full bg-slate-300 rounded p-2 flex gap-2 text-left ${!s.full ? 'opacity-50' : ''}`}
            >
              <div className="w-12 h-12 bg-slate-500 flex items-end justify-center text-[7px] text-white pb-0.5 flex-shrink-0">
                {s.full ? s.age : ''}
              </div>
              <div className="text-[9px] text-slate-700">
                <div className="font-bold">{s.full ? s.name : `SLOT ${s.slot}`}</div>
                {s.full ? (
                  <>
                    <div>{s.date}</div>
                    <div>플레이 {s.time}</div>
                  </>
                ) : (
                  <div>EMPTY</div>
                )}
              </div>
            </button>

            {/* 삭제 버튼 — 카드 우측 인라인 */}
            {s.full && (
              <button
                onClick={e => { e.stopPropagation(); /* delete logic */ }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 text-[9px]"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
