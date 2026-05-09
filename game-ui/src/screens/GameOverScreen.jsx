import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function GameOverScreen() {
  const { navigate } = useGame();
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-800 flex-1 flex flex-col items-center justify-center px-6 gap-3">
          <div className="text-slate-300 text-[14px] font-bold tracking-widest">DEFEAT</div>
          <div className="text-slate-500 text-[8px] text-center">"용사의 여정이 끝났다..."</div>
          <div className="w-20 h-20 bg-slate-700 rounded opacity-50" />
          <div className="flex flex-col gap-1.5 w-full">
            <button onClick={() => navigate('weekly-schedule')} className="w-full py-1.5 bg-slate-600 text-white text-[8px] rounded">▸ 직전 세이브</button>
            <button onClick={() => navigate('battle-main')} className="w-full py-1.5 bg-slate-600 text-white text-[8px] rounded">▸ 리트라이</button>
          </div>
        </div>
      </div>
      <Nav dimmed />
    </>
  );
}
