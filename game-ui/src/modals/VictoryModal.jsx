import { useGame } from '../context/GameContext';
export default function VictoryModal({ onClose }) {
  const { navigate } = useGame();
  return (
    <div className="bg-slate-200 border-2 border-slate-500 rounded p-4 w-full max-w-[240px]">
      <div className="text-center text-[12px] font-bold mb-2">★ VICTORY ★</div>
      <div className="text-[9px] space-y-1 text-slate-700">
        <div className="flex justify-between"><span>경험치</span><span className="font-bold">+ 240</span></div>
        <div className="flex justify-between"><span>골드</span><span className="font-bold">+ 75G</span></div>
        <div className="flex justify-between"><span>드롭</span><span className="font-bold">고블린 가죽 ×2</span></div>
        <div className="flex justify-between"><span>호감도</span><span className="font-bold">Liana +3</span></div>
        <div className="border-t border-slate-400 my-2" />
        <div className="text-center font-bold">LEVEL UP! Lv.5 → Lv.6</div>
      </div>
      <div className="mt-3 text-center">
        <button onClick={() => { onClose(); navigate('main-hub'); }} className="px-4 py-1.5 bg-slate-600 text-white text-[8px] rounded font-bold">▸ 확인</button>
      </div>
    </div>
  );
}
