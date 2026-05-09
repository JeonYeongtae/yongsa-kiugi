import { useGame } from '../context/GameContext';
export default function FinalBossScreen() {
  const { navigate } = useGame();
  return (
    <div className="flex-1 flex flex-col cursor-pointer" onClick={() => navigate('battle-main')}>
      <div className="flex-1 bg-slate-900 flex items-center justify-center text-slate-400 text-[10px]">
        ★ FINAL BOSS ★<br/><br/>BOSS_SPRITE
      </div>
      <div className="bg-slate-800 text-slate-200 flex flex-col items-center justify-center py-4 text-[10px]">
        <div className="font-bold tracking-widest">MALEFICUS</div>
        <div className="text-[8px] mt-1 text-slate-400">"이 세계를 집어삼킬 군주"</div>
        <div className="text-[7px] text-slate-500 mt-2">탭 하여 계속</div>
      </div>
    </div>
  );
}
