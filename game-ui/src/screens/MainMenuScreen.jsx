import { useGame } from '../context/GameContext';
export default function MainMenuScreen() {
  const { navigate, openModal } = useGame();
  return (
    <div className="flex-1 flex flex-col">
      <div className="h-1/2 bg-slate-700 flex items-center justify-center relative">
        <div className="w-36 h-16 bg-slate-500 rounded flex items-center justify-center text-white text-[11px] font-bold tracking-widest text-center mt-10">
          AGE OF<br/>THE HERO
        </div>
        <button onClick={() => openModal('settings')} className="absolute top-2 right-2 w-5 h-5 bg-slate-500 rounded text-white text-[10px]">⚙</button>
      </div>
      <div className="flex-1 bg-slate-700 flex flex-col justify-center gap-2 px-6">
        <button onClick={() => navigate('prologue')} className="w-full py-2 bg-slate-500 text-white text-[10px] font-bold rounded">▸ NEW GAME</button>
        <button onClick={() => navigate('save-load')} className="w-full py-2 bg-slate-400 text-white text-[10px] font-bold rounded">▸ CONTINUE</button>
        <button onClick={() => navigate('collection')} className="w-full py-2 bg-slate-400 text-white text-[10px] font-bold rounded">▸ 컬렉션</button>
      </div>
      <div className="bg-slate-800 flex items-center justify-between px-4 h-7 text-[8px] text-slate-400">
        <span>v0.1.0</span><span>© Studio</span>
      </div>
    </div>
  );
}
