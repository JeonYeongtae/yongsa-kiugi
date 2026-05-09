import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function BattleMainScreen() {
  const { navigate, openModal } = useGame();
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-400 flex items-end justify-around px-2 pb-1" style={{height:'14%'}}>
          {['HERO','동료'].map(u=>(
            <div key={u} className="flex flex-col items-center">
              <div className="w-7 h-7 bg-slate-600 rounded border-2 border-yellow-400" />
              <div className="w-7 h-1 bg-red-700 mt-0.5" />
              <div className="w-7 h-1 bg-blue-700" />
            </div>
          ))}
          <div className="text-slate-700 text-[8px] font-bold">VS</div>
          {['고블린1','고블린2'].map((e,i)=>(
            <div key={e} className="flex flex-col items-center relative">
              <div className="w-7 h-7 bg-slate-700 rounded" />
              <div className="w-7 h-1 bg-red-700 mt-0.5" />
              {i===0 && <div className="absolute -top-4 -right-1 text-[13px] font-black text-red-500">228</div>}
            </div>
          ))}
        </div>
        <div className="bg-slate-200 flex items-center justify-between px-3 pt-5" style={{height:'38%'}}>
          <div className="flex flex-col gap-1.5">
            <div className="w-10 h-12 bg-slate-500 rounded" />
            <div className="w-10 h-12 bg-slate-500 rounded" />
          </div>
          <div className="text-slate-400 text-xl">⚔</div>
          <div className="flex flex-col gap-1.5">
            <div className="w-12 h-14 bg-slate-600 rounded border-2 border-red-400" />
            <div className="w-12 h-14 bg-slate-600 rounded" />
          </div>
        </div>
        <div className="bg-slate-100 px-3 pt-2 font-mono text-[8px] text-slate-600" style={{height:'20%'}}>
          <div>▸ Hero attacks Goblin</div>
          <div>▸ Damage: 24</div>
          <div>▸ Goblin's turn...</div>
        </div>
        <div className="bg-slate-300 flex-1 px-3 pt-2 pb-2 grid grid-cols-2 gap-1.5">
          <button onClick={() => navigate('target-select')} className="py-1 bg-slate-400 rounded text-[8px] flex flex-col items-center justify-center leading-tight">
            <span>⚔ 공격</span>
            <span className="text-[6px] text-slate-600 mt-0.5">근접 · 행동력 1</span>
          </button>
          <button onClick={() => navigate('skill-submenu')} className="py-1 bg-slate-400 rounded text-[8px] flex flex-col items-center justify-center leading-tight">
            <span>✦ 스킬</span>
            <span className="text-[6px] text-slate-600 mt-0.5">MP 소모</span>
          </button>
          <button onClick={() => openModal('item')} className="py-1.5 bg-slate-400 rounded text-[8px]">🎒 아이템</button>
          <button className="py-1.5 bg-slate-400 rounded text-[8px]">🛡 방어</button>
        </div>
      </div>
      <Nav dimmed />
    </>
  );
}
