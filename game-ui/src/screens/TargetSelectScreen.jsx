import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function TargetSelectScreen() {
  const { navigate, openModal } = useGame();
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-200 flex items-center justify-between px-3 pt-5" style={{height:'55%'}}>
          <div><div className="w-10 h-12 bg-slate-500 rounded" /></div>
          <div className="text-slate-400 text-xl">⚔</div>
          <div className="flex flex-col gap-1.5">
            <button onClick={() => openModal('victory')} className="w-12 h-14 bg-slate-600 rounded border-2 border-red-500" />
            <div className="w-12 h-14 bg-slate-600 rounded opacity-60" />
          </div>
        </div>
        <div className="bg-slate-100 px-3 pt-5 text-[9px] text-slate-700" style={{height:'28%'}}>
          <div className="font-bold">고블린 (HP 32/40)</div>
          <div>예상 대미지: 18~24</div>
          <div>크리티컬 8%</div>
        </div>
        <div className="bg-slate-300 flex-1 flex items-center justify-around py-2">
          <button onClick={() => navigate('battle-main')} className="px-3 py-1 bg-slate-500 text-white text-[8px] rounded">← 취소</button>
          <button onClick={() => openModal('victory')} className="px-3 py-1 bg-red-600 text-white text-[8px] rounded font-bold">공격 ▸</button>
        </div>
      </div>
      <Nav dimmed />
    </>
  );
}
