import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function MainHubScreen() {
  const { navigate } = useGame();
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-200 flex items-center justify-center" style={{height:'32%'}}>
          <div className="w-3/4 h-3/4 bg-slate-400 rounded flex items-center justify-center text-[9px] text-slate-700">EVENT CG (28%)</div>
        </div>
        <div className="flex-1 bg-slate-100 px-3 pt-5 text-[9px] text-slate-700">
          <div className="font-bold">▸ 전대용사</div>
          <div>"이번 주는... 어디를 보내줄까. 무리하지 않았으면 좋겠는데."</div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            <button onClick={() => navigate('world-map')} className="py-1.5 bg-slate-300 rounded text-[8px]">▸ 탐험</button>
            <button onClick={() => navigate('weekly-schedule')} className="py-1.5 bg-slate-300 rounded text-[8px]">▸ 스케줄</button>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
