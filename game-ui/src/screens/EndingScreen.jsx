import { useGame } from '../context/GameContext';
export default function EndingScreen() {
  const { navigate } = useGame();
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-slate-700 flex items-center justify-center text-slate-300 text-[10px]" style={{height:'35%'}}>ENDING CG (28%)</div>
      <div className="bg-slate-900 text-slate-200 px-4 pt-5 text-[9px] italic" style={{height:'28%'}}>
        <div className="font-bold text-center text-[11px] mb-1">~ The Wise Pacifist ~</div>
        <div>"용사는 검을 내려놓았고, 왕국에 평화를 맞이했다."</div>
      </div>
      <div className="bg-slate-800 text-slate-200 px-3 pt-4 text-[8px]" style={{height:'22%'}}>
        <div className="font-bold mb-1">엔딩 도감 (4/8)</div>
        <div className="grid grid-cols-4 gap-1">
          {Array(8).fill(0).map((_,i)=>(
            <div key={i} className={`aspect-square rounded ${i<4?'bg-slate-600':'bg-slate-700 opacity-30'} flex items-center justify-center text-[6px]`}>{i>=4?'🔒':''}</div>
          ))}
        </div>
      </div>
      <div className="bg-slate-900 text-slate-300 flex-1 flex items-center justify-around">
        <button className="px-3 py-1 bg-slate-600 text-[8px] rounded">▸ 크레딧</button>
        <button onClick={() => navigate('main-menu')} className="px-3 py-1 bg-slate-600 text-[8px] rounded">▸ 타이틀</button>
      </div>
    </div>
  );
}
