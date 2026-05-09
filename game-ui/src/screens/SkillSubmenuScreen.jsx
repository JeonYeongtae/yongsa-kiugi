import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function SkillSubmenuScreen() {
  const { navigate } = useGame();
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-200 flex-none" style={{height:'36%'}} />
        <div className="flex-1 bg-slate-100 px-3 pt-2 overflow-y-auto">
          {[{name:'강화',type:'단일',mp:5,equipped:true},{name:'회전 베기',type:'광역',mp:10,equipped:true},{name:'방어 자세',type:'버프',mp:3,equipped:true,disabled:true}].map(s=>(
            <button key={s.name} onClick={() => navigate('target-select')}
              className={`w-full mb-1 rounded p-1.5 flex justify-between text-[9px] ${s.equipped&&!s.disabled?'bg-amber-100 border border-amber-500':'bg-amber-50 border border-amber-300 opacity-50'}`}>
              <span><b>{s.name}</b> {s.type}</span>
              <span className={`text-[8px] ${s.disabled?'text-red-700':''}`}>MP {s.mp}</span>
            </button>
          ))}
          <div className="text-[7px] text-slate-500 italic">※ #17에서 편성한 스킬만 표시</div>
        </div>
        <div className="bg-slate-300 flex items-center justify-around py-2">
          <button onClick={() => navigate('battle-main')} className="px-3 py-1 bg-slate-500 text-white text-[8px] rounded">← 돌아가</button>
        </div>
      </div>
      <Nav dimmed />
    </>
  );
}
