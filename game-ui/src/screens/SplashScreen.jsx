import { useGame } from '../context/GameContext';
export default function SplashScreen() {
  const { navigate } = useGame();
  return (
    <div className="flex-1 bg-slate-800 flex flex-col items-center justify-center cursor-pointer"
      onClick={() => navigate('main-menu')}>
      <div className="w-40 h-20 bg-slate-600 rounded flex items-center justify-center text-[11px] font-bold tracking-widest text-white text-center">
        AGE OF<br/>THE HERO
      </div>
      <div className="mt-12 text-[11px] text-slate-500">Tap to Start</div>
    </div>
  );
}
