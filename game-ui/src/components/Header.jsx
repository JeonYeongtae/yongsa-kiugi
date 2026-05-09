import { useGame } from '../context/GameContext';

const AP_MAX = 3;
const AP_CURRENT = 3;

export default function Header({ showEnergy = false }) {
  const { openModal, navigate } = useGame();
  return (
    <div style={{ height: '10%', flexShrink: 0 }}
      className="header-bar bg-slate-600 flex items-center justify-between px-2 border-b-2 border-slate-700 text-slate-100">
      <button onClick={() => navigate('stats')} className="flex items-center gap-1 pt-1 text-left">
        <div className="w-6 h-6 bg-slate-400 rounded-sm" />
        <div style={{ fontSize: 7, lineHeight: 1.2 }}>
          <div className="font-bold text-[8px]">HERO</div>
          <div>14세 · 4년 16일</div>
        </div>
      </button>
      <div className="flex items-center gap-1 pt-1">
        <div className="flex flex-col text-[7px] gap-0.5">
          <div className="flex items-center gap-0.5" style={{height:10}}>
            <div className="w-5 flex items-center justify-center h-full">
              <span className="text-[6px] text-slate-300 leading-none">골드</span>
            </div>
            <span className="text-amber-200 flex items-center gap-0.5 leading-none">1,240<img src="/coin.png" style={{width:10, height:10}} /></span>
          </div>
          <div className="flex items-center gap-0.5">
            <div className="w-5 flex justify-center">
              <span className="text-[6px] text-slate-300">행동력</span>
            </div>
            {Array(AP_MAX).fill(0).map((_,i) => (
              <img key={i} src="/lightning.png" style={{width:8, height:9, opacity: i < AP_CURRENT ? 1 : 0.2}} />
            ))}
          </div>
        </div>
        <button onClick={() => openModal('settings')} className="w-4 h-4 bg-slate-500 rounded-sm ml-1 text-[8px]">⚙</button>
      </div>
    </div>
  );
}
