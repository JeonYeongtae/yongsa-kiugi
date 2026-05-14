import { useGame } from '../context/GameContext';

const AREA_NAME = '엘프 마을';

export default function ExplorationActionScreen() {
  const { navigate } = useGame();

  const actions = [
    { label: '사람을 만날래',    ap: 1, active: true },
    { label: '물건을 찾아볼래',  ap: 1, active: true },
    { label: '그냥 돌아다닐래',  ap: 1, active: true },
    { label: '토벌을 시작할래',  ap: 1, active: false, condition: '조건 필요' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-100">
      {/* 타이틀 바 */}
      <div className="relative flex items-center px-3 h-9 bg-slate-600 border-b border-slate-700 flex-shrink-0">
        <button
          onClick={() => navigate('world-map')}
          className="text-[13px] text-slate-200 font-bold pr-3"
        >
          ‹
        </button>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-100">
          {AREA_NAME}
        </span>
      </div>

      {/* 본문 */}
      <div className="flex-1 flex flex-col px-4 pt-6 pb-4 gap-3 overflow-y-auto">
        <div className="text-[10px] text-slate-600 font-bold text-center mb-2">
          이동했어. 무엇을 할까?
        </div>

        {/* 선택지 버튼들 */}
        <div className="flex flex-col gap-2">
          {actions.map((action, i) => (
            action.active ? (
              <button
                key={i}
                onClick={() => navigate('event-choice')}
                className="w-full py-3 bg-slate-600 text-white text-[9px] font-bold rounded flex items-center justify-between px-4 active:scale-95 transition-transform"
              >
                <span>{action.label}</span>
                <span className="text-[7px] text-slate-300 font-normal">행동력 {action.ap}</span>
              </button>
            ) : (
              <button
                key={i}
                disabled
                className="w-full py-3 bg-slate-300 text-slate-400 text-[9px] font-bold rounded flex items-center justify-between px-4 cursor-default"
              >
                <span>{action.label}</span>
                <span className="text-[7px] text-slate-400 font-normal">{action.condition}</span>
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
