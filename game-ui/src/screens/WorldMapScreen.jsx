import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function WorldMapScreen() {
  const { navigate } = useGame();
  const nodes = [
    {label:'마을',x:'20%',y:'15%',active:true},
    {label:'숲',x:'45%',y:'30%'},
    {label:'던굴',x:'70%',y:'50%'},
    {label:'항구',x:'25%',y:'70%'},
    {label:'🔒18+',x:'68%',y:'78%',locked:true},
  ];
  return (
    <>
      <Header showEnergy />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-300 relative" style={{height:'68%'}}>
          <div className="text-[7px] text-slate-600 absolute top-2 right-2">CH 1/5</div>
          {nodes.map(n=>(
            <button key={n.label}
              onClick={() => !n.locked && navigate(n.label==='마을'?'town':'event-choice')}
              className={`absolute w-9 h-9 rounded-full flex items-center justify-center text-[7px] text-white ${n.locked?'bg-slate-400 opacity-50':'bg-slate-600'}`}
              style={{left:n.x,top:n.y}}>
              {n.label}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-slate-100 px-3 pt-3 text-[9px] text-slate-700">
          <div className="font-bold">라이드내</div>
          <div className="text-[8px]">마을, 상점, 길드 이용 가능</div>
          <div className="text-[7px] italic mt-1">※ 일요일에도 외출 가능</div>
          <div className="mt-2 flex gap-1">
            <button onClick={() => navigate('town')} className="flex-1 py-1 bg-slate-500 text-white rounded text-[8px]">진입</button>
            <button className="flex-1 py-1 bg-slate-300 rounded text-[8px]">이동</button>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
}
