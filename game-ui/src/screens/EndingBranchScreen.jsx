import { useGame } from '../context/GameContext';
export default function EndingBranchScreen() {
  const { navigate } = useGame();
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-slate-700 flex items-center justify-center text-slate-300 text-[10px]" style={{height:'50%'}}>CLIMAX CG (28%)</div>
      <div className="bg-slate-900 text-slate-200 px-3 pt-5 text-[9px]" style={{height:'22%'}}>
        <div className="font-bold">▸ ???</div>
        <div>"용사여, 이제 선택할 시간이다..."</div>
      </div>
      <div className="bg-slate-800 flex-1 px-3 pt-3 flex flex-col gap-1.5">
        {[
          {label:'▸ 검을 내려 놓고 말을 건다', to:'ending'},
          {label:'▸ 스스로 희생하여 봉인한다', to:'ending'},
          {label:'▸ 모든 것을 버리고 떠난다', to:'ending'},
        ].map(c=>(
          <button key={c.label} onClick={() => navigate(c.to)}
            className="w-full py-2 bg-slate-600 text-slate-100 rounded text-[9px] text-left px-2">{c.label}</button>
        ))}
      </div>
    </div>
  );
}
