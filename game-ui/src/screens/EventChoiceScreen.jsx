import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function EventChoiceScreen() {
  const { navigate } = useGame();
  return (
    <>
      <Header showEnergy />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-200 flex items-center justify-center" style={{height:'32%'}}>
          <div className="w-3/4 h-3/4 bg-slate-400 rounded flex items-center justify-center text-[9px]">SCENE (28%)</div>
        </div>
        <div className="bg-slate-100 px-3 pt-4 text-[9px] text-slate-700" style={{height:'30%'}}>
          <div>"처음엔 이상한 소리가 들린다."</div>
          <div>"반대쪽엔 두 갈래로 나뉘어 있다."</div>
        </div>
        <div className="flex-1 bg-slate-300 px-3 pt-2 flex flex-col gap-1">
          {[
            {label:'▸ 소리를 따라간다 (전투 가능)', to:'battle-main'},
            {label:'▸ 반대쪽을 조사한다', to:'schedule-exec'},
            {label:'▸ 돌아간다', to:'world-map'},
          ].map(c=>(
            <button key={c.label} onClick={() => navigate(c.to)}
              className="w-full py-1.5 bg-slate-400 rounded text-[8px] text-left px-2">{c.label}</button>
          ))}
        </div>
      </div>
      <Nav />
    </>
  );
}
